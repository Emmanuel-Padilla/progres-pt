import { useState, useEffect } from "react";

const TitleChanger = () => {
  const textos = ["UDigital Business", "Innovación Digital", "Tu Futuro Hoy", "Transformación Digital"];
  const [texto, setTexto] = useState(textos[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nuevoTexto = textos[Math.floor(Math.random() * textos.length)];
      setTexto(nuevoTexto);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-accent dark:text-white highlight bg-gradient-to-r from-purple-600 to-black text-transparent bg-clip-text text-6xl">
      {texto}
    </span>
  );
};

export default TitleChanger;
