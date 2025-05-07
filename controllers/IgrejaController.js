const Igreja = require('../models/Igreja')
const { cnpj } = require('cpf-cnpj-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let cnpjFormatado;
require('dotenv').config();

module.exports = class IgrejaController {
    static async cardigreja(req, res) {
        const { name, fantasia, endereco, bairro, cidade, estado, cep, cnpjempresa, responsavel, email, matriz } = req.body;       

        // Validações
        if (!name) {
            res.status(422).json({ message: 'O nome da Igreja é obrigatório' });
            return;
        }

        if (!fantasia) {
            res.status(422).json({ message: 'O nome Fantasia é obrigatório' });
            return;
        }

        if (!endereco) {
            res.status(422).json({ message: 'O Endereço é obrigatório' });
            return;
        }

        if (!bairro) {
            res.status(422).json({ message: 'O Bairro é obrigatório' });
            return;
        }

        if (!cidade) {
            res.status(422).json({ message: 'A Cidade é obrigatória' });
            return;
        }

        if (!estado) {
            res.status(422).json({ message: 'O Estado é obrigatório' });
            return;
        }

        if (!cep) {
            res.status(422).json({ message: 'O Cep é obrigatório' });
            return;
        }

        if (!cep || cep.replace(/\D/g, '').length !== 8) {
            res.status(422).json({ message: 'O CEP é inválido' });
            return;
        }

        if (!cnpjempresa) {
            res.status(422).json({ message: 'O CNPJ é obrigatório' });
            return;
        }

        if (!cnpj.isValid(cnpjempresa)) {
            res.status(422).json({ message: 'O CNPJ informado não é válido' });
            return;
        }

        if (!responsavel) {
            res.status(422).json({ message: 'O Responsável é obrigatório' });
            return;
        }

        if (!email) {
            res.status(422).json({ message: 'O E-mail do responsaldo é obrigatório' });
            return;
        }

        if (!matriz) {
            res.status(422).json({ message: 'A Matriz é obrigatório' });
            return;
        }

        //formatar
        cnpjFormatado = cnpj.format(cnpjempresa)
        function formatCep(cepformatado) {
            cepformatado = cepformatado.replace(/\D/g, '');
            return cepformatado.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        

        try {
            const igrejaExists = await Igreja.findOne({ where: { name } });

            if (igrejaExists) {
                res.status(422).json({
                    message: 'Por favor, utilize outro nome de igreja!',
                });
                return;
            }

            const newIgreja = await Igreja.create({
                name,
                fantasia,
                endereco,
                bairro,
                cidade,
                estado,
                cep: formatCep(cep),
                cnpjempresa: cnpjFormatado,
                responsavel,
                email,
                matriz
            });

            res.status(201).json({
                message: 'Igreja cadastrada com sucesso!',
                igreja: newIgreja
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }        
    }

    static async getAllIgrejas(req, res) {
        try {
            const igrejas = await Igreja.findAll();
            res.status(200).json(igrejas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
