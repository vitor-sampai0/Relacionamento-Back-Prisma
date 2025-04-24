import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Coleções
collectionRouter.get("/", CollectionController.getAllCollections);

//GET /collection/:id - Obter um Collection pelo ID
collectionRouter.get("/:id", CollectionController.getCollectionById);

//POST /collection - Criar um novo Collection
collectionRouter.post("/", CollectionController.createCollection);

//PUT /personagens/:id - Atualizar um Collection
collectionRouter.put("/:id", CollectionController.updateCollection);

//DELETE /personagens/:id - Remover um Collection
collectionRouter.delete("/:id", CollectionController.deleteCollection);

export default collectionRouter;
