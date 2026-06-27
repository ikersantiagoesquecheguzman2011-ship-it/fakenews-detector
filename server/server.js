const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeInformation = require("./analysisEngine");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("FakeNews Detector backend funcionando");
});

app.post("/analyze", async (req, res) => {
  try {
    const { newsText, source } = req.body;

    if (!newsText || !source) {
      return res.status(400).json({
        error: "Falta el texto de la noticia o la fuente."
      });
    }

    const result = await analyzeInformation(newsText, source);
    res.json(result);
  } catch (error) {
    console.error("Error en /analyze:", error);
    res.status(500).json({
      error: "Error al analizar la información."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor FakeNews Detector corriendo en puerto ${PORT}`);
});