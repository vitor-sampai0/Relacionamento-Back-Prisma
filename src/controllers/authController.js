import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        res.status(500).json({ error: "Erro ao criar um novo usuário" });
    }
  }
  async login (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Os campos email e senha são obrigatórios" });
          }

           // Verifica se o usuário já existe
        const userExist = await userModel.findByEmail(email);
        if (!userExist) {
          return res.status(401).json({ error: "Credenciais inválidas" });
        }
        // Verificar senha
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Credenciais inválidas" });
        }

        //gerar token
        const token = jwt.sign({
          id: userExist.id,
          name: userExist.name,
          email: userExist.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      return res.json({
        mssage: "Login realizado com sucesso",
        token,
        userExist,
      });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}
export default new AuthController();
