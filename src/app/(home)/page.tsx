import { Metadata } from 'next';
import Home from './home';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return <Home />;
}
