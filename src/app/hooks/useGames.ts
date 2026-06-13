import { DadosApi } from "@/components/types/types";
import { useEffect, useState } from "react";

export default function useGames() {
  const [dados, setDados] = useState<DadosApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api")
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then(setDados)
      .catch((err) => setError(err.menssage))
      .finally(() => setLoading(false));
  }, []);

  return { dados, loading, error };
}
