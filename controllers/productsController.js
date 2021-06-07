const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const Product = require('../models/Product');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, function(error) {
        if(error){
            res.json({message: error});
        }
        return next();
    });
};

// cadastrar produto
exports.create = async (req, res) => {
    const product = new Product(req.body);

    try {
        if (req.file && req.file.filename) {
            product.image = req.file.filename;
        }
        await product.save();
        res.status(201).json({
            message: "Produto cadastrado com sucesso!"
        });
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({
                message: `Já existe um produto com o sku: ${req.body.sku}`
            });
        } else {
            res.status(400).json({
                message: "Erro ao processar a requisição!"
            });
        }    
    }
};

// listar produtos
exports.index = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products); 
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};


// exibir detalhes de um produto por id
exports.show = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).json({
                message: "O produto não existe!"
            });    
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
};

// atualizar dados de um produto
exports.update = async (req, res, next) => {
    try {
        let newProduct = req.body;

        if (req.file && req.file.filename) {
            newProduct.image = req.file.filename;
        } else {
            const product = await Product.findById(req.params.id);
            newProduct.image = product.image;
        }

        const productUpdated = await Product.findOneAndUpdate(
            {_id: req.params.id},
            newProduct,
            {new: true}
        );

        res.json({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({
                message: `Já existe um produto com o sku: ${req.body.sku}`
            });
        } else {
            res.status(400).json({
                message: "Erro ao processar a requisição!"
            });
        }
    }
};

// Excluir um produto por id
exports.delete = async (req, res, next) => {
    try {
        await Product.findOneAndDelete({
            _id: req.params.id
        });

        res.json({
            message: 'Produto excluido com sucesso!'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
};

exports.search = async (req, res, next) => {
    try {
        const products = await Product.find({
            name: new RegExp(req.params.query, 'i')
        });
        res.json(products);        
    } catch (error) {
        res.status(400).json({
            message: 'Erro ao processar a requisição!'
        });
    }
}
