'use client'

export default function Home() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        padding: '4rem 2.5rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        borderBottom: '0.5px solid var(--borde)',
      }}>
        {/* Izquierda */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--celeste-suave)',
            borderRadius: '20px',
            padding: '4px 14px',
            fontSize: '11px',
            fontWeight: '700',
            color: '#1A6E8E',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            📍 100% argentino
          </div>
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: '42px',
            lineHeight: '1.05',
            color: 'var(--texto)',
            marginBottom: '16px',
            letterSpacing: '-2px',
          }}>
            La cultura<br />
            argentina<br />
            hecha{' '}
            <span style={{ color: 'var(--celeste)' }}>juego.</span>
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--texto-suave)',
            lineHeight: '1.7',
            marginBottom: '2rem',
            maxWidth: '400px',
          }}>
            Desafíos diarios de música, historia, geografía y cultura popular.
            Todo con sabor bien de acá. Un juego nuevo cada día.
          </p>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a href="/versito" style={{
              background: 'var(--amarillo)',
              color: 'var(--marino)',
              padding: '12px 24px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-block',
            }}>
              Empezar a jugar
            </a>
            <button style={{
              background: 'none',
              border: '0.5px solid var(--borde)',
              color: 'var(--texto-suave)',
              padding: '12px 20px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: "'Nunito', sans-serif",
              cursor: 'pointer',
            }}>
              Ver todos los juegos
            </button>
          </div>
        </div>

        {/* Derecha — mini cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { nombre: 'Versito', desc: 'Adiviná la canción por su letra', activo: true },
            { nombre: 'Sopa Argentina', desc: 'Sopa de letras temática diaria', activo: false },
            { nombre: '¿Quién Soy?', desc: 'Adiviná el personaje por pistas', activo: false },
            { nombre: 'Mapa Argento', desc: 'Ubicá provincias y ciudades', activo: false },
          ].map((j) => (
            <div key={j.nombre} style={{
              background: j.activo ? 'var(--celeste-suave)' : 'var(--bg-secondary)',
              border: `0.5px solid ${j.activo ? 'var(--celeste)' : 'var(--borde)'}`,
              borderRadius: '14px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '11px',
                background: j.activo ? '#fff' : 'var(--borde)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              }}>
                {j.activo ? '🎵' : '🔒'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '14px',
                  color: 'var(--texto)',
                }}>
                  {j.nombre}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--texto-suave)',
                  marginTop: '2px',
                }}>
                  {j.desc}
                </div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: '20px',
                background: j.activo ? 'var(--celeste)' : 'var(--bg-primary)',
                color: j.activo ? '#fff' : 'var(--texto-suave)',
                border: j.activo ? 'none' : '0.5px solid var(--borde)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {j.activo ? 'Hoy' : 'Pronto'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grilla de juegos */}
      <div style={{ padding: '2.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}>
          <div>
            <div style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: '20px',
              color: 'var(--texto)',
            }}>
              Todos los juegos
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--texto-suave)',
              marginTop: '4px',
            }}>
              Un desafío nuevo cada día en cada categoría
            </div>
          </div>
          <span style={{
            fontSize: '13px',
            color: 'var(--celeste)',
            fontWeight: '700',
            cursor: 'pointer',
          }}>
            Ver todos ↗
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
        }}>
          {[
            { emoji: '🎵', nombre: 'Versito', desc: 'Adiviná la canción argentina por fragmento de letra', activo: true, href: '/versito' },
            { emoji: '🧩', nombre: 'Sopa Argentina', desc: 'Sopa de letras con temáticas rotativas', activo: false },
            { emoji: '❓', nombre: '¿Quién Soy?', desc: 'Adiviná el personaje argentino por pistas', activo: false },
            { emoji: '🗺️', nombre: 'Mapa Argento', desc: 'Ubicá provincias y ciudades en el mapa', activo: false },
          ].map((j) => (
            <div
              key={j.nombre}
              onClick={() => j.href && (window.location.href = j.href)}
              style={{
                background: 'var(--bg-card)',
                border: `0.5px solid ${j.activo ? 'var(--celeste)' : 'var(--borde)'}`,
                borderRadius: '16px',
                padding: '18px',
                cursor: j.activo ? 'pointer' : 'default',
                opacity: j.activo ? 1 : 0.5,
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: j.activo ? 'var(--celeste-suave)' : 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                marginBottom: '12px',
              }}>
                {j.emoji}
              </div>
              <div style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: '15px',
                color: 'var(--texto)',
                marginBottom: '5px',
              }}>
                {j.nombre}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--texto-suave)',
                lineHeight: '1.5',
                marginBottom: '12px',
              }}>
                {j.desc}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '3px 9px',
                  borderRadius: '20px',
                  background: j.activo ? 'var(--celeste-suave)' : 'var(--bg-secondary)',
                  color: j.activo ? '#1A6E8E' : 'var(--texto-suave)',
                }}>
                  {j.activo ? 'Disponible' : 'Próximamente'}
                </span>
                {j.activo && (
                  <span style={{ color: 'var(--celeste)', fontSize: '16px' }}>→</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}