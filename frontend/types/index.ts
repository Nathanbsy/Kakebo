export interface User {
  id: string;
  email: string;
  nome?: string;
  dataCriacao: string;
}

export interface Categoria {
  id: string;
  userId: string;
  nome: string;
  icon?: string;
  color?: string;
}

export interface Movimentacao {
  id: string;
  userId: string;
  categoriaId: string;
  quantia: number;
  descricao?: string;
  data: string;
  tipo: "receita" | "despesa";
  metodo: "dinheiro" | "cartão" | "transferência bancária" | "pix";
  dataCriacao: string;
}
export interface Relatorio {
  id: string;
  userId: string;
  titulo?: string;
  tipoRelatorio: string;
  frequencia: "diária" | "semanal" | "mensal";
  ativo: boolean;
  dataCriacao: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiError {
  detail: string;
}
