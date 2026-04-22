import Link from 'next/link';
import { api } from '@/lib/api';
import { BookOpen, ArrowRight, Coffee, Package, Layers, ChevronRight } from 'lucide-react';

export const metadata = { title: 'Cursos — WritingCode' };

export default async function CursosPage() {
  let cursos = [];
  try { cursos = await api.getCursos(); } catch (e) { cursos = []; }

  const icons = { java: Coffee, docker: Package };
  const colors = { java: 'var(--java)', docker: 'var(--docker)' };
  const bgColors = { java: 'rgba(245,158,11,0.08)', docker: 'rgba(59,130,246,0.08)' };
  const borderColors = { java: 'rgba(245,158,11,0.2)', docker: 'rgba(59,130,246,0.2)' };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px' }}>

      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div className="breadcrumb" style={{ marginBottom: '16px' }}>
          <Link href="/">inicio</Link>
          <ChevronRight size={12} />
          <span>cursos</span>
        </div>
        <h1 className="animate-fade-up" style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '12px' }}>
          Todos los <span className="grad-text">cursos</span>
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: '1rem' }}>
          {cursos.length} curso{cursos.length !== 1 ? 's' : ''} disponible{cursos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid de cursos */}
      {cursos.length === 0 ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
          <Layers size={48} color="var(--text-3)" style={{ margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-2)' }}>No hay cursos disponibles. Verifica que el backend esté corriendo.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {cursos.map((curso, i) => {
            const Icon = icons[curso.tecnologia] || BookOpen;
            const color = colors[curso.tecnologia] || 'var(--accent)';
            const bg = bgColors[curso.tecnologia] || 'transparent';
            const border = borderColors[curso.tecnologia] || 'var(--border)';

            return (
              <Link key={curso.id_curso} href={`/cursos/${curso.id_curso}`} style={{ textDecoration: 'none' }}>
                <div className={`card animate-fade-up delay-${(i + 1) * 100}`} style={{
                  padding: '36px',
                  background: `linear-gradient(135deg, var(--surface) 0%, ${bg} 100%)`,
                  border: `1px solid ${border}`,
                  height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* Icono */}
                  <div style={{
                    width: '60px', height: '60px',
                    background: `${bg}`,
                    border: `1px solid ${border}`,
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <Icon size={28} color={color} />
                  </div>

                  {/* Badge */}
                  <span className={`badge badge-${curso.tecnologia}`} style={{ marginBottom: '14px', alignSelf: 'flex-start' }}>
                    {curso.tecnologia}
                  </span>

                  {/* Info */}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '10px' }}>
                    {curso.titulo}
                  </h3>
                  <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: '1.6', flex: 1, marginBottom: '24px' }}>
                    {curso.descripcion}
                  </p>

                  {/* CTA */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color, fontFamily: 'Space Mono, monospace', fontSize: '0.82rem', fontWeight: 700,
                  }}>
                    Ver módulos <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
