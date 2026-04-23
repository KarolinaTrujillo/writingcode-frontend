'use client';

export default function LoadingScreen({ texto = 'Cargando...' }) {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
    }}>
      <div className="bounce-loader" />
      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.85rem',
        color: 'var(--text-3)',
        letterSpacing: '0.05em',
      }}>
        {texto}
      </p>

      <style>{`
        .bounce-loader {
          position: relative;
          width: 120px;
          height: 90px;
          margin: 0 auto;
        }
        .bounce-loader:before {
          content: "";
          position: absolute;
          bottom: 30px;
          left: 50px;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          background: var(--accent);
          animation: bounce-up 0.5s ease-in-out infinite alternate;
        }
        .bounce-loader:after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          height: 7px;
          width: 45px;
          border-radius: 4px;
          box-shadow: 0 5px 0 var(--border-2), -35px 50px 0 var(--border-2), -70px 95px 0 var(--border-2);
          animation: bounce-step 1s ease-in-out infinite;
        }
        @keyframes bounce-up {
          0% { transform: scale(1, 0.7); }
          40% { transform: scale(0.8, 1.2); }
          60% { transform: scale(1, 1); }
          100% { bottom: 140px; }
        }
        @keyframes bounce-step {
          0% {
            box-shadow: 0 10px 0 rgba(0,0,0,0),
              0 10px 0 var(--border-2),
              -35px 50px 0 var(--border-2),
              -70px 90px 0 var(--border-2);
          }
          100% {
            box-shadow: 0 10px 0 var(--border-2),
              -35px 50px 0 var(--border-2),
              -70px 90px 0 var(--border-2),
              -70px 90px 0 rgba(0,0,0,0);
          }
        }
      `}</style>
    </div>
  );
}