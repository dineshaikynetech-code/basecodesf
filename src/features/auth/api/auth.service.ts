// src/features/auth/api/authService.ts
import { api } from '@/core/api/client';
import type { ApiResponse, User } from '../types';


const USE_MOCK = true;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () => delay(300 + Math.random() * 500);

const mockUser: User = {
  id: '1',
  email: 'alexander@storefries.com',
  name: 'Alexander',
  role: 'admin',
  plan: 'professional',
  locale: 'en',
  createdAt: '2024-01-15T10:00:00Z',
};

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    if (USE_MOCK) {
      await randomDelay();
      if (email === 'error@test.com') throw new Error('Invalid credentials');
      return { data: { ...mockUser, email }, success: true };
    }

    const { data } = await api.post<ApiResponse<User>>('/auth/login', { email, password });
    return data;
  },

  async signup(email: string, password: string, name: string): Promise<ApiResponse<User>> {
    if (USE_MOCK) {
      await randomDelay();
      return { data: { ...mockUser, id: crypto.randomUUID(), email, name }, success: true };
    }

    const { data } = await api.post<ApiResponse<User>>('/auth/signup', { email, password, name });
    return data;
  },

  async logout(): Promise<void> {
    if (USE_MOCK) {
      await randomDelay();
      return;
    }
    await api.post('/auth/logout');
  },
};