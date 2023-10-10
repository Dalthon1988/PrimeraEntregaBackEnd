import {promises as fs } from 'fs';
import { nanoid } from "nanoid";



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
    }

    getCartsById = async(id) => {
    
        let cartById = await this.exist(id)
        if(!cartById) return "Id Cart Not found"
        return cartById
        };
    
}



export default CartManager