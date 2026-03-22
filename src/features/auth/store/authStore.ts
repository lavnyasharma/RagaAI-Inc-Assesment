import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '../../../services/firebase';
import type { User } from '../../../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,
      isAuthenticated: false,

      login: async (email, pass) => {
        set({ isLoading: true, error: null });
        
        // Demo Bypass for Preview
        if (email === 'admin@meddash.io' && pass === 'admin123') {
          await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network
          set({
            user: { uid: 'demo-user-id', email: 'admin@meddash.io', displayName: 'Demo Admin' },
            isAuthenticated: true,
            isLoading: false,
          });
          return;
        }

        try {
          const { user } = await signInWithEmailAndPassword(auth, email, pass);
          set({
            user: { uid: user.uid, email: user.email!, displayName: user.displayName || 'Admin' },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: any) {
          let message = 'An error occurred during login.';
          if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') message = 'No account found or invalid credentials.';
          if (err.code === 'auth/wrong-password') message = 'Incorrect password.';
          set({ error: message, isLoading: false, isAuthenticated: false });
          throw new Error(message);
        }
      },

      signup: async (email, pass, name) => {
        set({ isLoading: true, error: null });
        try {
          const { user } = await createUserWithEmailAndPassword(auth, email, pass);
          set({
            user: { uid: user.uid, email: user.email!, displayName: name || 'User' },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: any) {
          let message = 'An error occurred during signup.';
          if (err.code === 'auth/email-already-in-use') message = 'Email already in use.';
          if (err.code === 'auth/weak-password') message = 'Password is too weak.';
          set({ error: message, isLoading: false, isAuthenticated: false });
          throw new Error(message);
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          const { user } = await signInWithPopup(auth, googleProvider);
          set({
            user: { uid: user.uid, email: user.email!, displayName: user.displayName || 'User' },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err: any) {
          set({ error: 'Google login failed.', isLoading: false });
          throw new Error('Google login failed.');
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      initAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
          if (firebaseUser) {
            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email!,
                displayName: firebaseUser.displayName || 'Admin',
              },
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        });
        return unsubscribe;
      },
    }),
    {
      name: 'meddash-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// Performance: Selectors
export const useUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useAuthLoading = () => useAuthStore((s) => s.isLoading);
export const useAuthError = () => useAuthStore((s) => s.error);
