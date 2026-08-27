const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const puerto = 3000;
const archivoDatos = path.join(__dirname, 'datos.json');

app.use(express.json());
app.use(express.static('public'));

app.get('/api/datos', (req, res) => {
    if (!fs.existsSync(archivoDatos)) {
        fs.writeFileSync(archivoDatos, '{}');
    }
    const datos = fs.readFileSync(archivoDatos, 'utf-8');
    res.json(JSON.parse(datos));
});

app.post('/api/datos', (req, res) => {
    fs.writeFileSync(archivoDatos, JSON.stringify(req.body, null, 2));
    res.json({ mensaje: "Guardado impecable" });
});

app.listen(puerto, () => {
    console.log(`Servidor de S.I.G.S.M. corriendo en http://localhost:${puerto}`);
});