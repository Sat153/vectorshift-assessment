import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { fieldStyle, labelStyle, inputStyle, selectStyle } from './nodeStyles';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      type="customOutput"
      title="Output"
      icon="←"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[]}
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
          value={outputType}
          onChange={e => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
