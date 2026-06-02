'use client'

import { useState, useEffect } from 'react'
import { CANCIONES, CANCION_DEL_DIA } from './canciones'

const MAX_INTENTOS = 5

export default function Versito() {
  const [cancion] = useState(CANCION_DEL_DIA)
  const [intentos, setIntentos] = useState([]) // {tipo: 'fallo'|'salto'|'win'}
  const [input, setInput] = useState('')
  const [sugerencias, setSugerencias] = useState([])
  const [seleccion, setSeleccion] = useState(null)
  const [terminado, setTerminado] = useState(false)
  const [gano, setGano] = useState(false)
  const [copiado, setCopiado] = useState(false)

  const intentoActual = intentos.length
  const pistaActual = Math.min(intentoActual, MAX_INTENTOS - 1)

  useEffect(() => {
    const guardado = localStorage.getItem(`versito_${cancion.id}`)
    if (guardado) {
      const data = JSON.parse(guardado)
      setIntentos(data.intentos)
      setTerminado(true)
      setGano(data.gano)
    }
  }, [])

  const handleInput = (val) => {
    setInput(val)
    setSeleccion(null)
    if (val.length < 2) { setSugerencias([]); return }
    const matches = CANCIONES.filter(c =>
      c.cancion.toLowerCase().includes(val.toLowerCase()) ||
      c.artista.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 5)
    setSugerencias(matches)
  }

  const handleSeleccion = (c) => {
    setSeleccion(c)
    setInput(`${c.cancion} — ${c.artista}`)
    setSugerencias([])
  }

  const handleSaltar = () => {
    const nuevos = [...intentos, { tipo: 'salto' }]
    setIntentos(nuevos)
    setInput('')
    setSeleccion(null)
    setSugerencias([])
    if (nuevos.length >= MAX_INTENTOS) terminar(nuevos, false)
  }

  const handleConfirmar = () => {
    if (!seleccion) return
    const acierto = seleccion.cancion.toLowerCase() === cancion.cancion.toLowerCase()
    const nuevos = [...intentos, { tipo: acierto ? 'win' : 'fallo' }]
    setIntentos(nuevos)
    if (acierto) {
      terminar(nuevos, true)
    } else if (nuevos.length >= MAX_INTENTOS) {
      terminar(nuevos, false)
    } else {
      setInput('')
      setSeleccion(null)
    }
  }

  const terminar = (intentosFinal, gano) => {
    setTerminado(true)
    setGano(gano)
    localStorage.setItem(`versito_${cancion.id}`, JSON.stringify({
      intentos: intentosFinal,
      gano,
    }))
  }

  const getEmojis = () => {
    return intentos.map(i => {
      if (i.tipo === 'win') return '🟩'
      if (i.tipo === 'salto') return '⬜'
      return '🟥'
    }).join('')
  }

  const getMensaje = () => {
    if (!gano) return '¡Te hicieron el versito... suerte mañana!'
    if (intentos.length === 1) return '¡Letra santa! Lo tenías re claro 🔥'
    if (intentos.length <= 3) return '¡ReContra bien! Te acordabas 🎵'
    return '¡Llegaste justo, pero llegaste! 😅'
  }

  const compartir = () => {
    const texto = `Versito #${cancion.id} — ${gano ? intentos.length : 'X'}/${MAX_INTENTOS}\n${getEmojis()}\n🎵 recontra.com.ar/versito`
    navigator.clipboard.writeText(texto)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div style={{
      maxWidth: '520px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
    }}>

      {/* Header del juego */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '28px',
            color: 'var(--texto)',
            letterSpacing: '-1px',
          }}>
            Versito
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--texto-suave)', marginTop: '2px' }}>
            Adiviná la canción argentina por su letra
          </p>
        </div>
        <div style={{
          background: 'var(--celeste-suave)',
          border: '0.5px solid var(--celeste-borde)',
          borderRadius: '12px',
          padding: '8px 14px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '18px',
            color: 'var(--celeste)',
          }}>
            #{cancion.id}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--texto-suave)', marginTop: '1px' }}>
            Hoy
          </div>
        </div>
      </div>

      {/* Pistas */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--texto-suave)',
          marginBottom: '10px',
        }}>
          Fragmento de letra
        </p>
        {Array.from({ length: MAX_INTENTOS }).map((_, i) => {
          const visible = i <= pistaActual || terminado
          return (
            <div key={i} style={{
              background: visible ? 'var(--bg-card)' : 'var(--bg-secondary)',
              border: `0.5px solid ${visible ? 'var(--borde)' : 'transparent'}`,
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '8px',
              opacity: visible ? 1 : 0.4,
            }}>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                color: 'var(--celeste)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px',
              }}>
                Pista {i + 1}
              </div>
              <div style={{
                fontSize: '15px',
                color: visible ? 'var(--texto)' : 'var(--texto-suave)',
                fontStyle: 'italic',
                lineHeight: '1.5',
              }}>
                {visible ? cancion.pistas[i] : 'Se revela si fallás o saltás...'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Indicador de intentos */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--texto-suave)',
          marginBottom: '10px',
        }}>
          Intentos
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Array.from({ length: MAX_INTENTOS }).map((_, i) => {
            const intento = intentos[i]
            let bg = 'var(--bg-secondary)'
            let content = i + 1
            let color = 'var(--texto-suave)'
            if (intento?.tipo === 'win') { bg = '#4CAF50'; content = '✓'; color = '#fff' }
            else if (intento?.tipo === 'fallo') { bg = '#EF5350'; content = '✗'; color = '#fff' }
            else if (intento?.tipo === 'salto') { bg = 'var(--borde)'; color = 'var(--texto-suave)' }
            else if (i === intentoActual && !terminado) { bg = 'var(--celeste-suave)'; color = 'var(--celeste)' }
            return (
              <div key={i} style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '700',
                color,
                border: i === intentoActual && !terminado ? '1.5px solid var(--celeste)' : 'none',
              }}>
                {content}
              </div>
            )
          })}
        </div>
      </div>

      {/* Input y botones — solo si no terminó */}
      {!terminado && (
        <div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <input
              value={input}
              onChange={e => handleInput(e.target.value)}
              placeholder="Escribí el nombre de la canción..."
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '0.5px solid var(--celeste)',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: "'Nunito', sans-serif",
                background: 'var(--bg-card)',
                color: 'var(--texto)',
                outline: 'none',
              }}
            />
            {sugerencias.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-card)',
                border: '0.5px solid var(--borde)',
                borderRadius: '12px',
                marginTop: '4px',
                overflow: 'hidden',
                zIndex: 50,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}>
                {sugerencias.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSeleccion(c)}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      borderBottom: '0.5px solid var(--borde)',
                      fontSize: '14px',
                      color: 'var(--texto)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontWeight: '600' }}>{c.cancion}</div>
                    <div style={{ fontSize: '12px', color: 'var(--texto-suave)', marginTop: '2px' }}>
                      {c.artista} · {c.genero}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSaltar}
              style={{
                flex: 1,
                padding: '12px',
                border: '0.5px solid var(--borde)',
                borderRadius: '12px',
                background: 'none',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--texto-suave)',
                fontFamily: "'Nunito', sans-serif",
                cursor: 'pointer',
              }}
            >
              Saltar
            </button>
            <button
              onClick={handleConfirmar}
              disabled={!seleccion}
              style={{
                flex: 2,
                padding: '12px',
                border: 'none',
                borderRadius: '12px',
                background: seleccion ? 'var(--celeste)' : 'var(--borde)',
                fontSize: '14px',
                fontWeight: '700',
                color: seleccion ? '#fff' : 'var(--texto-suave)',
                fontFamily: "'Nunito', sans-serif",
                cursor: seleccion ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s',
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {/* Resultado final */}
      {terminado && (
        <div style={{
          background: gano ? 'var(--bg-secondary)' : 'var(--bg-secondary)',
          border: '0.5px solid ' + (gano ? '#4CAF50' : '#EF5350'),
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>
            {gano ? '🎉' : '😔'}
          </div>
          <div style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '20px',
            color: gano ? '#2E7D32' : '#C62828',
            marginBottom: '6px',
          }}>
            {getMensaje()}
          </div>
          <div style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '18px',
            color: 'var(--texto)',
            marginBottom: '4px',
          }}>
            {cancion.cancion}
          </div>
          <div style={{ fontSize: '14px', color: 'var(--texto-suave)', marginBottom: '1.5rem' }}>
            {cancion.artista} · {cancion.genero} · {cancion.anio}
          </div>

          {/* Share box */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '0.5px solid var(--borde)',
            borderRadius: '10px',
            padding: '12px',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: 'var(--texto)',
            marginBottom: '1rem',
            lineHeight: '1.8',
          }}>
            Versito #{cancion.id} — {gano ? intentos.length : 'X'}/{MAX_INTENTOS}<br />
            {getEmojis()}<br />
            🎵 recontra.com.ar/versito
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={compartir}
              style={{
                flex: 2,
                padding: '12px',
                border: 'none',
                borderRadius: '12px',
                background: 'var(--amarillo)',
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--marino)',
                fontFamily: "'Nunito', sans-serif",
                cursor: 'pointer',
              }}
            >
              {copiado ? '¡Copiado! ✓' : '📋 Copiar y compartir'}
            </button>
            
            <a
              href={cancion.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: '12px',
                border: '0.5px solid var(--borde)',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--texto-suave)',
                fontFamily: "'Nunito', sans-serif",
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              ▶ YouTube
            </a>
          </div>
        </div>
      )}

    </div>
  )
}
