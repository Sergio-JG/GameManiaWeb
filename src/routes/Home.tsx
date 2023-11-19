import Header from '../components/Header';
import Footer from '../components/Footer';
import GameList from '../components/GameList';
import { useState } from 'react';

import CartComponent from '../components/CartComponent';
import GameInterface from '../interfaces/GameInterface'

function Home() {

  const [isCartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<GameInterface[]>([]);

  const addToCart = (game: GameInterface) => {
    const existingGameIndex = cart.findIndex((item) => item.gameId === game.gameId);
    if (existingGameIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingGameIndex) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...game, quantity: 1 }]);
    }
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <><Header handleCartOpen={handleCartOpen} /><CartComponent cart={cart} open={isCartOpen} onClose={handleCartClose} /><GameList addToCart={addToCart} /><Footer /></>
  );
}

export default Home;
