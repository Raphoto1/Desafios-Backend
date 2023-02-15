const fs = require("fs");

class ProductManager {
  #path = "";
  constructor(path) {
    this.#path = path;
  }

  async getProducts(){
    try {
        const products = await fs.promises.readFile(this.#path, "utf-8");
        return JSON.parse(products);
    } catch (error) {
        return [];
    }
  }

  async addProduct(title, description, price, thumbail, code, stock){

  }
}
