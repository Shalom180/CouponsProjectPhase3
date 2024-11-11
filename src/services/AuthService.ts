import axios from "axios";

class AuthService {
    async login(email: string, password: string){
        return (await axios.post<string>(`http://localhost:8080/guest/login${email}/${password}`))
    }
}