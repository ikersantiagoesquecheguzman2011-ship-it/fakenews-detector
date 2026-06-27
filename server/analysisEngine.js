const analyzeWithGemini = require("./gemini");

async function analyzeInformation(newsText, source) {
  try {
    const geminiResult = await analyzeWithGemini(newsText, source);
    return geminiResult;
  } catch (error) {
    console.error("Error con Gemini:", error);

    return {
      score: 50,
      classification: "Información dudosa",
      sourceReliability: "media",
      strengths: ["El sistema recibió el texto correctamente."],
      weaknesses: ["No se pudo completar el análisis con IA."],
      checkedSources: ["Análisis local"],
      explanation: "Hubo un problema al conectar con Gemini.",
      recommendation: "Intenta nuevamente o revisa la API Key."
    };
  }
}

module.exports = analyzeInformation;