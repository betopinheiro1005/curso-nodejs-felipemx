const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Rotas

const customersRoutes = require('./routes/customersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

const app = express();

app.get('/', (req, res) => {
    res.send('Página inicial');
});

// Conexão com o mongoDB

// Configurando mongoose
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/store-api',
// {
//     useNewUrlParser: true
// })
// .then(db => console.log('Base de dados conectada!'))
// .catch(error => console.log(error));


// mongoose.connect("mongodb+srv://betopinheiro:abc123456@cluster1.8eduz.mongodb.net/ecommerce?retryWrites=true&w=majority",
// {
//     useNewUrlParser: true
// })
// .then(db => console.log('Base de dados conectada!'))
// .catch(error => console.log(error));


require('dotenv').config();

// Conexão a base de dados
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster1.8eduz.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Base de dados conectada!');
}).catch((error) => {
    console.log(error);
});


// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar cors
app.use(cors());

app.use('/', customersRoutes());
app.use('/', productsRoutes());
app.use('/', ordersRoutes());
app.use(express.static('uploads'));

// server port

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at port ` + port);
  });
  

