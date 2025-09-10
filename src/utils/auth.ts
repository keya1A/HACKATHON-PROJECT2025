import Cookies from 'js-cookie';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin' | 'scientist' | 'analyst';
}

// Demo credentials
export const DEMO_CREDENTIALS = {
  user: { username: 'user', password: 'user123' },
  admin: { username: 'admin', password: 'admin123' },
  userEmail: { email: 'user123@gmail.com', password: 'demo123' },
  adminEmail: { email: 'admin@natpac.com', password: 'admin123' }
};

// Mock users database
const mockUsers: Record<string, AuthUser> = {
  'user': {
    id: '1',
    fullName: 'Keya Saha',
    email: 'user123@gmail.com',
    role: 'user'
  },
  'admin': {
    id: '2',
    fullName: 'Admin',
    email: 'admin@natpac.com',
    role: 'admin'
  },
  'user123@gmail.com': {
    id: '1',
    fullName: 'Keya saha',
    email: 'user123@gmail.com',
    role: 'user'
  },
  'admin@natpac.com': {
    id: '2',
    fullName: 'Admin',
    email: 'admin@natpac.com',
    role: 'admin'
  }
};

export const login = (identifier: string, password: string): AuthUser | null => {
  // Check demo credentials
  const validCredentials = Object.values(DEMO_CREDENTIALS).some(cred => 
    (('username' in cred && cred.username === identifier) || 
     ('email' in cred && cred.email === identifier)) && 
    cred.password === password
  );

  if (validCredentials) {
    const user = mockUsers[identifier];
    if (user) {
      // Store auth token in cookie
      Cookies.set('auth_token', JSON.stringify(user), { expires: 7 });
      return user;
    }
  }
  return null;
};

export const logout = () => {
  Cookies.remove('auth_token');
};

export const getCurrentUser = (): AuthUser | null => {
  const token = Cookies.get('auth_token');
  if (token) {
    try {
      return JSON.parse(token);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const hasRole = (role: string): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};