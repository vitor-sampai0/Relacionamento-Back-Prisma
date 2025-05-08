import CardModel from "../models/cardModel.js";

class CardController {
  // GET /cards
  async getAllCards(req, res) {
    const raridade = req.query.raridade;
    const ataque = req.query.ataque;
    const pagina = req.query.pagina || 1;
    const limite = req.query.limite || 10;

    const name = req.query.name;

    try {
      const cards = await CardModel.findAll(raridade, ataque, pagina, limite, name);
      res.json(cards);
    } catch (error) {
      console.error("Erro ao buscar os cards:", error);
      res.status(500).json({ error: "Erro ao buscar os cards" });
    }
  }

  // GET /cards/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const card = await CardModel.findById(id);

      if (!card) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      res.json(card);
    } catch (error) {
      console.error("Erro ao buscar card:", error);
      res.status(500).json({ error: "Erro ao buscar card" });
    }
  }

  // POST /cards
  async createCard(req, res) {
    try {
      // Validação básica
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      } = req.body;

      // Verifica se todos os campos do personagem foram fornecidos
      if (
        !name||
        !rarity||
        !attackPoints||
        !defensePoints  
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo personagem
      const newCard = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar Card" });
      }

      res.status(201).json(newCard);
    } catch (error) {
      console.error("Erro ao criar Card:", error);
      res.status(500).json({ error: "Erro ao criar Card" });
    }
  }

  // PUT /cards/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
      } = req.body;

      // Atualizar o personagem
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar card:", error);
      res.status(500).json({ error: "Erro ao atualizar card" });
    }
  }

  // DELETE /cards/ :id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover o personagem
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Card nao encontrado" });
      }

      res.status(201).json("Card deletado com sucesso"); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover card:", error);
      res.status(500).json({ error: "Erro ao remover card" });
    }
  }
}

export default new CardController();
