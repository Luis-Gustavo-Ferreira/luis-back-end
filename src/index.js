import express from "express";
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const htmlPath = path.join(__dirname, '../index.html');

// Configuração para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(htmlPath);
});

// Dados fictícios para armazenar categorias, receitas e despesas
let categorias = [];
let receitas = [];
let despesas = [];

// CRUD para Categorias

// Rota para obter todas as categorias
app.get("/categorias", (req, res) => {
  res.json(categorias);
});

// Rota para criar uma nova categoria
app.post("/categorias", (req, res) => {
  const { nome } = req.body;


  // Verifica se o nome está presente no corpo da solicitação
  if (!nome) {
    return res.status(400).json({ error: "Nome é um campo obrigatório." });
  }

  const novaCategoria = {
    id: categorias.length + 1,
    nome,
  };

  categorias.push(novaCategoria);
  res.json(novaCategoria);
});

app.get('/categorias/clear', (req, res) => {
  categorias = []
})

// Rota para atualizar uma categoria pelo ID
app.put("/categorias/:id", (req, res) => {
  const categoriaId = parseInt(req.params.id);
  const { nome } = req.body;

  // Encontra a categoria pelo ID
  const categoria = categorias.find((c) => c.id === categoriaId);

  // Verifica se a categoria existe
  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada." });
  }

  // Atualiza o nome da categoria
  categoria.nome = nome;

  res.json(categoria);
});

// Rota para excluir uma categoria pelo ID
app.delete("/categorias/:id", (req, res) => {
  const categoriaId = parseInt(req.params.id);

  // Filtra as categorias, removendo a que tem o ID fornecido
  categorias = categorias.filter((c) => c.id !== categoriaId);

  res.json({ message: "Categoria excluída com sucesso." });
});

// CRUD para Receitas

// Rota para obter todas as receitas
app.get("/receitas", (req, res) => {
  res.json(receitas);
});

// Rota para criar uma nova receita
app.post("/receitas", (req, res) => {
  const { data, descricao, valor, categoriaId } = req.body;

  // Lógica de validação aqui, se necessário

  const novaReceita = {
    id: receitas.length + 1,
    data,
    descricao,
    valor,
    categoriaId,
  };

  receitas.push(novaReceita); 
  res.json(novaReceita);
});

// Rota para atualizar uma receita pelo ID
app.put("/receitas/:id", (req, res) => {
  const receitaId = parseInt(req.params.id);
  // Lógica de atualização da receita aqui
  res.json({ message: "Receita atualizada com sucesso." });
});

// Rota para excluir uma receita pelo ID
app.delete("/receitas/:id", (req, res) => {
  const receitaId = parseInt(req.params.id);
  // Lógica de exclusão da receita aqui
  res.json({ message: "Receita excluída com sucesso." });
});

// CRUD para Despesas

// Rota para obter todas as despesas
app.get("/despesas", (req, res) => {
  console.log(despesas, "Despesas")
  res.json(despesas);
});

// Rota para criar uma nova despesa
app.post("/despesas", (req, res) => {
  const { data, descricao, valor, categoriaId } = req.body;

  // Lógica de validação aqui, se necessário

  const novaDespesa = {
    id: despesas.length + 1,
    data,
    descricao,
    valor,
    categoriaId,
  };

  despesas.push(novaDespesa);
  res.json(novaDespesa);
});

// Rota para atualizar uma despesa pelo ID
app.put("/despesas/:id", (req, res) => {
  const despesaId = parseInt(req.params.id);
  // Lógica de atualização da despesa aqui
  res.json({ message: "Despesa atualizada com sucesso." });
});

// Rota para excluir uma despesa pelo ID
app.delete("/despesas/:id", (req, res) => {
  const despesaId = parseInt(req.params.id);
  // Lógica de exclusão da despesa aqui
  res.json({ message: "Despesa excluída com sucesso." });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})