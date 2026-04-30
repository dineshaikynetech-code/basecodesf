// src/mocks/auth.ts

import type { ApiResponse, User } from "@/features/auth/types";

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

export const mockAuthApi = {
  async login(email: string, _password: string): Promise<ApiResponse<User>> {
    await randomDelay();
    if (email === 'error@test.com') throw new Error('Invalid credentials');
    return { data: { ...mockUser, email }, success: true };
  },

  async signup(email: string, _password: string, name: string): Promise<ApiResponse<User>> {
    await randomDelay();
    return { data: { ...mockUser, id: crypto.randomUUID(), email, name }, success: true };
  },

  async logout(): Promise<void> {
    await randomDelay();
  },
};