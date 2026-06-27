import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [newsText, setNewsText] = useState("");
  const [source, setSource] = useState("");
  const [result, setResult] = useState(null);

  const analyzeNews = async () => {
  if (!newsText.trim() || !source.trim()) {
    alert("Completa todos los campos.");
    return;
  }

  try {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newsText,
        source
      })
    });

    const data = await response.json();
    setResult(data);
  } catch (error) {
    console.error(error);
    alert("No se pudo conectar con el servidor.");
  }
};

  return (
    <div className="app">
      <header className="hero">
        <div className="badge">PIP 2026</div>
        <h1>Detector de noticias falsas</h1>
        <p>Verifica antes de compartir.</p>
      </header>

      <main className="container">
        <section className="card">
          <h2>Analizar información</h2>

          <label>Texto de la noticia</label>
          <textarea
            placeholder="Pega aquí el texto de la noticia..."
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
          />

          <label>Fuente original</label>
          <input
            placeholder="Ejemplo: BBC, TikTok, El Comercio, una página web..."
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <button onClick={analyzeNews}>Analizar información</button>
        </section>

        {result && (
          <section className="result card">
            <div className={`circle ${
              result.score >= 61 ? "green" : result.score >= 40 ? "yellow" : "red"
            }`}>
              <span>{result.score}%</span>
            </div>

            <h2>{result.classification}</h2>

            <div className="grid">
              <div>
                <h3>Puntos fuertes</h3>
                {result.strengths.map((item, index) => (
                  <p key={index}>✅ {item}</p>
                ))}
              </div>

              <div>
                <h3>Puntos débiles</h3>
                {result.weaknesses.map((item, index) => (
                  <p key={index}>⚠️ {item}</p>
                ))}
              </div>
            </div>

            <h3>Fuentes consultadas</h3>
            {result.checkedSources.map((item, index) => (
              <p key={index}>🔎 {item}</p>
            ))}

            <h3>Explicación</h3>
            <p>{result.explanation}</p>

            <h3>Recomendación</h3>
            <p>{result.recommendation}</p>
          </section>
        )}
      </main>
    </div>
  );
}