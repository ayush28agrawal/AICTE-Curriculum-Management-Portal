import { HiOutlineRefresh } from 'react-icons/hi';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className} ${loading ? 'btn-loading' : ''} ${fullWidth ? 'btn-full' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <HiOutlineRefresh className="btn-spinner" />}
      {Icon && !loading && iconPosition === 'left' && <Icon className="btn-icon" />}
      {children && <span className="btn-text">{children}</span>}
      {Icon && !loading && iconPosition === 'right' && <Icon className="btn-icon" />}
    </button>
  );
};

export default Button;
