const Customer = require('../models/Customer');

// cadastrar cliente

exports.create = async (req, res) => {
    const customer = new Customer(req.body);

    try {
        await customer.save();
        res.status(201).json({
            message: "Cliente cadastrado com sucesso!"
        });
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({
                message: `Já existe um cliente com o email: ${req.body.email}`
            });
        } else {
            res.status(400).json({
                message: "Erro ao processar a requisição!"
            });
        }    
    }
}

// listar clientes

exports.index = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.json(customers); 
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};


// exibir detalhes de um cliente por id

exports.show = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer){
            res.status(404).json({
                message: "O cliente não existe!"
            });    
        }
        res.json(customer);
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
};

// atualizar dados do cliente

exports.update = async (req, res, next) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        );

        res.json({
            message: 'Cliente atualizado com sucesso!'
        });
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({
                message: `Já existe um cliente com o email: ${req.body.email}`
            });
        } else {
            res.status(400).json({
                message: "Erro ao processar a requisição!"
            });
        }    
    }
};

// Excluir um cliente por id

exports.delete = async (req, res, next) => {
    try {
        await Customer.findOneAndDelete({
            _id: req.params.id
        });

        res.json({
            message: 'Cliente excluido com sucesso!'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
};
