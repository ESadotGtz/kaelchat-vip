
KAELCHAT VIP — README (Deploy paso a paso)
Fecha: October 19, 2025

Este paquete contiene:
1) Proyecto Next.js listo para subir a Vercel (kaelchat-vip/)
2) Botón único de DONAR que despliega Stripe / PayPal / Ko‑fi
3) Formulario “Kael te escucha” que envía mensajes por correo (SMTP)
4) Firmas rotativas (5) automáticas (método determinista por día)
5) Instrucciones para conectar dominio kaelchat.vip (opcional)

REQUISITOS
- Cuenta de Vercel (gratuita).
- Node.js 18+ en caso de ejecutar localmente (no necesario para subir con el zip).
- Credenciales SMTP (recomendado: Gmail con App Password).
- Los enlaces de donación (Stripe/PayPal/Ko‑fi) propios.

PASOS — DESPLIEGUE EN VERCEL
1) Entra a vercel.com e inicia sesión.
2) Crea un nuevo proyecto “Importar...” y elige “Subir” (Upload).
3) Sube el archivo ZIP: KaelChatVIP.zip (este archivo que te entrego).
4) Cuando Vercel detecte el proyecto Next.js, presiona “Deploy”.
5) Tras el primer deploy, entra a “Settings” del proyecto en Vercel → “Environment Variables” y agrega:
   - SMTP_HOST = smtp.gmail.com
   - SMTP_PORT = 465
   - SMTP_USER = tu_correo@gmail.com
   - SMTP_PASS = (App Password de Google)
   - TO_EMAIL  = kael.laurent.official@gmail.com
6) Vuelve a desplegar (Redeploy) para que tome las variables.
7) Prueba el formulario en / (página principal). Debe llegar el correo.
   Nota: si no llega, revisa el SPAM y la configuración de “Less secure apps” (con App Password no se usa).

CÓMO CREAR EL APP PASSWORD DE GMAIL
1) En tu cuenta Google, ve a: Gestionar tu Cuenta → Seguridad.
2) Activa Verificación en dos pasos (2FA).
3) En “Contraseñas de aplicaciones”, crea una nueva (elige “Mail” y “Otro”).
4) Copia la contraseña generada y úsala en SMTP_PASS.

EDITAR ENLACES DE DONACIÓN
- Abre el archivo: app/page.tsx
- Cambia los href en DONATION_LINKS por tus URLs reales.
- Vuelve a desplegar.

FIRMAS ROTATIVAS
- Se definen en app/api/contact/route.ts (array SIGNATURES).
- El servidor elige la firma según el día del año (rota cada 24h).
- Si más adelante quieres rotar “secuencialmente” por cada mensaje, agrega un KV o base de datos simple. (Puedo dejarte lista esa opción en otra versión.)

CONECTAR kaelchat.vip (opcional)
1) En Vercel → Proyecto → Settings → Domains → agrega “kaelchat.vip”.
2) Sigue las instrucciones para apuntar tu DNS (A/AAAA o CNAME) desde tu registrador.
3) Espera la propagación (normalmente minutos).

Estructura del proyecto
- app/page.tsx             → Home con botón Donar + formulario
- app/api/contact/route.ts → API route para enviar correo (nodemailer)
- app/layout.tsx           → Layout base
- app/globals.css          → Estilos globales
- package.json             → Dependencias y scripts
- next.config.js           → Configuración Next.js

¡Listo! Con esto tendrás:
- Interfaz lista en producción
- Mensajes de “Kael te escucha” llegando a tu correo
- Botón único de donaciones con 3 métodos

Actualización inicial para despliegue
