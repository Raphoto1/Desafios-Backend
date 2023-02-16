import express from "express";
import ProductManager from "../app/productManager.js";

const item = new ProductManager();
const app = express();

//params

//lista de max 3 items
app.get("/products", async (req,res) => {
    const prods = await item.getProducts();
    //respuesta
    await res.send(prods);
});

//segun el id
app.get("/products/:id", async (req,res) => {
    const prodId = await Number(req.params.id);
    const result = await item.getProductById(prodId);
    await res.send(result);
})

//escucha
app.listen(8080, () => {
console.log("listening 8080");
})