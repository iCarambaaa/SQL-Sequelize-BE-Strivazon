import sequelize from "../index.js"  // need sequelize instance to create model
import s from "sequelize"

const {DataTypes} = s // destructure data types from sequelize package



const Products = sequelize.define("Products", { // define model and store in Products variable // first parameter is table name second atributes
    id:{
        primaryKey:true,
        autoIncrement:true,
        type: DataTypes.INTEGER,
        allowNull:false
    },
    name: { 
        type: DataTypes.STRING,     //STRING is VARCHAR(255) TEXT is VARCHAR(infinite) 
        allowNull:false             // syntax for requiered
    },
    category: {
        type: DataTypes.STRING,
        allowNull:false
    },
    image: {
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull:false,   
    },

})

export default Products