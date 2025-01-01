const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const Customer = require("../models/Customer");
const { Sequelize } = require("sequelize");  // Import Sequelize here

class StatisticsController {
  // Get total stock value: sum(product_cost * product_stock_level)
 // Get total stock value: sum(product_cost * product_stock_level)
 static async getTotalStock(req, res) {
    try {
      // Retrieve all products with cost and stock level
      const products = await Product.findAll({
        attributes: ['product_cost', 'product_stock_level']
      });
  
      // Calculate total stock value using JavaScript
      const totalStock = products.reduce((sum, product) => {
        const cost = product.product_cost || 0; // If product_cost is null, use 0
        const quantity = product.product_stock_level || 0; // If product_stock_level is null, use 0
        return sum + (cost * quantity);
      }, 0);
  
      // Send the result back to the client
      res.json({ totalStock });
    } catch (error) {
      console.log("************");
      console.error(error);
      res.status(500).json({ error: "Failed to calculate total stock value" });
    }
  }
  
    

  // Get total supplier debt: sum(supplier_debt)
  static async getTotalSupplierDebt(req, res) {
    try {
      const totalSupplierDebt = await Supplier.sum("supplier_debt");
      res.json({ totalSupplierDebt });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to calculate total supplier debt" });
    }
  }

  // Get total customer debt: sum(customer_debt)
  static async getTotalCustomerDebt(req, res) {
    try {
      const totalCustomerDebt = await Customer.sum("customer_debt");
      res.json({ totalCustomerDebt });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to calculate total customer debt" });
    }
  }
}

module.exports = StatisticsController;
