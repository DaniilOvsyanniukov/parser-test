export interface User {
  id: string
  name: string;
  role: 'user' | 'admin';
  token: string;
}

export interface Article {
  _id?: string;
  title: string;
  content: string;
  source: string;
  publishedAt?: Date;
}

export interface ArticlesResponse {
  articles: Article[];
  totalPages: number;
  currentPage: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export interface ArticleFormValues {
  title: string;
  content: string;
  source: string;
}
