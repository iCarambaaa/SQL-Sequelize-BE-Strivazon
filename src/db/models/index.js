// ********************** here sql relationships  ***********************
import Reviews from "./reviews.js";
import Products from "./products.js";


// one-to-many relationship need both directions

Products.hasMany(Reviews, {onDelete: "CASCADE"})   // creates ProductId in Reviews. Get Products including Reviewss
Reviews.belongsTo(Reviews, {onDelete: "CASCADE"})   // creates ProductId in Reviews. Get Reviewss including Products

//Way 2

// Product.hasMany(Reviews, { foreignKey: "Product_id" }); // creates ProductId in Reviews
// Reviews.belongsTo(Product, { foreignKey: "Product_id" }); // creates ProductIs in Reviews

export default {Products, Reviews}
