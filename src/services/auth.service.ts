import { httpService } from './http.service';
import { API_ENDPOINTS } from '../config/api.config';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return httpService.post<AuthResponse>(API_ENDPOINTS.LOGIN, credentials);
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return httpService.post<AuthResponse>(API_ENDPOINTS.REGISTER, data);
  }

  async logout(): Promise<void> {
    return httpService.post<void>(API_ENDPOINTS.LOGOUT);
  }

  async resetPassword(email: string): Promise<{ message: string }> {
    return httpService.post<{ message: string }>(API_ENDPOINTS.RESET_PASSWORD, { email });
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<{ message: string }> {
    return httpService.post<{ message: string }>(API_ENDPOINTS.CHANGE_PASSWORD, {
      old_password: oldPassword,
      new_password: newPassword,
    });
  }

  async getCurrentUser(): Promise<User> {
    return httpService.get<User>('/auth/me');
  }
}

export const authService = new AuthService();
