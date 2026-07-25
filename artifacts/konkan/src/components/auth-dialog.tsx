import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { supabase } from '@/lib/supabase';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: 'signin' | 'signup';
}

type Mode = 'signin' | 'signup' | 'magic';

export function AuthDialog({ open, onOpenChange, defaultMode = 'signin' }: AuthDialogProps) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'success'; text: string } | null>(null);

  const signIn = useAuthStore((s) => s.signIn);
  const signUp = useAuthStore((s) => s.signUp);

  const reset = () => {
    setMode(defaultMode);
    setEmail('');
    setPassword('');
    setName('');
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) setMessage({ kind: 'error', text: prettifyError(error.message) });
        else { onOpenChange(false); reset(); }
      } else if (mode === 'signup') {
        const { error } = await signUp(email, password, name);
        if (error) setMessage({ kind: 'error', text: prettifyError(error.message) });
        else {
          setMessage({ kind: 'success', text: 'Account created. Check your email to confirm, then sign in.' });
          setMode('signin');
        }
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) setMessage({ kind: 'error', text: prettifyError(error.message) });
        else setMessage({ kind: 'success', text: `Magic link sent to ${email}.` });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="sm:max-w-md bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] shadow-2xl">
        <p className="text-xs tracking-[0.35em] uppercase text-[#3a9e6e] mb-2">Konkan</p>
        <DialogTitle className="font-serif text-3xl text-[#f4ecd8] leading-tight">
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </DialogTitle>
        <DialogDescription className="text-[#f4ecd8]/65 text-sm">
          Save destinations, stays, and dishes to your wishlist. Your collection travels with you.
        </DialogDescription>

        <div className="grid grid-cols-3 gap-1.5 mt-2 text-sm">
          {(['signin', 'signup', 'magic'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setMessage(null); }}
              className={cn(
                'py-2 rounded-md border transition-colors',
                mode === m
                  ? 'bg-[#3a9e6e]/20 border-[#3a9e6e]/45 text-[#f4ecd8]'
                  : 'border-[#0d2d1e] text-[#f4ecd8]/60 hover:border-[#3a9e6e]/30'
              )}
            >
              {m === 'signin' ? 'Sign in' : m === 'signup' ? 'Sign up' : 'Magic link'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-3">
          {mode === 'signup' && (
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-transparent border-[#0d2d1e] text-[#f4ecd8] placeholder:text-[#f4ecd8]/40"
            />
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f4ecd8]/40 pointer-events-none" />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 bg-transparent border-[#0d2d1e] text-[#f4ecd8] placeholder:text-[#f4ecd8]/40"
            />
          </div>
          {mode !== 'magic' && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f4ecd8]/40 pointer-events-none" />
              <Input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pl-10 bg-transparent border-[#0d2d1e] text-[#f4ecd8] placeholder:text-[#f4ecd8]/40"
              />
            </div>
          )}
          {message && (
            <p className={cn('text-sm', message.kind === 'error' ? 'text-[#d45f2a]' : 'text-[#3a9e6e]')}>
              {message.text}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3a9e6e] hover:bg-[#3a9e6e]/90 text-[#f4ecd8] font-medium"
          >
            {loading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : mode === 'signin' ? 'Sign in'
              : mode === 'signup' ? 'Create account'
              : 'Send magic link'}
          </Button>
        </form>

        </DialogContent>
    </Dialog>
  );
}

function prettifyError(raw: string) {
  const map: Record<string, string> = {
    'Invalid login credentials': 'Incorrect email or password.',
    'User already registered': 'An account with this email exists — try signing in.',
    'Email not confirmed': 'Confirm your email first — check your inbox.',
    'rate limit': 'Too many attempts. Wait a minute and try again.',
  };
  const lower = (raw || '').toLowerCase();
  for (const k of Object.keys(map)) {
    if (lower.includes(k.toLowerCase())) return map[k];
  }
  return raw || 'Something went wrong. Try again.';
}
