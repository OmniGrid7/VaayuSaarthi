export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="overlay open" role="dialog" aria-modal="true" aria-label="Login" onClick={onClose}>
      <div className="modal" style={{ width: 340 }} onClick={event => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">✕</button>
        <h3>Welcome Back</h3>
        <p>Sign in to VaayuSaarthi for personalized air quality alerts.</p>
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input type="email" id="loginEmail" placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input type="password" id="loginPassword" placeholder="••••••••" />
        </div>
        <button className="btn-primary" type="button">Login</button>
      </div>
    </div>
  );
}