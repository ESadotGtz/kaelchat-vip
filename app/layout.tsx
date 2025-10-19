export const metadata = {
  title: "KaelChat VIP",
  description: "Elegance. Discretion. A cinematic micro‑chat with Kael.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
