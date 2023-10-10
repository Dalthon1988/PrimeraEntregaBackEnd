import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router()
const carts = new CartManager

CartRouter.post("/", async (req,res)=> {
    res.send(await carts.addCarts())
}) 

CartRouter.get('/', async(req, res)=>{
    res.send(await carts.readCarts());
})




CartRouter.get('/', async(req, res)=>{
    res.send(await carts.readCarts());
})


CartRouter.get("/:id", async (req, res) => {
    res.send(await carts.getCartsById(req.params.id));
  });


export default CartRouter
