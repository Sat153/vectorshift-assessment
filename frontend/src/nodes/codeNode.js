import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { fieldStyle, labelStyle, selectStyle, textareaStyle } from './nodeStyles';

export const CodeNode = ({ id, data }) => {
  const [language, setLanguage] = useState(data?.language || 'python');
  const [code,     setCode]     = useState(data?.code     || '# write your code here\nresult = input');

  const lines     = code.split('\n');
  const minHeight = Math.max(120, lines.length * 20 + 100);

  return (
    <BaseNode
      id={id}
      type="code"
      title="Code"
      icon="{}"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
      style={{ minHeight }}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Language</label>
        <select style={selectStyle} value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="bash">Bash</option>
        </select>
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Code</label>
        <textarea
          style={{ ...textareaStyle, minHeight: Math.max(60, lines.length * 18), fontFamily: 'monospace', fontSize: 11 }}
          value={code}
          rows={Math.max(3, lines.length)}
          onChange={e => setCode(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
