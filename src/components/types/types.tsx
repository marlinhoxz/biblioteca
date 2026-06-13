export interface DadosApi {
  id: number;
  name: string;
  image: string;
  installed: boolean;
  trofeusObtidos?: number;
  trofeusTotais?: number;
}

export type GameFilter =
  | "All games"
  | "Favorites"
  | "Play Next"
  | "Go to's"
  | "Multiplayer";
