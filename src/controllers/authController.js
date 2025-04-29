import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

class AuthController {
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }
  // registrar um novo usuário
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Os campos nome, email e senha são obrigatórios" });
      }
      // Verifica se o usuário já existe
        const userExist = await userModel.findByEmail(email);
        if (userExist) {
          return res.status(400).json({ error: "Este Email já está em uso" });
        }
        //hash a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria objeto do usuário
        const data = {
          name,
          email,
          password: hashedPassword
        };
        // Cria usuário
        const user = await userModel.create(data);

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user,                       
        });
    } catch (error) {
        console.error("Erro ao criar um novo usuário:", error);
        res.statur(500).json({ error: "Erro ao criar um novo usuário" });
    }
  }

}
export default new AuthController();
