export interface JWTPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface TransactionData {
  categoryId: string;
  amount: number;
  description?: string;
  date: string;
  type: "income" | "expense";
  method?: "cash" | "card" | "bank_transfer";
}

export interface CategoryData {
  name: string;
  color?: string;
  icon?: string;
}

export interface ReportData {
  title: string;
  type: "monthly" | "annual" | "category";
  data: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
