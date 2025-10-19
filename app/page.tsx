'use client';
import { useState } from 'react';

const DONATION_LINKS = [
  { name: 'Stripe', href: 'https://donate.stripe.com/test_123' },
  { name: 'PayPal', href: 'https://www.paypal.com/donate?hosted_button_id=TESTID' },
  { name: 'Ko‑fi', href: 'https://ko-fi.com/yourpage' },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
      }),
    });
    setSending(false);
    if (res.ok) {
      setSent(true);
      (e.target as HTMLFormElement).reset();
    } else {
      const j = await res.json().catch(()=>({error:'Unknown error'}));
      setError(j.error || 'Error desconocido');
    }
  }

  return (
    <main className="min-h-screen">
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight">KaelChat VIP</h1>
        <p className="opacity-80 mt-2">Elegancia y cercanía, en formato cinematográfico.</p>

        <div className="mt-8">
          <button
            onClick={() => setOpen(true)}
            className="rounded-2xl px-6 py-3 bg-white text-black font-medium hover:opacity-90"
            aria-label="Donar"
          >
            Donar
          </button>
        </div>

        {open && (
          <div className="mt-4 p-4 rounded-2xl border border-white/20">
            <h2 className="text-xl mb-2">Elige tu método de donación</h2>
            <ul className="list-disc ml-6 space-y-2">
              {DONATION_LINKS.map((d) => (
                <li key={d.name}>
                  <a className="underline" href={d.href} target="_blank" rel="noreferrer">{d.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 p-6 rounded-2xl border border-white/20">
          <h2 className="text-2xl">Kael te escucha</h2>
          <p className="opacity-80">Escríbele un mensaje. Llegará a su correo y te responderá con una firma elegante que rota automáticamente.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <input required name="name" placeholder="Tu nombre" className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20" />
            <input required type="email" name="email" placeholder="Tu correo" className="w-full rounded-xl px-4 py-3 bg-white/10 border border-white/20" />
            <textarea required name="message" placeholder="Tu mensaje" className="w-full min-h-[140px] rounded-xl px-4 py-3 bg-white/10 border border-white/20" />
            <button disabled={sending} className="rounded-2xl px-6 py-3 bg-white text-black font-medium hover:opacity-90 disabled:opacity-50">
              {sending ? 'Enviando…' : 'Enviar'}
            </button>
            {sent && <p className="text-green-400">¡Mensaje enviado! Gracias por escribirle a Kael.</p>}
            {error && <p className="text-red-400">{error}</p>}
          </form>
        </div>
      </section>

      <footer className="px-6 py-10 opacity-60 text-sm">
        © {new Date().getFullYear()} KaelChat VIP
      </footer>
    </main>
  );
}
