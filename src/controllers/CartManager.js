import {promises as fs } from 'fs';
import { nanoid } from "nanoid";

import ProductManager from "../controllers/ProductManager.js";

const productALL = new ProductManager

class CartManager {
    constructor() {
        this.path = './src/models/carts.json';      
    }


    exist = async( id ) =>{
        let carts = await this.readCarts();
        return carts.find(cart => cart.id  === id)
    }

    readCarts = async () => {
        let carts = await  fs.readFile(this.path,"utf-8");
        return JSON.parse(carts);
    };
    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    };


    addCarts = async()=>{
        let cartsOld = await this.readCarts();
        let id = nanoid()
        let cartsConcat =[{id:id, products:[]},...cartsOld]
        await this.writeCarts(cartsConcat)
        return "New Cart Add"
    };

    getCartsById = async(id) => {
    
        let cartById = await this.exist(id)
        if(!cartById) return "Id Cart Not found"
        return cartById
        };
    

    addProductInCart = async(cartId , productId) =>{
        let cartById = await this.exist(cartId)
        if(!cartById) return "Id Cart Not found"
        let productById = await productALL.exist(productId)
        if(!cartById) return "Id Product Not found"
        let cartsALL = await this.readCarts()
        let cartFilter = cartsALL.filter((cart) => cart.id != cartId)

        if(cartById.products.some(prod => prod.id === productId)){
            let productInCart = cartById.products.find((prod) => prod.id === productId);

            productInCart.quantity ++;
            console.log(productInCart.cantidad)
            let cartsConcat = [cartById, ...cartFilter];
            await this.writeCarts(cartsConcat);
            return "Item Add to Cart +1"        
        }               
        let cartsConcat = [{id:cartId, products:[{id: productById.id, quantity:1}]},...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Item Add to Cart"        
        }
    }




       
        //     let cartsConcat = [productInCart, ...cartFilter]
        //     await this.writeCarts(cartsConcat)
        //     return "Item Add to Cart +1 "    

export default CartManager 
