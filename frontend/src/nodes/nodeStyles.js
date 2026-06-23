// Shared form-field styles used inside node bodies

export const fieldStyle = {
  marginBottom: 8,
};

export const labelStyle = {
  display: 'block',
  fontSize: 10,
  color: '#8b949e',
  marginBottom: 3,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export const inputStyle = {
  width: '100%',
  background: '#0d1117',
  border: '1px solid #30363d',
  color: '#e6edf3',
  borderRadius: 4,
  padding: '5px 8px',
  fontSize: 12,
  boxSizing: 'border-box',
  outline: 'none',
  fontFamily: 'inherit',
};

export const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
};

export const textareaStyle = {
  ...inputStyle,
  resize: 'none',
  lineHeight: '1.5',
  overflowY: 'hidden',
};

export const portRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 6,
};

export const portLabelStyle = (align = 'left') => ({
  fontSize: 10,
  color: '#8b949e',
  textAlign: align,
  fontStyle: 'italic',
});
