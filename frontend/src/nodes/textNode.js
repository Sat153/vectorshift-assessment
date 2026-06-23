// Part 3: auto-resize + dynamic {{variable}} handles

import { useState, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { fieldStyle, labelStyle, textareaStyle } from './nodeStyles';

const VAR_REGEX = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let m;
  const re = new RegExp(VAR_REGEX.source, VAR_REGEX.flags);
  while ((m = re.exec(text)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      vars.push(m[1]);
    }
  }
  return vars;
};

const MIN_WIDTH  = 220;
const MIN_HEIGHT = 100;
const CHAR_W     = 8.5;
const LINE_H     = 22;
const H_PAD      = 60;
const V_PAD      = 110;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const variables = useMemo(() => extractVariables(currText), [currText]);

  const lines      = currText.split('\n');
  const longestLen = Math.max(...lines.map(l => l.length), 10);
  const nodeWidth  = Math.max(MIN_WIDTH,  longestLen * CHAR_W + H_PAD);
  const nodeHeight = Math.max(MIN_HEIGHT, lines.length * LINE_H + V_PAD);

  return (
    <BaseNode
      id={id}
      type="text"
      title="Text"
      icon="T"
      inputs={[]}   // variable handles rendered manually below
      outputs={[{ id: 'output', label: 'output' }]}
      style={{ width: nodeWidth, minHeight: nodeHeight }}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Text</label>
        <textarea
          style={{ ...textareaStyle, width: '100%', minHeight: Math.max(40, lines.length * LINE_H) }}
          value={currText}
          rows={Math.max(2, lines.length)}
          onChange={e => setCurrText(e.target.value)}
        />
      </div>

      {variables.length > 0 && (
        <div style={{ fontSize: 10, color: '#8b949e', marginTop: 4 }}>
          Variables: {variables.map(v => (
            <span key={v} style={{ marginRight: 6, color: '#e3b341' }}>{`{{${v}}}`}</span>
          ))}
        </div>
      )}

      {/* Dynamic variable handles on the left */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          title={v}
          style={{
            width: 10,
            height: 10,
            border: '2px solid #0d1117',
            borderRadius: '50%',
            background: '#e3b341',
            top: `${((i + 1) / (variables.length + 1)) * 100}%`,
          }}
        />
      ))}
    </BaseNode>
  );
};
