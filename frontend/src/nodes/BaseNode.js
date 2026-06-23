// BaseNode.js — shared abstraction for all pipeline nodes

import { Handle, Position } from 'reactflow';

export const NODE_COLORS = {
  customInput:  '#1f6feb',
  customOutput: '#388bfd',
  llm:          '#8957e5',
  text:         '#2ea043',
  filter:       '#d29922',
  merge:        '#f78166',
  api:          '#0092ab',
  code:         '#3fb950',
  note:         '#e3b341',
};

const containerStyle = (width, height, extra = {}) => ({
  background: '#1c2333',
  border: '1px solid #30363d',
  borderRadius: 8,
  color: '#e6edf3',
  fontSize: 12,
  fontFamily: "'Inter','Segoe UI',sans-serif",
  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
  minWidth: width || 220,
  ...(height ? { minHeight: height } : {}),
  position: 'relative',
  ...extra,
});

const makeHeaderStyle = (color) => ({
  background: color,
  borderRadius: '7px 7px 0 0',
  padding: '7px 12px',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  userSelect: 'none',
});

const handleBase = {
  width: 10,
  height: 10,
  border: '2px solid #0d1117',
  borderRadius: '50%',
};

/**
 * BaseNode — reusable node shell used by every node type.
 *
 * Props:
 *   id          – ReactFlow node id
 *   type        – node type key (used to look up color)
 *   title       – header label
 *   icon        – optional leading character/emoji in header
 *   inputs      – [{ id, label, color? }]  → target handles on left
 *   outputs     – [{ id, label, color? }]  → source handles on right
 *   children    – body content (fields, descriptions, etc.)
 *   minWidth    – number (default 220)
 *   minHeight   – number (optional)
 *   style       – extra overrides on the container
 */
export const BaseNode = ({
  id,
  type,
  title,
  icon,
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
  minHeight,
  style = {},
}) => {
  const color = NODE_COLORS[type] || '#58a6ff';

  return (
    <div style={containerStyle(minWidth, minHeight, style)}>
      {/* ── Header ── */}
      <div style={makeHeaderStyle(color)}>
        {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
        <span>{title}</span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '10px 12px 12px' }}>
        {children}
      </div>

      {/* ── Target handles (inputs, left side) ── */}
      {inputs.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id}`}
          title={h.label || h.id}
          style={{
            ...handleBase,
            background: h.color || '#58a6ff',
            top: h.top || `${((i + 1) / (inputs.length + 1)) * 100}%`,
          }}
        />
      ))}

      {/* ── Source handles (outputs, right side) ── */}
      {outputs.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id}`}
          title={h.label || h.id}
          style={{
            ...handleBase,
            background: h.color || '#3fb950',
            top: h.top || `${((i + 1) / (outputs.length + 1)) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};
