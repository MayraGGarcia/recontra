'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)

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
      padding: '1rem 2.5rem',
      borderBottom: '0.5px solid var(--borde)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg-primary)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
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

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <a href="/" style={{
          fontSize: '14px',
          color: 'var(--texto-suave)',
          textDecoration: 'none',
          fontWeight: '600',
        }}>
          Juegos
        </a>
        <a href="#" style={{
          fontSize: '14px',
          color: 'var(--texto-suave)',
          textDecoration: 'none',
          fontWeight: '600',
        }}>
          Ranking
        </a>
        <a href="#" style={{
          fontSize: '14px',
          color: 'var(--texto-suave)',
          textDecoration: 'none',
          fontWeight: '600',
        }}>
          Novedades
        </a>
        <button
          onClick={toggleDark}
          title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          style={{
            background: 'var(--bg-secondary)',
            border: '0.5px solid var(--borde)',
            borderRadius: '20px',
            padding: '6px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: 'var(--texto-suave)',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: '600',
          }}
        >
          {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
        </button>
      </nav>
    </header>
  )
}