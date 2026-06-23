import { PipelineToolbar } from './toolbar';
import { PipelineUI }      from './ui';
import { SubmitButton }    from './submit';

function App() {
  return (
    <div style={{
      display:        'flex',
      flexDirection:  'column',
      height:         '100vh',
      background:     '#0d1117',
      color:          '#e6edf3',
      overflow:       'hidden',
    }}>
      {/* Top bar with logo + node palette */}
      <div style={{
        display:      'flex',
        alignItems:   'center',
        background:   '#161b22',
        borderBottom: '1px solid #30363d',
      }}>
        <div style={{
          padding:     '10px 18px',
          fontWeight:  800,
          fontSize:    15,
          color:       '#58a6ff',
          letterSpacing: '0.02em',
          borderRight: '1px solid #30363d',
          whiteSpace:  'nowrap',
          userSelect:  'none',
        }}>
          VectorShift
        </div>
        <PipelineToolbar />
      </div>

      {/* Canvas */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PipelineUI />
      </div>

      {/* Submit bar */}
      <SubmitButton />
    </div>
  );
}

export default App;
