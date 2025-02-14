import { redirect } from 'next/navigation';

// TODO: La carpeta app solo debe ser para las rutas

export default function HomePage() {
  redirect('/dashboard/main');
  // return <h1>Hola mundo</h1>;
}
