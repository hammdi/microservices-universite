export const getKeycloakToken = async () => {
  const url = "/keycloak/realms/JobBoardKeycloack/protocol/openid-connect/token";
  const clientId = "gateway"; // Remplacez par votre client ID
  const clientSecret = "**********"; // Remplacez par votre client secret

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
       // "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Assurez-vous d'inclure le token d'accès si nécessaire
      },
      body: body.toString(),
      mode: 'cors', // Ajoutez cette ligne pour forcer le mode CORS
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Keycloak token");
    }

    const data = await response.json();
    return data.access_token; // Retourne le token d'accès
  } catch (error) {
    console.error("Erreur lors de la récupération du token Keycloak :", error);
    throw error;
  }
};