import Link from 'next/link';
import { BookOpen, Code2, Zap, CheckCircle, ArrowRight, Coffee, Package } from 'lucide-react';
import CubeLoader from '@/components/ui/CubeLoader';

export default function HomePage() {
  return (
    <div>
      <style>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grid-bg" style={{
        minHeight: '92vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '8%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1100px', width: '100%',
          display: 'flex', alignItems: 'center', gap: '60px',
          position: 'relative', zIndex: 1, flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <div style={{ flex: 1, minWidth: '320px', textAlign: 'left' }}>
            <h1 className="animate-fade-up delay-100" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Domina{' '}
              <span className="grad-text">Java</span>{' '}
              y{' '}
              <span style={{ color: 'var(--docker)' }}>Docker</span>
              <br />
              <span style={{ color: 'var(--text-2)', fontSize: '0.75em', fontWeight: 600 }}>
                paso a paso
              </span>
            </h1>

            <p className="animate-fade-up delay-200" style={{
              fontSize: '1.1rem', color: 'var(--text-2)',
              marginBottom: '44px', lineHeight: '1.7', maxWidth: '480px',
            }}>
              WritingCode te guía con lecciones cortas, ejercicios interactivos
              y verificación inmediata. Sin copiar, sin confusión.
            </p>

            <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/cursos" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
                <BookOpen size={18} />
                Explorar cursos
                <ArrowRight size={16} />
              </Link>
              <Link href="/cursos" className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
                <Code2 size={18} />
                Ver ejercicios
              </Link>
            </div>

            <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: '48px', marginTop: '56px', flexWrap: 'wrap' }}>
              {[
                { value: '2', label: 'Cursos' },
                { value: '20', label: 'Lecciones' },
                { value: '10', label: 'Ejercicios' },
              ].map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: 'var(--accent)' }}>
                    {value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-3)', fontFamily: 'Space Mono, monospace' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up delay-200" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: '260px', flex: '0 0 auto',
          }}>
            <CubeLoader />
          </div>
        </div>
      </section>

      {/* ── CURSOS DESTACADOS ─────────────────────────────── */}
      <section style={{ padding: '80px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 className="animate-fade-up" style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px' }}>
            Elige tu <span className="grad-text">camino</span>
          </h2>
          <p style={{ color: 'var(--text-2)', fontSize: '1rem' }}>
            Dos tecnologías esenciales para el desarrollo moderno
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>

          {/* ── JAVA CARD ── */}
          <Link href="/cursos" style={{ textDecoration: 'none' }}>
            <div className="animate-fade-up delay-100" style={{
              height: '280px', position: 'relative', cursor: 'pointer',
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0px 0px 10px 1px #000000ee',
            }}>
              {/* Iluminación animada Java */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
                <div style={{
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: 'rgba(245,158,11,0.7)',
                  position: 'absolute', top: '-20px', left: '-10px',
                  filter: 'blur(40px)',
                  animation: 'floating 2600ms infinite linear',
                }} />
                <div style={{
                  width: '200px', height: '200px', borderRadius: '50%',
                  background: 'rgba(245,158,11,0.45)',
                  position: 'absolute', top: '30px', left: '80px',
                  filter: 'blur(55px)',
                  animation: 'floating 2600ms infinite linear',
                  animationDelay: '-800ms',
                }} />
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: 'rgba(251,191,36,0.6)',
                  position: 'absolute', top: '-30px', left: '200px',
                  filter: 'blur(18px)',
                  animation: 'floating 2600ms infinite linear',
                  animationDelay: '-1800ms',
                }} />
              </div>
              {/* Contenido */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                padding: '32px', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(26,34,51,0.82)',
                backdropFilter: 'blur(4px)',
              }}>
                <div>
                  <div style={{
                    width: '52px', height: '52px', background: 'rgba(245,158,11,0.15)',
                    borderRadius: '13px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '14px',
                  }}>
                    <Coffee size={26} color="var(--java)" />
                  </div>
                  <span className="badge badge-java" style={{ marginBottom: '10px' }}>Java</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', marginTop: '8px' }}>
                    Java desde cero
                  </h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Aprende los fundamentos de Java paso a paso. Variables, tipos de datos y tu primer programa.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--java)', fontFamily: 'Space Mono, monospace', fontSize: '0.85rem', fontWeight: 700 }}>
                  Empezar <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>

          {/* ── DOCKER CARD ── */}
          <Link href="/cursos" style={{ textDecoration: 'none' }}>
            <div className="animate-fade-up delay-200" style={{
              height: '280px', position: 'relative', cursor: 'pointer',
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0px 0px 10px 1px #000000ee',
            }}>
              {/* Iluminación animada Docker */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
                <div style={{
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: 'rgba(59,130,246,0.7)',
                  position: 'absolute', top: '-20px', left: '-10px',
                  filter: 'blur(40px)',
                  animation: 'floating 2600ms infinite linear',
                }} />
                <div style={{
                  width: '200px', height: '200px', borderRadius: '50%',
                  background: 'rgba(59,130,246,0.45)',
                  position: 'absolute', top: '30px', left: '80px',
                  filter: 'blur(55px)',
                  animation: 'floating 2600ms infinite linear',
                  animationDelay: '-800ms',
                }} />
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: 'rgba(99,179,255,0.6)',
                  position: 'absolute', top: '-30px', left: '200px',
                  filter: 'blur(18px)',
                  animation: 'floating 2600ms infinite linear',
                  animationDelay: '-1800ms',
                }} />
              </div>
              {/* Contenido */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                padding: '32px', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(26,34,51,0.82)',
                backdropFilter: 'blur(4px)',
              }}>
                <div>
                  <div style={{
                    width: '52px', height: '52px', background: 'rgba(59,130,246,0.15)',
                    borderRadius: '13px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '14px',
                  }}>
                    <Package size={26} color="var(--docker)" />
                  </div>
                  <span className="badge badge-docker" style={{ marginBottom: '10px' }}>Docker</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', marginTop: '8px' }}>
                    Docker esencial
                  </h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Domina contenedores desde lo básico. Imágenes, comandos y tu primer contenedor en minutos.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--docker)', fontFamily: 'Space Mono, monospace', fontSize: '0.85rem', fontWeight: 700 }}>
                  Empezar <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ─────────────────────────────────── */}
      <section style={{ padding: '80px 32px', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>
              ¿Cómo <span className="grad-text-green">funciona</span>?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { step: '01', icon: <BookOpen size={24} />, title: 'Lee la lección', desc: 'Teoría clara y concisa sobre el tema' },
              { step: '02', icon: <Code2 size={24} />, title: 'Completa el ejercicio', desc: 'Escribe código sin ejecutarlo realmente' },
              { step: '03', icon: <CheckCircle size={24} />, title: 'Verifica tu respuesta', desc: 'Recibe feedback inmediato del sistema' },
              { step: '04', icon: <ArrowRight size={24} />, title: 'Avanza', desc: 'Pasa a la siguiente lección y sigue creciendo' },
            ].map(({ step, icon, title, desc }, i) => (
              <div key={step} className={`animate-fade-up delay-${(i + 1) * 100}`} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'var(--accent)',
                }}>
                  {icon}
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: 'var(--text-3)', marginBottom: '8px' }}>{step}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: '1.5' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────── */}
      <section style={{ padding: '100px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '20px' }}>
            Empieza hoy,<br />
            <span className="grad-text">sin excusas</span>
          </h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '40px', fontSize: '1.05rem' }}>
            No necesitas instalar nada. Solo abre una lección y comienza a escribir código.
          </p>
          <Link href="/cursos" className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 44px' }}>
            <Zap size={20} />
            Comenzar ahora
          </Link>
        </div>
      </section>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px',
        textAlign: 'center',
        color: 'var(--text-3)',
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.8rem',
      }}>
        WritingCode © 2026
      </footer>
    </div>
  );
}