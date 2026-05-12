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
    nome: string;
  };
}

export interface MovimentacaoData {
  categoriaId: string;
  quantia: number;
  descricao?: string;
  data: string;
  tipo: "receita" | "despesa";
  metodo?: "dinheiro" | "cartão" | "transferência_bancária";
}

export interface CategoriaData {
  nome: string;
  color?: string;
  icon?: string;
}

export interface RelatorioData {
  titulo: string;
  tipo: "mensal" | "anual" | "categoria" | "semanal";
  dados: Record<string, any>;
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
