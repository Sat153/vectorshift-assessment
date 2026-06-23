import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { fieldStyle, labelStyle, inputStyle, selectStyle } from './nodeStyles';

export const APINode = ({ id, data }) => {
  const [url,    setUrl]    = useState(data?.url    || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      type="api"
      title="API Call"
      icon="⟳"
      inputs={[{ id: 'body', label: 'body / params' }]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Method</label>
        <select style={selectStyle} value={method} onChange={e => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>URL</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="https://api.example.com/..."
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
