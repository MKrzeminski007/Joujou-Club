import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const products = [
  {
    id: 1,
    code: 'p1',
    name_fr: "Vibromasseur doux",
    name_en: "Soft Vibrator",
    price: 79.99,
    image: "https://via.placeholder.com/300x200",
    description_fr: "Un vibromasseur doux pour explorer en douceur.",
    description_en: "A soft vibrator for gentle exploration."
  },
  {
    id: 2,
    code: 'p2',
    name_fr: "Anneau vibrant",
    name_en: "Vibrating Ring",
    price: 39.99,
    image: "https://via.placeholder.com/300x200",
    description_fr: "Stimulez le plaisir avec cet anneau vibrant.",
    description_en: "Enhance pleasure with this vibrating ring."
  }
];

function HomePage({ lang, setLang, addToCart }) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Joujou Club</h1>
        <div className="space-x-4">
          <Link to="/cart" className="underline text-blue-500">{lang === 'fr' ? 'Panier' : 'Cart'}</Link>
          <Link to="/engagement" className="underline text-blue-500">{lang === 'fr' ? 'Notre engagement' : 'Our Commitment'}</Link>
          <Button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
            {lang === 'fr' ? 'English' : 'Français'}
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <Link to={`/produit/${product.code}`}>
              <img src={product.image} alt={lang === 'fr' ? product.name_fr : product.name_en} className="w-full h-48 object-cover rounded-t-2xl" />
            </Link>
            <CardContent>
              <h2 className="text-xl font-semibold">
                {lang === 'fr' ? product.name_fr : product.name_en}
              </h2>
              <p className="text-sm text-gray-600">
                {lang === 'fr' ? product.description_fr : product.description_en}
              </p>
              <p className="mt-2 font-bold">{product.price.toFixed(2)} $</p>
              <Button onClick={() => addToCart(product)} className="mt-2 w-full">
                {lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

function ProductPage({ lang, addToCart }) {
  const { code } = useParams();
  const product = products.find(p => p.code === code);
  const navigate = useNavigate();

  if (!product) return <div className="p-4">{lang === 'fr' ? 'Produit introuvable.' : 'Product not found.'}</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Button onClick={() => navigate(-1)} className="mb-4">← {lang === 'fr' ? 'Retour' : 'Back'}</Button>
      <img src={product.image} alt={lang === 'fr' ? product.name_fr : product.name_en} className="w-full h-64 object-cover rounded-2xl mb-4" />
      <h2 className="text-2xl font-bold">{lang === 'fr' ? product.name_fr : product.name_en}</h2>
      <p className="my-2">{lang === 'fr' ? product.description_fr : product.description_en}</p>
      <p className="font-bold mb-4">{product.price.toFixed(2)} $</p>
      <Button onClick={() => addToCart(product)}>{lang === 'fr' ? 'Ajouter au panier' : 'Add to cart'}</Button>
    </div>
  );
}

function CartPage({ cart, lang }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{lang === 'fr' ? 'Votre panier' : 'Your cart'}</h2>
      {cart.length === 0 ? (
        <p>{lang === 'fr' ? 'Votre panier est vide.' : 'Your cart is empty.'}</p>
      ) : (
        <div>
          {cart.map((item, i) => (
            <div key={i} className="mb-2 border-b pb-2">
              <p className="font-semibold">{lang === 'fr' ? item.name_fr : item.name_en}</p>
              <p>{item.price.toFixed(2)} $</p>
            </div>
          ))}
          <p className="mt-4 font-bold">{lang === 'fr' ? 'Total :' : 'Total:'} {total.toFixed(2)} $</p>
          <Button className="mt-2">{lang === 'fr' ? 'Passer à la caisse' : 'Checkout'}</Button>
        </div>
      )}
    </div>
  );
}

function EngagementPage({ lang }) {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{lang === 'fr' ? 'Notre engagement' : 'Our Commitment'}</h2>
      <p className="mb-2">
        {lang === 'fr'
          ? "Chez Joujou Club, nous croyons en une sexualité positive, inclusive et éducative. Tous nos produits sont sélectionnés avec soin pour leur qualité, leur sécurité et leur respect des diversités corporelles et identitaires."
          : "At Joujou Club, we believe in positive, inclusive, and educational sexuality. All our products are carefully selected for their quality, safety, and respect for bodily and identity diversity."}
      </p>
      <p>
        {lang === 'fr'
          ? "Nous privilégions les fabricants locaux et éthiques, et nous nous engageons à fournir des ressources éducatives pour promouvoir des relations saines et respectueuses."
          : "We prioritize ethical and local manufacturers, and we are committed to providing educational resources to promote healthy and respectful relationships."}
      </p>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [lang, setLang] = useState('fr');
  const addToCart = (product) => setCart([...cart, product]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} addToCart={addToCart} />} />
        <Route path="/produit/:code" element={<ProductPage lang={lang} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} lang={lang} />} />
        <Route path="/engagement" element={<EngagementPage lang={lang} />} />
      </Routes>
      <footer className="mt-12 text-center text-sm text-gray-500">
        {lang === 'fr'
          ? '© 2025 Joujou Club. Tous droits réservés.'
          : '© 2025 Joujou Club. All rights reserved.'}
      </footer>
    </Router>
  );
}
