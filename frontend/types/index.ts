export interface User {
  id: string;
  email: string;
  nome?: string;
  rendaMensal: number;
  metaEconomiaMensal: number;
  dataCriacao: Date;
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
  categoria: Categoria;
  quantia: number;
  descricao?: string;
  data: Date;
  tipo: "Receita" | "Despesa";
  metodo: "dinheiro" | "cartão" | "transferência bancária" | "pix";
  dataCriacao: Date;
}
export interface Relatorio {
  id: string;
  userId: string;
  titulo?: string;
  tipoRelatorio: string;
  frequencia: "diária" | "semanal" | "mensal";
  ativo: boolean;
  dataCriacao: Date;
}

export interface HistoricoReflexao {
  id: string;
  userId: string;
  comentario: string;
  dataCriacao: Date;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface ApiError {
  detail: string;
}
