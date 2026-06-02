'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setDarkMode(true)
      document.body.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem('darkMode', next)
    document.body.classList.toggle('dark', next)
  }

  return (
    <header style={{
      padding: '1rem 1.25rem',
      borderBottom: '0.5px solid var(--borde)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg-primary)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: '22px',
          color: 'var(--texto)',
          letterSpacing: '-1px',
        }}>
          Re<span style={{ color: 'var(--celeste)' }}>Contra</span>
        </span>
      </a>

      {/* Nav desktop */}
      <nav className="header-desktop">
        <a href="/" style={{ fontSize: '14px', color: 'var(--texto-suave)', textDecoration: 'none', fontWeight: '600' }}>Juegos</a>
        <a href="#" style={{ fontSize: '14px', color: 'var(--texto-suave)', textDecoration: 'none', fontWeight: '600' }}>Ranking</a>
        <a href="#" style={{ fontSize: '14px', color: 'var(--texto-suave)', textDecoration: 'none', fontWeight: '600' }}>Novedades</a>
        <button
          onClick={toggleDark}
          style={{
            background: 'var(--bg-secondary)',
            border: '0.5px solid var(--borde)',
            borderRadius: '20px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '13px',
            color: 'var(--texto-suave)',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: '600',
          }}
        >
          {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
      </nav>

      {/* Nav mobile — solo dos botones */}
      <div className="header-mobile">
        <button
          onClick={toggleDark}
          style={{
            background: 'var(--bg-secondary)',
            border: '0.5px solid var(--borde)',
            borderRadius: '20px',
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: '16px',
            lineHeight: 1,
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          style={{
            background: 'none',
            border: '0.5px solid var(--borde)',
            borderRadius: '10px',
            padding: '6px 10px',
            cursor: 'pointer',
            fontSize: '18px',
            color: 'var(--texto)',
            lineHeight: 1,
          }}
        >
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu desplegable mobile */}
      {menuAbierto && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--bg-primary)',
          borderBottom: '0.5px solid var(--borde)',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 99,
        }}>
          <a href="/" style={{ fontSize: '15px', color: 'var(--texto)', textDecoration: 'none', fontWeight: '600' }}>Juegos</a>
          <a href="#" style={{ fontSize: '15px', color: 'var(--texto)', textDecoration: 'none', fontWeight: '600' }}>Ranking</a>
          <a href="#" style={{ fontSize: '15px', color: 'var(--texto)', textDecoration: 'none', fontWeight: '600' }}>Novedades</a>
        </div>
      )}

    </header>
  )
}