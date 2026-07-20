import { Link } from 'wouter';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-serif text-primary">404</h1>
      <p className="mt-4 text-xl">The path you seek is hidden in the jungle.</p>
      <Link href="/">
        <button className="mt-8 rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
          Return Home
        </button>
      </Link>
    </div>
  );
}
