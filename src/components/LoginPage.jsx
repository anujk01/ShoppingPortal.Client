import { useState } from 'react';
import { ArrowRight, Check, LockKeyhole, Sparkles } from 'lucide-react';
import { requestOtp, verifyOtp } from '../services/api.js';

export function LoginPage({ onAuthenticated }) {
  const [kind, setKind] = useState('Email');
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [developmentCode, setDevelopmentCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleRequestCode(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = await requestOtp(contact, kind);
      setDevelopmentCode(result.developmentCode || '');
      setCodeSent(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleVerifyCode(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      onAuthenticated(await verifyOtp(contact, kind, code));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  function changeKind(nextKind) {
    setKind(nextKind);
    setContact('');
    setCode('');
    setCodeSent(false);
    setDevelopmentCode('');
    setError('');
  }

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Foundry home collection">
        <div className="auth-visual-shade" />
        <a className="brand brand-light" href="#welcome"><span className="brand-mark">f.</span> foundry<span className="brand-period">.</span></a>
        <div className="auth-visual-copy">
          <span className="eyebrow light-eyebrow"><i /> THE EVERYDAY EDIT</span>
          <h1>Find the<br />good in<br /><em>every day.</em></h1>
          <p>Thoughtful things for the life you’re making.</p>
        </div>
        <div className="auth-image-credit">A considered collection for home, style &amp; everyday rituals</div>
      </section>

      <section className="auth-panel" id="welcome">
        <div className="mobile-brand"><a className="brand" href="#welcome"><span className="brand-mark">f.</span> foundry<span className="brand-period">.</span></a></div>
        <div className="auth-card">
          <div className="auth-kicker"><Sparkles size={14} /> A LITTLE SOMETHING FOR YOU</div>
          <h2>{codeSent ? 'Check your messages.' : 'Welcome to Foundry.'}</h2>
          <p className="auth-description">{codeSent ? `We sent a one-time code to ${contact}.` : 'Sign in or create an account to discover your next favorite thing.'}</p>

          <div className="auth-tabs" role="tablist" aria-label="Choose sign-in method">
            {['Email', 'Mobile'].map(option => (
              <button key={option} type="button" role="tab" aria-selected={kind === option} className={kind === option ? 'active' : ''} onClick={() => changeKind(option)}>
                {option === 'Email' ? 'Email address' : 'Mobile number'}
              </button>
            ))}
          </div>

          {!codeSent ? (
            <form className="auth-form" onSubmit={handleRequestCode}>
              <label htmlFor="login-contact">{kind === 'Email' ? 'Email address' : 'Phone number'}</label>
              <input id="login-contact" type={kind === 'Email' ? 'email' : 'tel'} autoComplete={kind === 'Email' ? 'email' : 'tel'} placeholder={kind === 'Email' ? 'you@example.com' : '+91 98765 43210'} value={contact} onChange={event => setContact(event.target.value)} required />
              <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Sending code…' : 'Continue'} <ArrowRight size={17} /></button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleVerifyCode}>
              <label htmlFor="login-code">Your 6-digit code</label>
              <input id="login-code" className="otp-field" type="text" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} placeholder="000000" value={code} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} required autoFocus />
              <button className="auth-submit" type="submit" disabled={busy || code.length !== 6}>{busy ? 'Verifying…' : 'Verify & sign in'} <ArrowRight size={17} /></button>
              <button className="text-button change-contact" type="button" onClick={() => setCodeSent(false)}>Use a different {kind.toLowerCase()}</button>
            </form>
          )}

          {developmentCode && <div className="development-code"><Check size={15} /> Local development code: <strong>{developmentCode}</strong></div>}
          {error && <div className="auth-error" role="alert">{error}</div>}
          <div className="auth-assurance"><LockKeyhole size={14} /><span>Secure, password-free sign in with a one-time code.</span></div>
          <p className="auth-terms">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
        <footer className="auth-footer"><span>© 2026 Foundry</span><a href="mailto:hello@foundry.example">Need help?</a></footer>
      </section>
    </main>
  );
}
