import { BaseNode } from './BaseNode';
import { portRowStyle, portLabelStyle } from './nodeStyles';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="llm"
      title="LLM"
      icon="◆"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <div style={{ fontSize: 11, color: '#8b949e', marginBottom: 6 }}>
        Large Language Model node. Connect a system prompt and user prompt to generate a response.
      </div>
      <div style={portRowStyle}>
        <div>
          <div style={portLabelStyle('left')}>system</div>
          <div style={portLabelStyle('left')}>prompt</div>
        </div>
        <div style={portLabelStyle('right')}>response</div>
      </div>
    </BaseNode>
  );
};
