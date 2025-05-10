import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  backgroundColor?: string;
}

// Cart context interface
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Load cart items from AsyncStorage on mount
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  // Update totals and save to AsyncStorage whenever cart changes
  useEffect(() => {
    const newTotalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    setTotalPrice(newTotalPrice);
    setTotalItems(newTotalItems);
    
    // Save to AsyncStorage
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart items:', error);
      }
    };
    
    saveCartItems();
  }, [cartItems]);

  // Handle different product formats (from HomeScreen or ProductInfoScreen)
  const addToCart = (product: any) => {
    // Extract product data based on available properties
    const productId = product.id || product.code || '';
    const productName = product.name || product.product_name || '';
    const productPrice = typeof product.price === 'number' ? product.price : 0;
    const productImage = product.image_url || '';
    const productBgColor = product.backgroundColor || '';
    
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === productId);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, {
          id: productId,
          name: productName,
          price: productPrice,
          quantity: 1,
          image: productImage,
          backgroundColor: productBgColor
        }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};