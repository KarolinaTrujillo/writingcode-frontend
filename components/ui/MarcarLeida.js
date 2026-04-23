'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, BookOpen } from 'lucide-react';
import { leccionCompletada, marcarLeccionCompletada } from '@/lib/progreso';

export default function MarcarLeida({ id_leccion }) {
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    setCompletada(leccionCompletada(id_leccion));
  }, [id_leccion]);

  function marcar() {
    marcarLeccionCompletada(id_leccion);
    setCompletada(true);
  }

  if (completada) {
    return (
      <div style={{
        marginTop: '20px',
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '12px 16px',
        background: 'rgba(16,185,129,0.08)',
        border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: '10px',
        color: 'var(--success)',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700, fontSize: '0.9rem',
      }}>
        <CheckCircle size={18} />
        Lección completada
      </div>
    );
  }

  return (
    <button onClick={marcar} style={{
      marginTop: '20px',
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '12px 20px',
      background: 'rgba(0,229,255,0.08)',
      border: '1px solid rgba(0,229,255,0.25)',
      borderRadius: '10px',
      color: 'var(--accent)',
      fontFamily: 'Syne, sans-serif',
      fontWeight: 700, fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      width: '100%',
      justifyContent: 'center',
    }}>
      <BookOpen size={16} />
      Marcar lección como leída ✓
    </button>
  );
}