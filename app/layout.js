import './globals.css'
import Header from './components/Header'

export const metadata = {
  title: 'ReContra — El portal de juegos más argento',
  description: 'Trivia, Versito, sopas de letras y más. Todo con sabor argentino.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main style={{ width: '100%' }}>
          {children}
        </main>
        <footer style={{
          padding: '1.5rem 2.5rem',
          borderTop: '0.5px solid var(--borde)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-primary)',
        }}>
          <span style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '16px',
            color: 'var(--texto-suave)',
          }}>
            Re<span style={{ color: 'var(--celeste)' }}>Contra</span>
          </span>
          <span style={{ fontSize: '12px', color: 'var(--texto-suave)' }}>
            Hecho con orgullo en Argentina 🇦🇷
          </span>
        </footer>
      </body>
    </html>
  )
}