import { HiOutlineChevronDown } from 'react-icons/hi';
import './Form.css';

export const FormGroup = ({ children, label, error, required, hint }) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  disabled,
  icon: Icon,
  ...props 
}) => {
  return (
    <div className={`input-wrapper ${Icon ? 'has-icon' : ''}`}>
      {Icon && <Icon className="input-icon" />}
      <input
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export const TextArea = ({ 
  placeholder, 
  value, 
  onChange, 
  rows = 4,
  disabled,
  ...props 
}) => {
  return (
    <textarea
      className="form-textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      {...props}
    />
  );
};

export const Select = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select option',
  disabled,
  ...props 
}) => {
  return (
    <div className="select-wrapper">
      <select
        className="form-select"
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <HiOutlineChevronDown className="select-icon" />
    </div>
  );
};

export const FileInput = ({ accept, onChange, disabled, label = 'Choose file', fileName }) => {
  return (
    <div className="file-input-wrapper">
      <input
        type="file"
        className="form-file-input"
        accept={accept}
        onChange={onChange}
        disabled={disabled}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="file-input-label">
        <span className="file-input-text">{fileName ? fileName : label}</span>
        <span className="file-input-hint">PDF files up to 10MB</span>
      </label>
    </div>
  );
};
