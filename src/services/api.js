const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5187').replace(/\/$/, '');

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch {
    throw new Error('Could not reach the ShoppingPortal API. Start the backend and try again.');
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;
  if (!response.ok) throw new Error(payload?.message || `Request failed (${response.status}).`);
  return payload;
}

export function requestOtp(value, kind) {
  return request('/api/auth/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value, kind }),
  });
}

export function verifyOtp(value, kind, code) {
  return request('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value, kind, code }),
  });
}

export function getCurrentUser(token) {
  return request('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
}

export function getCategories() {
  return request('/api/catalog/categories');
}

export function getProducts(categoryId) {
  const query = categoryId && categoryId !== 'all' ? `?categoryId=${encodeURIComponent(categoryId)}` : '';
  return request(`/api/catalog/products${query}`);
}
