'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, Code2, ArrowRight, CheckCircle } from 'lucide-react';
import { leccionCompletada } from '@/lib/progreso';

export default function LeccionItem({ leccion, isLast }) {
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    setCompletada(leccionCompletada(leccion.id_leccion));
  }, [leccion.id_leccion]);

  return (
    <Link href={`/lecciones/${leccion.id_leccion}`} style={{ textDecoration: 'none' }} className="leccion-row">
      <div style={{
        padding: '16px 28px',
        borderBottom: !isLast ? '1px solid var(--border)' : 'none',
        display: 'flex', alignItems: 'center', gap: '14px',
        transition: 'background 0.2s',
        cursor: 'pointer',
        background: completada ? 'rgba(16,185,129,0.04)' : 'transparent',
      }}>
        <div style={{
          width: '36px', height: '36px', minWidth: '36px',
          background: leccion.tipo === 'teoria' ? 'rgba(124,58,237,0.12)' : 'rgba(16,185,129,0.12)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {leccion.tipo === 'teoria'
            ? <BookOpen size={16} color="#a78bfa" />
            : <Code2 size={16} color="var(--success)" />
          }
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontWeight: 500, fontSize: '0.95rem', marginBottom: '4px',
            color: completada ? 'var(--success)' : 'var(--text)',
          }}>
            {leccion.titulo}
          </div>
          <span className={`badge badge-${leccion.tipo}`} style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
            {leccion.tipo}
          </span>
        </div>

        {completada
          ? <CheckCircle size={18} color="var(--success)" />
          : <ArrowRight size={16} color="var(--text-3)" />
        }
      </div>
    </Link>
  );
}