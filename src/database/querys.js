export const querys = {
    getAllProducts: "SELECT * FROM Products",
    getProductById: "SELECT * FROM Products where Id = @Id",
    addNewProduct: "INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)",
    deleteProduct: "DELETE FROM Products where Id = @Id",
    getTotalProducts: "SELECT COUNT(*) as Total FROM Products",
    updateProduct: "UPDATE Products SET name = @name, description = @description, quantity = @quantity Where Id = @Id",
};