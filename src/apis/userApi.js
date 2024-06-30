import axios from "../config/axios";

const userApi = {};

userApi.register = (body) => axios.post("/auth/register", body);

userApi.login = (body) => axios.post("/auth/login", body);

userApi.getAuth = () => axios.get("/auth/me");

userApi.updateProfile = (body) => axios.put("/auth/update", body);

export default userApi;
