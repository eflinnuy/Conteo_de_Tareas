const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
// Usamos el puerto que te asigna Render automáticamente, o el 3000 si estás en tu compu
const puerto = process.env.PORT || 3000;
const archivoDatos = path.join(__dirname, 'datos.json');

app.use(express.json());
app.use(express.static('public'));

app.get('/api/datos', (req, res) => {
    try {
        if (!fs.existsSync(archivoDatos)) {
            fs.writeFileSync(archivoDatos, JSON.stringify({}));
        }
        const datos = fs.readFileSync(archivoDatos, 'utf-8');
        res.json(JSON.parse(datos));
    } catch (error) {
        res.status(500).json({ error: "Error al leer los datos" });
    }
});

app.post('/api/datos', (req, res) => {
    try {
        fs.writeFileSync(archivoDatos, JSON.stringify(req.body, null, 2));
        res.json({ mensaje: "Guardado impecable" });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar los datos" });
    }
});

app.listen(puerto, () => {
    console.log(`Servidor de S.I.G.S.M. corriendo en el puerto ${puerto}`);
});