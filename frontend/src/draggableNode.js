import { NODE_COLORS } from './nodes/BaseNode';

export const DraggableNode = ({ type, label, icon }) => {
  const color = NODE_COLORS[type] || '#58a6ff';

  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.7';
  };

  const onDragEnd = (event) => {
    event.target.style.opacity = '1';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 6,
        border: `1px solid ${color}55`,
        background: `${color}18`,
        color: '#e6edf3',
        fontSize: 12,
        fontWeight: 600,
        userSelect: 'none',
        transition: 'background 0.15s, border-color 0.15s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}35`; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${color}18`; }}
    >
      {icon && <span style={{ fontSize: 14, lineHeight: 1 }}>{icon}</span>}
      <span style={{ color }}>{label}</span>
    </div>
  );
};
