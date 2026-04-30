export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  plan: string;
  locale: string;
  createdAt: string;
  isOnboarded?: boolean; 
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}