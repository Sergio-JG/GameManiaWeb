import Header from '../components/HeaderComponent';
import Footer from '../components/Footer';
import GameList from '../components/GameList';
import { useState } from 'react';

import CartComponent from '../components/CartComponent';
import GameInterface from '../interfaces/GameInterface'

function Home() {

  const [isCartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<GameInterface[]>([]);

  const addToCart = (game: GameInterface) => {
    setCart([...cart, game]);
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <div>
      <Header handleCartOpen={handleCartOpen} />
      <CartComponent cart={cart} open={isCartOpen} onClose={handleCartClose} />
      <GameList addToCart={addToCart} />
      <Footer />
    </div>
  );
}

export default Home;
