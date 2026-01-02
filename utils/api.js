// utils/api.js

export const fetchConfigs = async () => {
    try {
      const response = await fetch("/api/configs", { method: "GET" });
      if (!response.ok) throw new Error("Erro ao buscar dados");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const saveConfig = async (newConfig) => {
    try {
      const response = await fetch("/api/configs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newConfig),
      });
      if (!response.ok) throw new Error("Erro ao salvar dados");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  