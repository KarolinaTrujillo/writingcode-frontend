'use client';
import { useState } from 'react';
import { CheckCircle, XCircle, Terminal, Send, RotateCcw, Lightbulb } from 'lucide-react';

export default function EjercicioCard({ ejercicio, numero }) {
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState(null); // null | { es_correcto, mensaje }
  const [loading, setLoading] = useState(false);

  async function verificar() {
    if (!respuesta.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://writingcode-backend.onrender.com/api/v1/ejercicios/${ejercicio.id_ejercicio}/verificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ respuesta: respuesta.trim() }),
      });
      const json = await res.json();
      setResultado(json.data);
    } catch {
      setResultado({ es_correcto: false, mensaje: 'Error al conectar con el servidor.' });
    } finally {
      setLoading(false);
    }
  }

  function reintentar() {
    setResultado(null);
    setRespuesta('');
  }

  return (
    <div className="card" style={{
      padding: '32px',
      border: resultado
        ? resultado.es_correcto
          ? '1px solid rgba(16,185,129,0.4)'
          : '1px solid rgba(239,68,68,0.3)'
        : '1px solid var(--border)',
      transition: 'border-color 0.3s ease',
    }}>

      {/* Número del ejercicio */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.75rem', fontWeight: 700,
          color: 'var(--accent)',
        }}>
          {String(numero).padStart(2, '0')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Terminal size={14} color="var(--text-3)" />
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.72rem',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            ejercicio
          </span>
        </div>

        {/* Estado */}
        {resultado && (
          <div style={{ marginLeft: 'auto' }}>
            {resultado.es_correcto
              ? <CheckCircle size={20} color="var(--success)" />
              : <XCircle size={20} color="var(--danger)" />
            }
          </div>
        )}
      </div>

      {/* Instrucciones */}
      <div className="code-block" style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text)' }}>
        {ejercicio.instrucciones}
      </div>

      {/* Hint */}
      <div style={{
        display: 'flex', gap: '8px', alignItems: 'flex-start',
        padding: '12px 16px',
        background: 'rgba(0,229,255,0.05)',
        border: '1px solid rgba(0,229,255,0.1)',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <Lightbulb size={14} color="var(--accent)" style={{ marginTop: '2px', minWidth: '14px' }} />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', lineHeight: '1.5' }}>
          Escribe únicamente la parte que completa el código. No copies el enunciado completo.
        </p>
      </div>

      {/* Input de respuesta */}
      {!resultado?.es_correcto && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.75rem',
            color: 'var(--text-3)',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            Tu respuesta
          </label>
          <textarea
            className="input-field"
            placeholder="Escribe tu respuesta aquí..."
            value={respuesta}
            onChange={e => setRespuesta(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) verificar();
            }}
            disabled={loading}
            rows={3}
          />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: '6px', fontFamily: 'Space Mono, monospace' }}>
            Ctrl + Enter para verificar
          </p>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div className={resultado.es_correcto ? 'result-success' : 'result-error'} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {resultado.es_correcto
              ? <CheckCircle size={20} />
              : <XCircle size={20} />
            }
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem' }}>
              {resultado.mensaje}
            </span>
          </div>
          {resultado.es_correcto && (
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: 'rgba(16,185,129,0.1)',
              borderRadius: '8px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.82rem',
              color: 'var(--success)',
            }}>
              ✓ Tu respuesta: <strong>{respuesta}</strong>
            </div>
          )}
        </div>
      )}

      {/* Botones */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {!resultado?.es_correcto && (
          <button
            className="btn-success"
            onClick={verificar}
            disabled={loading || !respuesta.trim()}
            style={{ flex: 1, minWidth: '160px' }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }} />
                Verificando...
              </>
            ) : (
              <>
                <Send size={16} />
                Verificar respuesta
              </>
            )}
          </button>
        )}

        {resultado && !resultado.es_correcto && (
          <button className="btn-secondary" onClick={reintentar} style={{ flex: 1, minWidth: '120px' }}>
            <RotateCcw size={16} />
            Intentar de nuevo
          </button>
        )}

        {resultado?.es_correcto && (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '10px',
            color: 'var(--success)',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
          }}>
            <CheckCircle size={18} />
            ¡Ejercicio completado!
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
