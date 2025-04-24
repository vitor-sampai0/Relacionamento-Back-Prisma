import express from "express";
import CardController from "../controllers/cardController.js";


const cardRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Cards
cardRouter.get("/", CardController.getAllCards);

//GET /Card/:id - Obter um Card pelo ID
cardRouter.get("/:id", CardController.getCardById);

//POST /Card - Criar um novo Card
cardRouter.post("/", CardController.createCard);

//PUT /personagens/:id - Atualizar um Card
cardRouter.put("/:id", CardController.updateCard);

//DELETE /personagens/:id - Remover um Card
cardRouter.delete("/:id", CardController.deleteCard);

export default cardRouter;
