
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let directories = [];
let currentId = 1;

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.get('/status', (req, res) => {
    res.send('pong');
});

app.get('/directories', (req, res) => {
    res.json({
        count: directories.length,
        next: null,
        previous: null,
        results: directories
    });
});

app.post('/directories', (req, res) => {
    const directory = req.body;
    directory.id = currentId++;
    directories.push(directory);
    res.status(201).json(directory);
});

app.get('/directories/:id', (req, res) => {
    const directory = directories.find(d => d.id === parseInt(req.params.id));
    if (directory) {
        res.json(directory);
    } else {
        res.status(404).send('Not Found');
    }
});

app.put('/directories/:id', (req, res) => {
    const directory = directories.find(d => d.id === parseInt(req.params.id));
    if (directory) {
        Object.assign(directory, req.body);
        res.json(directory);
    } else {
        res.status(404).send('Not Found');
    }
});

app.patch('/directories/:id', (req, res) => {
    const directory = directories.find(d => d.id === parseInt(req.params.id));
    if (directory) {
        Object.assign(directory, req.body);
        res.json(directory);
    } else {
        res.status(404).send('Not Found');
    }
});

app.delete('/directories/:id', (req, res) => {
    directories = directories.filter(d => d.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});