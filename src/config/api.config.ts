export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000, // 30 segundos
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  
  // Users
  USERS: '/users',
  USER_PROFILE: (id: string) => `/users/${id}`,
  
  // Assessments
  ASSESSMENTS: '/assessments',
  USER_ASSESSMENTS: (userId: string) => `/users/${userId}/assessments`,
  
  // Instructors
  INSTRUCTORS: '/instructors',
  AVAILABLE_INSTRUCTORS: '/instructors/available',
  
  // Routines
  ROUTINES: '/routines',
  ACTIVE_ROUTINE: (userId: string) => `/users/${userId}/routines/active`,
  
  // Nutrition
  NUTRITION_PLANS: '/nutrition-plans',
  USER_NUTRITION: (userId: string) => `/users/${userId}/nutrition-plan`,
  
  // Workouts
  WORKOUTS: '/workouts',
  COMPLETE_WORKOUT: (workoutId: string) => `/workouts/${workoutId}/complete`,
  
  // Messages
  MESSAGES: '/messages',
  USER_MESSAGES: (userId: string) => `/users/${userId}/messages`,
  UNREAD_COUNT: (userId: string) => `/users/${userId}/messages/unread-count`,
};