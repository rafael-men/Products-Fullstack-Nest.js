import { useEffect, useState } from "react";
import api from "../services/api";

export function useBackendMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/ping")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Erro ao conectar ao backend:", error));
  }, []);

  return message;
}
