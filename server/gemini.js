const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeWithGemini(newsText, source) {
  const prompt = `
Analiza esta noticia como verificador de información.

Texto de la noticia:
${newsText}

Fuente original:
${source}

Debes responder SOLO en JSON válido, sin markdown, sin explicación extra.

Formato:
{
  "score": 1-99,
  "classification": "Información confiable" | "Información dudosa" | "Posible desinformación",
  "sourceReliability": "alta" | "media" | "baja",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "checkedSources": ["..."],
  "explanation": "...",
  "recommendation": "..."
}

Reglas:
61 a 99 = Información confiable.
40 a 60 = Información dudosa.
1 a 39 = Posible desinformación.

Evalúa:
- Si la fuente parece confiable.
- Si el texto usa lenguaje alarmista.
- Si presenta datos verificables.
- Si faltan fechas, autores o contexto.
- Si la afirmación debería compararse con fuentes oficiales.
`;

  const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: prompt,
});

  const text = response.text;
  const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(clean);
}

module.exports = analyzeWithGemini;