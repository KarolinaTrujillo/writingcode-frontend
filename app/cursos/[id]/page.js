import Link from 'next/link';
import { api } from '@/lib/api';
import { BookOpen, ChevronRight, Coffee, Package, Layers } from 'lucide-react';
import LeccionItem from '@/components/ui/LeccionItem';
import ProgresoBar from '@/components/ui/ProgresoBar';

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const curso = await api.getCurso(id);
    return { title: `${curso.titulo} — WritingCode` };
  } catch { return { title: 'Curso — WritingCode' }; }
}

export default async function CursoPage({ params }) {
  const { id } = await params;
  let curso = null, modulos = [], dockerImages = [];
  try {
    curso = await api.getCurso(id);
    modulos = await api.getModulosByCurso(id);

    modulos = await Promise.all(
      modulos.map(async (m) => {
        try {
          const lecciones = await api.getLeccionesByModulo(m.id_modulo);
          return { ...m, lecciones };
        } catch { return { ...m, lecciones: [] }; }
      })
    );

    if (curso.tecnologia === 'docker') {
      try { dockerImages = await api.getDockerHubPopular(); }
      catch { dockerImages = []; }
    }
  } catch (e) {
    return (
      <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-2)' }}>No se pudo cargar el curso. Verifica que el backend esté corriendo.</p>
        <Link href="/cursos" className="btn-secondary" style={{ marginTop: '24px', display: 'inline-flex' }}>Volver</Link>
      </div>
    );
  }

  const Icon = curso.tecnologia === 'java' ? Coffee : Package;
  const color = curso.tecnologia === 'java' ? 'var(--java)' : 'var(--docker)';
  const totalLecciones = modulos.reduce((acc, m) => acc + (m.lecciones?.length || 0), 0);

  return (
    <div>
      {/* HERO DEL CURSO */}
      <div className="grid-bg" style={{
        padding: '56px 32px',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 100%)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="breadcrumb" style={{ marginBottom: '24px' }}>
            <Link href="/">inicio</Link>
            <ChevronRight size={12} />
            <Link href="/cursos">cursos</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-2)' }}>{curso.titulo}</span>
          </div>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px', height: '80px', minWidth: '80px',
              background: `rgba(${curso.tecnologia === 'java' ? '245,158,11' : '59,130,246'},0.12)`,
              border: `1px solid ${color}33`,
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={40} color={color} />
            </div>

            <div style={{ flex: 1 }}>
              <span className={`badge badge-${curso.tecnologia}`} style={{ marginBottom: '12px' }}>
                {curso.tecnologia}
              </span>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>
                {curso.titulo}
              </h1>
              <p style={{ color: 'var(--text-2)', fontSize: '1rem', marginBottom: '24px', maxWidth: '560px' }}>
                {curso.descripcion}
              </p>
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {[
                  { icon: <Layers size={14} />, value: modulos.length, label: 'Módulos' },
                  { icon: <BookOpen size={14} />, value: totalLecciones, label: 'Lecciones' },
                ].map(({ icon, value, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-2)', fontSize: '0.9rem' }}>
                    <span style={{ color }}>{icon}</span>
                    <strong style={{ color: 'var(--text)' }}>{value}</strong> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MÓDULOS Y LECCIONES */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 32px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '32px' }}>
          Contenido del curso
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {modulos.map((modulo, mi) => (
            <div key={modulo.id_modulo} className="card" style={{ padding: '0', overflow: 'hidden' }}>
              {/* Header del módulo */}
              <div style={{
                padding: '20px 28px',
                background: 'var(--surface-2)',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '32px', height: '32px', minWidth: '32px',
                    background: color + '22',
                    border: `1px solid ${color}44`,
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.75rem', fontWeight: 700, color,
                  }}>
                    {String(mi + 1).padStart(2, '0')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{modulo.titulo}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontFamily: 'Space Mono, monospace' }}>
                      {modulo.lecciones.length} lección{modulo.lecciones.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                </div>
                {/* Barra de progreso del módulo */}
                <ProgresoBar lecciones={modulo.lecciones} />
              </div>

              {/* Lista de lecciones */}
              <div>
                {modulo.lecciones.map((leccion, li) => (
                  <LeccionItem
                    key={leccion.id_leccion}
                    leccion={leccion}
                    isLast={li === modulo.lecciones.length - 1}
                  />
                ))}
                {modulo.lecciones.length === 0 && (
                  <div style={{ padding: '24px 28px', color: 'var(--text-3)', fontSize: '0.9rem' }}>
                    Sin lecciones aún.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DOCKER HUB API */}
        {curso.tecnologia === 'docker' && dockerImages.length > 0 && (
          <div style={{ marginTop: '56px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🐳</span>
                Imágenes populares en Docker Hub
              </h2>
              <p style={{ color: 'var(--text-2)', fontSize: '0.82rem', fontFamily: 'Space Mono, monospace' }}>
                datos en tiempo real · fuente: Docker Hub API oficial
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {dockerImages.map((img) => (
                <a key={img.nombre} href={img.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{
                    padding: '24px',
                    border: '1px solid rgba(59,130,246,0.2)',
                    background: 'linear-gradient(135deg, var(--surface) 0%, rgba(59,130,246,0.05) 100%)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '1.4rem' }}>📦</span>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, color: 'var(--docker)', fontSize: '1rem' }}>
                        {img.nombre}
                      </span>
                      <span className="badge badge-docker" style={{ marginLeft: 'auto', fontSize: '0.6rem' }}>oficial</span>
                    </div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'Space Mono, monospace', marginBottom: '4px' }}>PULLS</div>
                        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{(img.pulls / 1e9).toFixed(1)}B</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontFamily: 'Space Mono, monospace', marginBottom: '4px' }}>STARS</div>
                        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>{(img.stars / 1000).toFixed(1)}K</div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px' }}>
          <Link href="/cursos" className="btn-secondary">
            ← Volver a cursos
          </Link>
        </div>
      </div>
    </div>
  );
}
