"use client";
import { useState } from "react";

export default function Page() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al enviar el mensaje");

      alert("Mensaje enviado correctamente 💌");
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl mb-4">Kael te escucha</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          required
          className="w-full p-2 text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo"
          required
          className="w-full p-2 text-black"
        />
        <textarea
          name="message"
          placeholder="Tu mensaje"
          required
          className="w-full p-2 text-black"
        ></textarea>
        <button
          type="submit"
          disabled={sending}
          className="bg-white text-black px-4 py-2 rounded"
        >
          {sending ? "Enviando..." : "Enviar"}
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </main>
  );
}
