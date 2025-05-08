import express from 'express';

//importar todas as rotas

import authRouter from './auth.routes.js';
import animeRouter from './animeRoutes.js';
import personagensRouter from './personagemRoutes.js';
import collectionRouter from './collectionRoutes.js';
import cardRouter from './cardRoutes.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//Rotas Publicas
router.use('/auth', authRouter);
router.use('/collection', collectionRouter);
router.use('/cards', cardRouter);

//Rotas Protegidas
router.use(authMiddleware);

router.use('/anime', animeRouter);
router.use('/personagens', personagensRouter);


export default router;