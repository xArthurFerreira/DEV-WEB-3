const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.static(__dirname));

let listaDeCompras = [];

// Rota GET todos os itens
app.get('/itens', (req, res) => {
    res.json(listaDeCompras);
});

// Rota POST novo item
app.post('/itens', (req, res) => {
    const novoItem = req.body;
    listaDeCompras.push(novoItem);
    res.status(201).json(novoItem);
});

// Rota DELETE para remover um item
app.delete('/itens/:index', (req, res) => {
    const index = parseInt(req.params.index);
    listaDeCompras.splice(index, 1);
    res.sendStatus(204);
});

// Rota PUT para atualizar um item
app.put('/itens/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const updatedItem = req.body;
    if (index >= 0 && index < listaDeCompras.length) {
        listaDeCompras[index] = updatedItem;
        res.json(updatedItem);
    } else {
        res.sendStatus(404); // Item não encontrado
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
