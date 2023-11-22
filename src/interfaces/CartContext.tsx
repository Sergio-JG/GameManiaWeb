import { ReactNode, createContext, useEffect, useState } from "react";
import GameInterface from "./GameInterface";

export const CartContext = createContext<{
    cart: GameInterface[];
    setCart: React.Dispatch<React.SetStateAction<GameInterface[]>>;
    isCartOpen: boolean;
    addToCart: (game: GameInterface) => void;
    toggleCart: () => void;
    getTotalPrice: () => number;
    totalItemsInCart: number;
}>({
    cart: [],
    setCart: () => { },
    isCartOpen: false,
    addToCart: () => { },
    toggleCart: () => { },
    getTotalPrice: () => 0,
    totalItemsInCart: 0,
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState<GameInterface[]>(cartFromLocalStorage);
    const [isCartOpen, setCartOpen] = useState(false);

    const saveCartToLocalStorage = (cartData: GameInterface[]) => {
        localStorage.setItem('cart', JSON.stringify(cartData));
    };

    const addToCart = (game: GameInterface) => {
        const existingGame = cart.find((item) => item.gameId === game.gameId);

        if (existingGame) {
            const updatedCart = cart.map((item) =>
                item.gameId === game.gameId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
            saveCartToLocalStorage(updatedCart);
        } else {
            const newCart = [...cart, { ...game, quantity: 1 }];
            setCart(newCart);
            saveCartToLocalStorage(newCart);
        }
    };

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        saveCartToLocalStorage(cart);
    }, [cart]);

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const toggleCart = () => {
        setCartOpen((prevIsCartOpen) => !prevIsCartOpen);
    };


    const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                isCartOpen,
                addToCart,
                toggleCart,
                getTotalPrice,
                totalItemsInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
