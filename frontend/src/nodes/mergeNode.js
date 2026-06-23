import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { fieldStyle, labelStyle, selectStyle, portRowStyle, portLabelStyle } from './nodeStyles';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      type="merge"
      title="Merge"
      icon="⊕"
      inputs={[
        { id: 'input_1', label: 'input 1' },
        { id: 'input_2', label: 'input 2' },
      ]}
      outputs={[{ id: 'merged', label: 'merged' }]}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>Strategy</label>
        <select
          style={selectStyle}
          value={strategy}
          onChange={e => setStrategy(e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="json">JSON Object</option>
          <option value="array">Array</option>
        </select>
      </div>
      <div style={portRowStyle}>
        <div>
          <div style={portLabelStyle('left')}>input 1</div>
          <div style={portLabelStyle('left')}>input 2</div>
        </div>
        <div style={portLabelStyle('right')}>merged</div>
      </div>
    </BaseNode>
  );
};
