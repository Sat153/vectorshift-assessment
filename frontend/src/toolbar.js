import { DraggableNode } from './draggableNode';

const NODES = [
  { type: 'customInput',  label: 'Input',   icon: '→'  },
  { type: 'llm',          label: 'LLM',     icon: '◆'  },
  { type: 'customOutput', label: 'Output',  icon: '←'  },
  { type: 'text',         label: 'Text',    icon: 'T'  },
  { type: 'filter',       label: 'Filter',  icon: '⊗'  },
  { type: 'merge',        label: 'Merge',   icon: '⊕'  },
  { type: 'api',          label: 'API',     icon: '⟳'  },
  { type: 'code',         label: 'Code',    icon: '{}'  },
  { type: 'note',         label: 'Note',    icon: '✎'  },
];

export const PipelineToolbar = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      background: '#161b22',
      borderBottom: '1px solid #30363d',
      flexWrap: 'wrap',
    }}>
      <span style={{
        fontSize: 11,
        fontWeight: 700,
        color: '#8b949e',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginRight: 4,
        whiteSpace: 'nowrap',
      }}>
        Nodes
      </span>
      {NODES.map(n => (
        <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} />
      ))}
    </div>
  );
};
