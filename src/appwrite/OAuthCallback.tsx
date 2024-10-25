import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";

// Inicializa el cliente y la cuenta una sola vez
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("670e1fc7001519b1d314");
const account = new Account(client);

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Intenta obtener el usuario autenticado
        const user = await account.get();
        
        // Almacenar solo el ID del usuario o un token seguro
        localStorage.setItem("userId", user.$id);
        navigate("/home-client");
      } catch (error) {
        // Si hay un error, maneja el caso de usuarios no autenticados
        console.error("Error al obtener información del usuario:", error);
        if (error) {
          setError("No estás autenticado. Por favor, inicia sesión.");
        } else {
          setError("Ocurrió un error al autenticar. Por favor, intenta nuevamente.");
        }
        navigate("/");
      }
    };

    // Llama a la función para obtener el usuario
    fetchUser();
  }, [navigate]);

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && <p>Autenticando, por favor espera...</p>}
    </div>
  );
};

export default OAuthCallback;
