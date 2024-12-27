import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";

class AuthService {
    async login(loginRequest: LoginRequest){
        return (await axios.post<string>(`http://localhost:8080/guest/login`, loginRequest)).data
    }
}

const authService = new AuthService();
export default authService;