import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas os Cards
  async findAll(raridade, ataque, pagina, limite, name) {

    if (Number(pagina) < 1) {
      pagina = 1;
    }

    if (Number(limite) < 1 || Number(limite) > 100) {
      limite = 10;
    }
    
    const skip = (Number(pagina) - 1) * Number(limite);

    const where = {}

    if(raridade) {
      where.rarity = raridade
    }
    if(ataque) {
      where.attackPoints = {
        gte: Number(ataque),
      }
    }
    if  (name) {
      where.name = {
        contains: name,
      }
    }

    const cards = await prisma.card.findMany({
      // where: {
      //   rarity: "Ultra Rare"
      // }
      // where: {
      //   attackPoints: {
      //     lte: 8000,
      //   },
      // },
      // where: {
      //   attackPoints: {
      //     gte: 8000,
      //   },
      // },

      // where: {
      //   attackPoints: {
      //     gte: Number(ataque),
      //   },
      //   rarity: raridade,
      // },
      skip,
      take: Number(limite),
      // orderBy
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: true,
      }
    });

    const totalExebidos = cards.length;
    const totalGeral = await prisma.card.count({
      where,
    });

    // console.log(cards);

    return {cards, totalExebidos, totalGeral};
  }

  // Obter um card pelo ID
  async findById(id) {
    const card = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        collection: true,
      }
    });

    return card;
  }

  // Criar um novo card
  async create(
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const newCard = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      },
    });

    return newCard;
  }

  // Atualizar um card
  async update(
    id,
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
  ) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    // Atualize o personagem existente com os novos dados
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (rarity !== undefined) {
      data.rarity = rarity;
    }
    if (attackPoints !== undefined) {
      data.attackPoints = attackPoints;
    }
    if (defensePoints !== undefined) {
      data.defensePoints = defensePoints;
    }
    if (imageUrl !== undefined) {
      data.imageUrl = imageUrl;
    }
    const cardUpdated = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return cardUpdated;
  }

  // Remover um card
  async delete(id) {
    const card = await this.findById(id);

    if (!card) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();
