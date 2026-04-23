import Link from 'next/link';
import { api } from '@/lib/api';
import { BookOpen, Code2, ChevronRight, Terminal, Zap } from 'lucide-react';
import EjercicioCard from '@/components/ui/EjercicioCard';
import MarcarLeida from '@/components/ui/MarcarLeida';

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const leccion = await api.getLeccion(id);
    return { title: `${leccion.titulo} — WritingCode` };
  } catch { return { title: 'Lección — WritingCode' }; }
}

export default async function LeccionPage({ params }) {
  const { id } = await params;
  let leccion = null, ejercicios = [], nav = { anterior: null, siguiente: null };
  try {
    leccion    = await api.getLeccion(id);
    ejercicios = await api.getEjerciciosByLeccion(id);
    const navData = await api.getNavegacionLeccion(id);
    nav = { anterior: navData.anterior, siguiente: navData.siguiente };
  } catch {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-2)' }}>No se pudo cargar la lección.</p>
        <Link href="/cursos" className="btn-secondary" style={{ marginTop: '24px', display: 'inline-flex' }}>Volver</Link>
      </div>
    );
  }

  const esTeoria = leccion.tipo === 'teoria';

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 32px' }}>

      <div className="breadcrumb" style={{ marginBottom: '28px' }}>
        <Link href="/">inicio</Link>
        <ChevronRight size={12} />
        <Link href="/cursos">cursos</Link>
        <ChevronRight size={12} />
        <span>{leccion.titulo}</span>
      </div>

      <div className="animate-fade-up" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '48px', height: '48px',
            background: esTeoria ? 'rgba(124,58,237,0.15)' : 'rgba(16,185,129,0.15)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {esTeoria
              ? <BookOpen size={22} color="#a78bfa" />
              : <Code2 size={22} color="var(--success)" />
            }
          </div>
          <span className={`badge badge-${leccion.tipo}`}>{leccion.tipo}</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '16px' }}>
          {leccion.titulo}
        </h1>
        <div className="divider" />
      </div>

      <div className="animate-fade-up delay-100" style={{ marginBottom: '48px' }}>
        {esTeoria ? (
          <div className="card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <BookOpen size={18} color="var(--accent)" />
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Contenido teórico
              </span>
            </div>

            {leccion.contenido ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {leccion.contenido.trim().split('\n\n').map((bloque, i) => {
                  const lineas = bloque.trim().split('\n');
                  const esList = lineas.some(l => l.trim().startsWith('-'));
                  if (esList) {
                    const tituloBloque = lineas.find(l => !l.trim().startsWith('-'));
                    const items = lineas.filter(l => l.trim().startsWith('-'));
                    return (
                      <div key={i} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px' }}>
                        {tituloBloque && (
                          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--accent)', marginBottom: '12px', fontSize: '0.9rem' }}>
                            {tituloBloque.trim()}
                          </p>
                        )}
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {items.map((item, j) => (
                            <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--text-2)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                              <span style={{ color: 'var(--accent)', fontWeight: 700, marginTop: '2px' }}>→</span>
                              <span>{item.replace(/^-\s*/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={i} style={{ color: 'var(--text-2)', lineHeight: '1.8', fontSize: '1rem' }}>
                      {bloque.trim()}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: 'var(--text-2)', lineHeight: '1.8', fontSize: '1rem' }}>
                En esta lección aprenderás los conceptos fundamentales de{' '}
                <strong style={{ color: 'var(--text)' }}>{leccion.titulo.toLowerCase()}</strong>.
              </p>
            )}

            <div style={{ marginTop: '24px', padding: '16px 20px', background: 'rgba(0,229,255,0.05)', borderRadius: '10px', border: '1px solid rgba(0,229,255,0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={14} color="var(--accent)" style={{ minWidth: '14px' }} />
              <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: '1.5', margin: 0 }}>
                Completa los ejercicios al final de cada lección práctica para verificar tu aprendizaje.
              </p>
            </div>

            <MarcarLeida id_leccion={leccion.id_leccion} />
          </div>
        ) : (
          <div style={{ padding: '24px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <Zap size={20} color="var(--success)" style={{ marginTop: '2px', minWidth: '20px' }} />
            <div>
              <strong style={{ color: 'var(--success)', fontFamily: 'Syne, sans-serif' }}>Lección práctica</strong>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', marginTop: '4px', lineHeight: '1.6' }}>
                Completa los siguientes ejercicios escribiendo el código correcto. El sistema verificará tu respuesta automáticamente.
              </p>
            </div>
          </div>
        )}
      </div>

      {ejercicios.length > 0 && (
        <div className="animate-fade-up delay-200">
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code2 size={20} color="var(--accent)" />
            Ejercicios
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
              {ejercicios.length}
            </span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ejercicios.map((ej, i) => (
              <EjercicioCard key={ej.id_ejercicio} ejercicio={ej} numero={i + 1} />
            ))}
          </div>
        </div>
      )}

      {ejercicios.length === 0 && (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <Code2 size={36} color="var(--text-3)" style={{ margin: '0 auto 12px' }} />
          <p style={{ color: 'var(--text-3)' }}>Esta lección no tiene ejercicios aún.</p>
        </div>
      )}

      {/* Navegación entre lecciones */}
      <div style={{
        marginTop: '48px', paddingTop: '32px',
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: '16px', flexWrap: 'wrap',
      }}>
        <div>
          {nav.anterior ? (
            <Link href={`/lecciones/${nav.anterior.id_leccion}`} className="btn-secondary">
              ← {nav.anterior.titulo}
            </Link>
          ) : (
            <Link href="/cursos" className="btn-secondary">
              ← Volver a cursos
            </Link>
          )}
        </div>
        <div>
          {nav.siguiente && (
            <Link href={`/lecciones/${nav.siguiente.id_leccion}`} className="btn-primary">
              {nav.siguiente.titulo} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}