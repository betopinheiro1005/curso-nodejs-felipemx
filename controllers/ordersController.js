const Order = require('../models/Order');

// cadastrar pedido
exports.create = async (req, res, next) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json({
            message: "Erro ao processar a requisição!"
        });
    }
};

// listar pedidos
exports.index = async (req, res, next) => {
    try {
        const orders = await Order.find({})
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Product'
        });
        res.json(orders); 
    } catch (error) {
        res.status(400).json({
            message: "Erro ao processar a requisição!"
        });
    }
};

// exibir detalhes de um pedido por id
exports.show = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Product'
        });

        if(!order){
            res.status(404).json({
                message: "O pedido não existe!"
            });
            next();
        }
        res.json(order); 
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
};

// atualizar dados de um pedido
exports.update = async (req, res, next) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }            
        )
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Product'
        });
        res.json(order);
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
}    

// Excluir um pedido por id
exports.delete = async (req, res, next) => {
    try {
        await Order.findOneAndDelete({
            _id: req.params.id
        });

        res.json({
            message: 'Pedido excluido com sucesso!'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
};

// exibir pedidos por cliente
exports.byCustomer = async (req, res, next) => {
    try {
        const orders = await Order.find({ customer: req.params.id })
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Product'
        });
        res.json(orders);
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
};
