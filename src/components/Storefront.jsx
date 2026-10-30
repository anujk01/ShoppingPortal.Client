import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Heart, Search, ShoppingBag, UserRound } from 'lucide-react';
import { categoriesFallback, productImageById, productsFallback } from '../data/catalog.js';
import { getCategories, getProducts } from '../services/api.js';

export function Storefront({ user, onSignOut }) {
  const [categories, setCategories] = useState(categoriesFallback);
  const [products, setProducts] = useState(productsFallback);
  const [category, setCategory] = useState('all');
  const [savedProducts, setSavedProducts] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    getCategories().then(items => setCategories([{ id: 'all', name: 'Everything', icon: '✳', color: '#e8eee5' }, ...items])).catch(() => {});
  }, []);

  useEffect(() => {
    getProducts(category)
      .then(items => setProducts(items.map(item => ({ ...item, imageUrl: productImageById[item.id] || productImageById.p1 }))))
      .catch(() => setProducts(category === 'all' ? productsFallback : productsFallback.filter(item => item.categoryId === category)));
  }, [category]);

  const visibleProducts = useMemo(() => products.filter(product => category === 'all' || product.categoryId === category), [products, category]);

  function toggleSaved(productId) {
    setSavedProducts(current => current.includes(productId) ? current.filter(id => id !== productId) : [...current, productId]);
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  return (
    <div className="storefront">
      <div className="announcement"><span>Thoughtfully chosen. Happily delivered.</span><span>Complimentary shipping on orders over $75</span></div>
      <header className="store-header">
        <a className="brand" href="#home"><span className="brand-mark">f.</span> foundry<span className="brand-period">.</span></a>
        <nav className="store-nav" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#new">New in</a><a href="#story">Our story</a></nav>
        <div className="store-actions">
          <span className="signed-in-user"><UserRound size={17} /><span>{user?.contact}</span></span>
          <button className="header-icon" type="button" aria-label="Search"><Search size={19} /></button>
          <button className="header-icon bag-button" type="button" aria-label="Shopping bag"><ShoppingBag size={19} /><span>0</span></button>
          <button className="sign-out-button" type="button" onClick={onSignOut}>Sign out</button>
        </div>
      </header>

      <main id="home">
        <section className="category-nav" aria-label="Shop by category">
          {categories.map(item => (
            <button key={item.id} className={`category-link ${category === item.id ? 'active' : ''}`} type="button" onClick={() => { setCategory(item.id); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <span className="category-bubble" style={{ backgroundColor: item.color }}>{item.icon}</span><span>{item.name}</span>
            </button>
          ))}
        </section>

        <section className="store-hero">
          <div className="hero-content">
            <span className="hero-overline"><i /> A MORE CONSIDERED KIND OF SHOPPING</span>
            <h1>Good things,<br /><em>found here.</em></h1>
            <p>Everyday essentials, little luxuries, and thoughtful finds for wherever life takes you.</p>
            <a className="hero-cta" href="#shop">Explore the collection <ArrowRight size={17} /></a>
            <div className="hero-social-proof"><span className="proof-stars">★★★★★</span><span>Loved by thousands of happy finders</span></div>
          </div>
          <div className="hero-photo" role="img" aria-label="Sunlit, thoughtfully styled living room with home goods">
            <div className="hero-photo-caption"><span>THE SLOW MORNING EDIT</span><strong>Make space for a little lovely.</strong></div>
          </div>
          <span className="hero-index">01 <i /> 04</span>
        </section>

        <section className="benefit-row" id="story">
          <div><span className="benefit-icon">✳</span><span><strong>Picked with purpose</strong><small>Every find earns its spot</small></span></div>
          <div><span className="benefit-icon">↗</span><span><strong>Nice things, fair prices</strong><small>Good quality, good value</small></span></div>
          <div><span className="benefit-icon">♡</span><span><strong>Here when you need us</strong><small>Real humans, real help</small></span></div>
        </section>

        <section className="collection-section" id="shop">
          <div className="section-intro"><div><span className="section-overline">THE GOOD STUFF</span><h2>{category === 'all' ? 'A little bit of lovely' : categories.find(item => item.id === category)?.name}<span>.</span></h2><p>Consider this your sign to treat yourself.</p></div><a href="#shop">View all <ArrowRight size={15} /></a></div>
          <div className="product-grid">
            {visibleProducts.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-photo-wrap">
                  <img className="product-photo" src={product.imageUrl} alt={product.name} loading="lazy" />
                  <span className="product-label">{product.badge}</span>
                  <button className={`favorite-button ${savedProducts.includes(product.id) ? 'saved' : ''}`} type="button" aria-label={savedProducts.includes(product.id) ? 'Remove from saved items' : 'Save item'} onClick={() => toggleSaved(product.id)}><Heart size={18} fill={savedProducts.includes(product.id) ? 'currentColor' : 'none'} /></button>
                  <button className="quick-add" type="button" onClick={() => showToast(`${product.name} added to your bag`)}>Add to bag <span>+</span></button>
                </div>
                <div className="product-details"><div><h3>{product.name}</h3><p>{product.description}</p></div><div className="product-price"><strong>${Number(product.price).toFixed(2)}</strong>{product.originalPrice && <del>${Number(product.originalPrice).toFixed(2)}</del>}</div></div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <p className="empty-products">More lovely things are on the way. Try another category.</p>}
        </section>

        <section className="newsletter" id="new"><div><span className="section-overline">A GOOD NOTE, NOW AND THEN</span><h2>Your next favorite<br /><em>is just around the corner.</em></h2><p>New finds, small joys, and first dibs. No noise.</p></div><form onSubmit={event => { event.preventDefault(); showToast('You’re on the list. Look out for a little hello soon.'); event.currentTarget.reset(); }}><label className="visually-hidden" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required /><button type="submit">Count me in <ArrowRight size={16} /></button></form></section>
      </main>

      <footer className="store-footer"><a className="brand" href="#home"><span className="brand-mark">f.</span> foundry<span className="brand-period">.</span></a><span>Good things, found here. © 2026 Foundry.</span><span>Signed in as {user?.contact}</span><button className="footer-signout" type="button" onClick={onSignOut}>Sign out</button></footer>
      {toast && <div className="store-toast" role="status">{toast}</div>}
    </div>
  );
}
