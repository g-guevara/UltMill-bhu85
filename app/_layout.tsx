// app/_layout.tsx
import { Stack } from "expo-router";
import { ToastProvider } from './utils/ToastContext';
import { AuthProvider } from './utils/authContext';
import { CartProvider } from './utils/CartContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,  // Esto ocultará el header en todas las pantallas
            }}
          />
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}