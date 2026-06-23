import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode }    from './nodes/inputNode';
import { LLMNode }      from './nodes/llmNode';
import { OutputNode }   from './nodes/outputNode';
import { TextNode }     from './nodes/textNode';
import { FilterNode }   from './nodes/filterNode';
import { MergeNode }    from './nodes/mergeNode';
import { APINode }      from './nodes/apiNode';
import { CodeNode }     from './nodes/codeNode';
import { NoteNode }     from './nodes/noteNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  filter:       FilterNode,
  merge:        MergeNode,
  api:          APINode,
  code:         CodeNode,
  note:         NoteNode,
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes, edges,
    getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event?.dataTransfer?.getData('application/reactflow');
      if (!raw) return;

      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID  = getNodeID(type);
      const newNode = {
        id:   nodeID,
        type,
        position,
        data: { id: nodeID, nodeType: type },
      };
      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#30363d" gap={gridSize} />
        <Controls style={{ background: '#1c2333', border: '1px solid #30363d' }} />
        <MiniMap
          style={{ background: '#161b22', border: '1px solid #30363d' }}
          nodeColor="#30363d"
          maskColor="rgba(13,17,23,0.7)"
        />
      </ReactFlow>
    </div>
  );
};
