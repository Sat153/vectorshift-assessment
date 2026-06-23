import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { fieldStyle, labelStyle, inputStyle, portRowStyle, portLabelStyle } from './nodeStyles';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      type="filter"
      title="Filter"
      icon="⊗"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'true',  label: 'true',  color: '#3fb950' },
        { id: 'false', label: 'false', color: '#f78166' },
      ]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Condition</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="e.g. value > 0"
          value={condition}
          onChange={e => setCondition(e.target.value)}
        />
      </div>
      <div style={portRowStyle}>
        <div style={portLabelStyle('left')}>input</div>
        <div>
          <div style={{ ...portLabelStyle('right'), color: '#3fb950' }}>true ↑</div>
          <div style={{ ...portLabelStyle('right'), color: '#f78166' }}>false ↓</div>
        </div>
      </div>
    </BaseNode>
  );
};
