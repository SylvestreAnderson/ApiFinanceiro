const User = require('../models/User')
const router = require('express').Router();
const UserController = require('../controllers/UserController');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = class UserController {

    static async auth(req, res) {
        const authHeader = req.headers['authorization'];
    
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return res.status(401).json({ message: 'Autenticação básica necessária' });
        }
    
        // Decodificar as credenciais de base64
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');
    
        if (!email) {
            return res.status(422).json({ message: 'O e-mail é obrigatório!' });
        }
    
        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória!' });
        }
    
        try {
            // Verificar se o usuário existe
            const user = await User.findOne({ where: { email: email } });
    
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }
    
            // Comparar senha
            const checkPassword = await bcrypt.compare(password, user.password);
    
            if (!checkPassword) {
                return res.status(422).json({ message: 'Senha inválida!' });
            }
    
            // Gerar token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN } // Exemplo: "1d" (um dia)
            );
    
            res.status(200).json({
                message: 'Autenticação realizada com sucesso!',
                token: token
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor.' });
        }
    }

    static async register(req, res) {
        const { name, email, phone, perfil, password, confirmpassword } = req.body

        // validation

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }

        if (!email) {sudso
            res.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }

        if (!perfil) {
            res.status(422).json({ message: 'O perfil é obrigatório!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatório!' })
            return
        }

        if (!confirmpassword) {
            res.status(422).json({ massage: 'A confirmação da senha é obrigatória!' })
            return
        }

        if (password !== confirmpassword) {
            res.status(422).json({ massage: 'A senha não deve ser diferente da confirmação da senha' })
            return
        }

        // chack if user exists

        const userExists = await User.findOne({ where: { email: email } })

        if (userExists) {
            res.status(422).json({
                message: 'Por favor, utilize outro e-mail!',
            })
            return
        }

        // cerate a password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //create a user
        const user = new User({
            name,
            phone,
            email,
            perfil,
            password: passwordHash
        })

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        try {
            const newUser = await user.save();
            res.status(201).json({
                message: 'Usuário criado!',
                user: newUser,
                token: token,
            });            

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async putUser(req, res) {
        const { id } = req.params;
        const { name, password } = req.body;

        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório!' });
        }

        try {
            const usuario = await User.findOne({ where: { id } });

            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }

            usuario.name = name; // Atualiza o nome

            if (password) {
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(password, salt);
                usuario.password = passwordHash;
            }

            await usuario.save();

            res.json({message: "Usuário atualizado com sucesso!", usuario})
        } catch (err) {
            console.error(err);
            res.status(500).json({mesagem: "Erro interno do servidor" });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
    
        try {
            const usuario = await User.findOne({ where: { id } });
    
            if (!usuario) {
                return res.status(422).json({ message: 'Usuário não encontrado' });
            }
    
            await usuario.destroy();
    
            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar o usuário' });
        }
    }
    
}