import { WidgetsGrid } from '@/components/dashboard/WidgetsGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Dashboard',
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Informacion General</span>
      <WidgetsGrid />
    </div>
  );
}
