import { CartCounter } from '@/shopping-cart/components/CartCounter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Counter Page',
};

export default function CounterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1>Counter Page</h1>
      <span>Productos en el carrito</span>
      <CartCounter />
    </div>
  );
}
