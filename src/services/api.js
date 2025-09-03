import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const userCache = new Map();

export const postsApi = {
  getAllPosts: async () => {
    try {
      const response = await api.get("/posts");
      console.log("Posts récupérés:", response.data.length);
      return response.data;
    } catch (error) {
      console.log("Erreur lors du fetch:", error);
      throw error;
    }
  },

  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      console.log("le post à bien été récupéré");
      return response.data;
    } catch (error) {
      console.log("Erreur lors du fetch:", error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const response = await api.post("/posts", postData);
      console.log("post bien posté");
      return response.data;
    } catch (error) {
      console.log("Erreur lors de la création du post", error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      if (userCache.has(userId)) {
        return userCache.get(userId);
      }

      const response = await api.get(`/users/${userId}`);
      const userData = response.data;

      userCache.set(userId, userData);

      return userData;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur ${userId}:`,
        error
      );
      throw error;
    }
  },
};

export default api;
