// Usuario
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'instructor' | 'admin';
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: 'client' | 'instructor';
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

// Evaluación Física
export interface AssessmentResponse {
  id: string;
  user_id: string;
  fitness_score: number;
  fitness_category: string;
  body_age: number;
  real_age: number;
  age_difference: number;
  recommendations: string[];
  created_at: string;
}

// Instructor
export interface Instructor {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  bio?: string;
  avatar_url?: string;
  rating?: number;
  available_slots: number;
}

// Rutina de Entrenamiento
export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest_seconds: number;
  description?: string;
}

export interface Routine {
  id: string;
  user_id: string;
  goal_description: string;
  fitness_level: string;
  exercises: Exercise[];
  created_at: string;
}

// Plan Nutricional
export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description?: string;
}

export interface NutritionPlan {
  id: string;
  user_id: string;
  daily_calories: number;
  meals: Meal[];
  created_at: string;
}

// Mensaje
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

// API Response genérico
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Paginación
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}