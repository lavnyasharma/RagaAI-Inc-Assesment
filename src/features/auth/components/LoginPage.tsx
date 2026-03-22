import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Activity, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
 // I'll create this helper component or just use an icon
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { useToast } from '../../../components/ui/Toast';
import { GoogleIcon } from './GoogleIcon';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { login, signup, loginWithGoogle, isLoading, error: authError } = useAuthStore();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signup(email, password, name);
        success('Account created!', 'Your medical dashboard is ready.');
      } else {
        await login(email, password);
        success('Welcome back!', 'Successfully signed in to your dashboard.');
      }
      navigate('/dashboard');
    } catch (err: any) {
      toastError(isSignUp ? 'Signup Failed' : 'Authentication Failed', err.message || 'Please check your information.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      success('Welcome!', 'Successfully signed in with Google.');
      navigate('/dashboard');
    } catch (err: any) {
      toastError('Google Login Failed', 'Could not authenticate with Google.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-info/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-info flex items-center justify-center shadow-2xl shadow-primary-500/20 mb-4 animate-bounce-subtle">
            <Activity className="w-8 h-8 text-zinc-950 stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight">MedDash</h1>
          <p className="text-sm text-zinc-500 mt-2">Healthcare System Intelligence</p>
        </div>

        <Card className="!p-8 shadow-2xl border-zinc-800/60 bg-zinc-900/40 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-100">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
            <p className="text-xs text-zinc-500 mt-1">
              {isSignUp ? 'Register for system access' : 'Enter your credentials to access the portal'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <Input
                label="Full Name"
                type="text"
                placeholder="Dr. Sarah Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<UserPlus className="w-4 h-4" />}
                required
              />
            )}
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@meddash.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
              autoFocus
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            {(authError || authError === '') && (
              <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 flex items-center gap-2 text-xs text-danger animate-shake">
                <p>{authError || 'An unexpected error occurred.'}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full !h-11 shadow-lg shadow-primary-500/10"
              isLoading={isLoading}
              rightIcon={isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            >
              {isSignUp ? 'Create Account' : 'Access Dashboard'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                <span className="bg-zinc-900 px-3 text-zinc-600">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="w-full !h-11 border-zinc-800 hover:border-zinc-700 font-semibold"
              onClick={handleGoogleLogin}
              leftIcon={<GoogleIcon className="w-4 h-4" />}
            >
              Google Workspace
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800/40 flex flex-col items-center gap-4">
            <button 
              type="button" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-medium text-primary-500 hover:text-primary-400 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
            
            <div className="flex items-center justify-between w-full">
              <button type="button" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                Forgot password?
              </button>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-700">
                V2.1.0-AER
              </span>
            </div>
          </div>
        </Card>

        <p className="text-center text-[11px] text-zinc-600 mt-8 max-w-[280px] mx-auto leading-relaxed">
          Authorized personnel only. All access attempt and system activity is monitored and logged.
        </p>
      </div>
    </div>
  );
}
