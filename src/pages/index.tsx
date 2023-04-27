import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-6xl font-bold mt-6">Home Page</h2>
    </main>
  );
};

export default Home;
