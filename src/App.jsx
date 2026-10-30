import { useEffect, useState } from 'react';
import { LoginPage } from './components/LoginPage.jsx';
import { Storefront } from './components/Storefront.jsx';
import { getCurrentUser } from './services/api.js';
import './styles.css';

const TOKEN_KEY = 'shopping-token';

export default function App() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setCheckingSession(false);
      return;
    }
    getCurrentUser(token)
      .then(user => setSession({ token, user }))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setCheckingSession(false));
  }, []);

  function handleAuthenticated(result) {
    localStorage.setItem(TOKEN_KEY, result.accessToken);
    setSession({ token: result.accessToken, user: { contact: result.contact } });
  }

  function handleSignOut() {
    localStorage.removeItem(TOKEN_KEY);
    setSession(null);
  }

  if (checkingSession) {
    return <main className="session-loading"><span className="loading-mark">f.</span><p>Getting your good things ready…</p></main>;
  }

  return session
    ? <Storefront user={session.user} onSignOut={handleSignOut} />
    : <LoginPage onAuthenticated={handleAuthenticated} />;
}
