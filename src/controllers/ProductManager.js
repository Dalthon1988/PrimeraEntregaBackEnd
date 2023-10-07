import {promises as fs } from 'fs';
// nanoid Un generador de ID de cadena único, pequeño, seguro y compatible con URL para JavaScript.
// informacion sacada desde https://www.npmjs.com/package/nanoid

import { nanoid } from "nanoid";

class ProductManager{
    constructor() {
        this.path = "./src/models/products.json"        
    }

    readProducts = async () => {
        let products = await  fs.readFile(this.path,"utf-8");
        return JSON.parse(products);
    }
    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    addProducts = async (product) => {
        let productsOLD = await this.readProducts();
        product.id = nanoid();
        let productALL = [...productsOLD, product]; 
        await this.writeProducts(productALL)       
        return "New Product Add";
    };

    getProducts = async() => {
        return await this.readProducts()
    
};
    getProductsById = async(id) => {
    let products =  await this.readProducts();
    let productById = products.find(prod => prod.id === id)
    if(!productById) return "Id Not found"
    return productById
    };

    deleteProducts = async (id)=>{
        let products =  await this.readProducts();
        let existProduct = products.some(prod => prod.id === id)
        if (existProduct){
             let filterProducts = products.filter(prod => prod.id != id)
             await this.writeProducts(filterProducts)
             return "Product has been removed"
             }
             return "Product you want to eliminate does not exist"

    }

    
}

const product = new ProductManager
export default ProductManager 


