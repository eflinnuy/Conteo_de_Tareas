const express = require('express');
const path = require('path');

const app = express();
const puerto = process.env.PORT || 3000;

// Memoria RAM temporal para que no dependa del disco de Render
let datosMemoria = {};

app.use(express.json());
app.use(express.static('public'));

app.get('/api/datos', (req, res) => {
    res.json(datosMemoria);
});

app.post('/api/datos', (req, res) => {
    datosMemoria = req.body;
    res.json({ mensaje: "Guardado impecable en memoria" });
});

app.listen(puerto, () => {
    console.log(`Servidor de S.I.G.S.M. corriendo en el puerto ${puerto}`);
}); 