const router = require('express').Router();
const IgrejaController = require('../controllers/IgrejaController');

/**
 * @swagger
 * /v1/igrejas/cadastrar:
 *   post:
 *     summary: Registra uma nova igreja
 *     description: Cria uma igreja no sistema.
 *     tags: [Igrejas]
 *     security:
 *       - bearerAuth: []  # Indica que a rota exige o token de autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               fantasia:
 *                 type: string
 *               endereco:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               cep:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               email:
 *                 type: string
 *               matriz:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *       422:
 *         description: Erro de validação.
 */
router.post('/cadastrar', IgrejaController.cardigreja);

router.get('/consultar', IgrejaController.getAllIgrejas);

module.exports = router;
