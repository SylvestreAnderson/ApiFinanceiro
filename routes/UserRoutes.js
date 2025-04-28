const router = require('express').Router();
const UserController = require('../controllers/UserController');
const autenticarToken = require('../auth');


router.post('/auth', UserController.auth);

/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria um usuário no sistema.
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               perfil:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmpassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *       422:
 *         description: Erro de validação.
 */
router.post('/register', autenticarToken, UserController.register);

/**
 * @swagger
 * /v1/users/consultar:
 *   get:
 *     summary: Retorna todos os usuários cadastrados
 *     description: Lista todos os usuários do sistema.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   perfil:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Erro no servidor.
 */
router.get('/consultar', autenticarToken, UserController.getAllUsers);

/**
 * @swagger
 * /v1/users/{id}/atualizar:
 *   put:
 *     summary: Atualiza um usuário
 *     description: Atualiza o nome e a senha de um usuário existente.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: string
 *               password:
 *                 type: string
 *                 example: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: guid
 *                 name:
 *                   type: string
 *                   example: string
 *                 password:
 *                   type: string
 *                   example: hash_da_senha
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Usuário não encontrado
 *       422:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: O nome é obrigatório!
 */
router.put(':id/atualizar', autenticarToken, UserController.putUser);

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     description: Remove um usuário do sistema com autenticação.
 *     tags: 
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário deletado com sucesso!
 *       422:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar o usuário
 */
router.delete('/:id', autenticarToken, UserController.deleteUser);

module.exports = router;
