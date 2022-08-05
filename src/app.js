import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './until.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import { Server } from 'socket.io';


const app = express();

const server = app.listen(8080, () => console.log('Listening on PORT 8080'));
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);
app.use('/', productsRouter);

let log = [];
let products = [];
io.on('connection', socket => {
    console.log("Socket connected");

    socket.on('product', data => {
      
        products.push(data);
        io.emit('printProd',products);
        console.log('ARRAY');
        console.log(products);
        
    })

    socket.broadcast.emit('newUser')
    socket.on('message', data => {
        log.push(data);
        io.emit('log', log);
    })

  
})

