import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { fieldStyle, textareaStyle } from './nodeStyles';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add your notes here...');
  const lines = note.split('\n');

  return (
    <BaseNode
      id={id}
      type="note"
      title="Note"
      icon="✎"
      inputs={[]}
      outputs={[]}
      style={{ background: '#2d2a1e', border: '1px solid #e3b34150' }}
    >
      <div style={fieldStyle}>
        <textarea
          style={{
            ...textareaStyle,
            background: 'transparent',
            border: 'none',
            color: '#e3b341',
            fontSize: 12,
            minHeight: Math.max(50, lines.length * 20),
            fontStyle: 'italic',
          }}
          value={note}
          rows={Math.max(3, lines.length)}
          onChange={e => setNote(e.target.value)}
          placeholder="Add your notes here..."
        />
      </div>
    </BaseNode>
  );
};
