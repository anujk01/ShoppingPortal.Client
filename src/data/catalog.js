export const categoriesFallback = [
  { id: 'all', name: 'Everything', icon: '✳', color: '#e8eee5' },
  { id: 'electronics', name: 'Electronics', icon: '⌁', color: '#e8efff' },
  { id: 'fashion', name: 'Fashion', icon: '✳', color: '#fce8e8' },
  { id: 'home', name: 'Home & Living', icon: '⌂', color: '#e6f3e9' },
  { id: 'beauty', name: 'Beauty', icon: '✿', color: '#f8eafa' },
  { id: 'appliances', name: 'Appliances', icon: '▤', color: '#fff0df' },
  { id: 'toys', name: 'Toys & More', icon: '☆', color: '#e4f4f2' },
  { id: 'grocery', name: 'Grocery', icon: '❋', color: '#f3f1dd' },
];

export const productsFallback = [
  { id: 'p1', name: 'Studio Wireless Headphones', description: 'Immersive sound, all-day comfort', price: 89, originalPrice: 129, categoryId: 'electronics', badge: 'BESTSELLER', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85' },
  { id: 'p2', name: 'Everyday Carry Backpack', description: 'Room for work, play and everything', price: 54, originalPrice: 72, categoryId: 'fashion', badge: '−25%', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85' },
  { id: 'p3', name: 'Minimal Ceramic Table Set', description: 'Thoughtful pieces for slow mornings', price: 38, categoryId: 'home', badge: 'NEW', imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=85' },
  { id: 'p4', name: 'Daily Ritual Skincare Kit', description: 'A simple routine, beautifully made', price: 42, originalPrice: 58, categoryId: 'beauty', badge: '−28%', imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85' },
  { id: 'p5', name: 'Compact Espresso Maker', description: 'Cafe-quality coffee, right at home', price: 119, originalPrice: 149, categoryId: 'appliances', badge: 'POPULAR', imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=85' },
  { id: 'p6', name: 'Weekend Trail Sneakers', description: 'Lightweight grip for wherever you go', price: 76, categoryId: 'fashion', badge: 'JUST IN', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85' },
];

export const productImageById = Object.fromEntries(productsFallback.map(product => [product.id, product.imageUrl]));
