import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { fieldStyle, labelStyle, inputStyle, selectStyle } from './nodeStyles';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      type="customInput"
      title="Input"
      icon="→"
      inputs={[]}
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          type="text"
          value={currName}
          onChange={e => setCurrName(e.target.value)}
        />
      </div>
      <div style={fieldStyle}>
        <label style={labelStyle}>Type</label>
        <select
          style={selectStyle}
          value={inputType}
          onChange={e => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
