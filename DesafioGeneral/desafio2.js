const fs = require("fs");

class ProductManager {
  #path = "./prods.json";
  idAcum = 0;
  constructor() {}

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async chkProdsById(arr, id) {
    let check = await arr.some((prod) => prod.id === id);
    return check;
  }

  async chkProdsByCode(arr, code) {
    let check = await arr.some((prod) => prod.code === code);
    return check;
  }

  async addProduct(code, title, description, price, thumbnail, stock) {
    //revisar que si esten todos los datos
    if (code && title && description && price && thumbnail && stock) {
      console.log(await "info completa gracias");
    } else {
      console.log(
        await `falta informacion para este item, 
          recuerde agregar todos los campos:
          code || title || description || price || thumbnail || stock`
      );
    }
    //revisar que no existe codigo
    let products = await this.getProducts();
    const chk = await this.chkProdsByCode(products, code);
    if (!chk) {
      console.log(`no existe codigo: ${code} ===> SE CREARA NUEVO PRODUCTO`);
      const newProduct = {
        id: this.idAcum++,
        code,
        title,
        description,
        price,
        thumbnail,
        stock,
      };
      products = [...products, newProduct];
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
    } else {
      console.log(`Ya existe el codigo ${code} y NO SE CREARA PRODUCTO`);
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const chkProductId = await this.chkProdsById(products, id);
    if (chkProductId) {
      const idFound = await products.find((prod) => prod.id === id);
      console.log(`producto con el id ${id} encontrado, se mostrara a continuacion`);
      console.log(idFound);
      return idFound;
    } else {
      console.log(`el id ${id} solicitado no existe`);
    }
  }
}
async function test() {
  //productos vacio
  const item = new ProductManager();
  await item.getProducts();

  // //se agrega un producto
  await item.addProduct(1, "casa", "blabla", 1200, "#.jpg", 2);
  // //se agrega segundo producto
  await item.addProduct(2, "carro", "blabla2", 10200, "#.jpg", 3);
  await item.getProductById(0);
  //   await item.updateProdById(1, "title", "rafa");
  //   await item.deleteProdById(1);
}
test();
