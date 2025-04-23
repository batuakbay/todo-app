
const ErrorMessage = ({ message }) => (
  <div className="error-container">
    <h3>Hata Oluştu</h3>
    <p>{message}</p>
    <button onClick={() => window.location.reload()}>Yeniden Dene</button>
  </div>
);

export default ErrorMessage;