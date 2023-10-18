import express from "express";
import handlebars from "express-handlebars";
import ProductRouter from "./router/products.routes.js";
import CartRouter from "./router/carts.routes.js";
import indexRouter from './router/index.routes.js'
import realTimeProdRouter from "./router/realTimeprod.routes.js"
import { __dirname } from "./utils.js";
import path from 'path';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter);
app.use('/realtimeproducts', realTimeProdRouter);
app.use("/api/products",ProductRouter)
app.use("/api/cart", CartRouter)




export default app