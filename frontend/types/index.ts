/**
 * Type definitions for Kakeibo
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  icon?: string;
  color?: string;
  budget_limit?: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  description?: string;
  date: string;
  type: "income" | "expense";
  method: "cash" | "card" | "bank_transfer";
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  name?: string;
  report_type: string;
  frequency: "daily" | "weekly" | "monthly";
  enabled: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiError {
  detail: string;
}
