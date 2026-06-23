import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const nodes = useStore(s => s.nodes);
  const edges = useStore(s => s.edges);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const { num_nodes, num_edges, is_dag } = await res.json();
      alert(
        `Pipeline Analysis\n` +
        `─────────────────\n` +
        `Nodes : ${num_nodes}\n` +
        `Edges : ${num_edges}\n` +
        `Is DAG: ${is_dag ? 'Yes ✓' : 'No ✗ (contains a cycle)'}`
      );
    } catch (err) {
      alert(`Could not reach backend.\n\n${err.message}\n\nMake sure the server is running:\n  uvicorn main:app --reload`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '10px 16px',
      background:     '#161b22',
      borderTop:      '1px solid #30363d',
    }}>
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background:    loading ? '#21262d' : '#1f6feb',
          color:         loading ? '#8b949e' : '#fff',
          border:        'none',
          borderRadius:  6,
          padding:       '8px 28px',
          fontSize:      13,
          fontWeight:    700,
          cursor:        loading ? 'not-allowed' : 'pointer',
          letterSpacing: '0.04em',
          transition:    'background 0.15s',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#388bfd'; }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#1f6feb'; }}
      >
        {loading ? 'Submitting…' : 'Submit Pipeline'}
      </button>
    </div>
  );
};
