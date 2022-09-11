import axios from "axios";

type UserTypeProps = {
  email: string;
  password: string;
};
axios.defaults.baseURL = "http://localhost:9009";

export const createSession = async ({ email, password }: UserTypeProps) => {
  let response = await axios.post("/auth", { email, password });

  return response.data;
};

// export const getUser = async (id) => {
//   let url = `/user/${id}`;

//   return api.get(url);
// };

// export const createUser = async (email, password) => {
//   let url = `/user`;

//   return api.post(url, { email, password });
// };

// export const getMensagens = async (userId) => {
//   let url = `/mensagens/${userId}`;

//   return api.get(url);
// };

// export const createMensagens = async (message, userId) => {
//   let url = `/mensagens/${userId}`;

//   return api.post(url, { message: message, userId: userId });
// };

// export const deleteMensagens = async (id) => {
//   const url = `/mensagens/${id}`;

//   return api.delete(url);
// };

// export const editMensagens = async (id, message) => {
//   let url = `/mensagens/${id}/`;

//   return api.put(url, { id: id, message: message });
// };
