'use client';
import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { getProgresoModulo } from '@/lib/progreso';

export default function ProgresoBar({ lecciones }) {
  const [progreso, setProgreso] = useState({ completadas: 0, total: 0 });

  useEffect(() => {
    setProgreso(getProgresoModulo(lecciones));
  }, [lecciones]);

  const porcentaje = progreso.total > 0
    ? Math.round((progreso.completadas / progreso.total) * 100)
    : 0;

  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '6px',
      }}>
        <span style={{
          fontSize: '0.75rem', color: 'var(--text-3)',
          fontFamily: 'Space Mono, monospace',
        }}>
          {progreso.completadas}/{progreso.total} lecciones
        </span>
        {porcentaje === 100 && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success)', fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}>
            <CheckCircle size={12} /> completado
          </span>
        )}
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${porcentaje}%` }} />
      </div>
    </div>
  );
}