module.exports = {
    getProducts: async (req, res) => {
      const db = req.app.get("db");
      const products = await db.products.get_products();
      res.status(200).send(products);
    },
    addProduct: async (req, res) => {
      const { name, price, description } = req.body;
      const db = req.app.get("db");
      const products = await db.products.add_product({
        name,
        price,
        description,
      });
      res.status(200).send(products);
    },
    editProduct: async (req, res) => {
      const { name, price, description } = req.body;
      const { id } = req.params;
      const db = req.app.get("db");
  
      const products = await db.products.edit_product({
        name,
        price,
        description,
        product_id: id,
      });
  
      res.status(200).send(products);
    },
    deleteProduct: async (req, res) => {
      const { id } = req.params;
      const db = req.app.get("db");
  
      const products = await db.products.delete_product([id]);
  
      res.status(200).send(products);
    },
  };
  