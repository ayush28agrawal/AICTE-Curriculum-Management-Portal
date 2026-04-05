import './Loading.css';

const Loading = ({ size = 'medium', text = 'Loading...' }) => {
  return (
    <div className={`loading loading-${size}`}>
      <div className="loading-spinner"></div>
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export const PageLoading = () => {
  return (
    <div className="page-loading">
      <div className="page-loading-content">
        <div className="loading-spinner-large"></div>
        <span className="loading-text">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
