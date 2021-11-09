import sequelize from "../index.js"  // need sequelize instance to create model
import s from "sequelize"

const {DataTypes} = s // destructure data types from sequelize package

const Reviews = sequelize.define('Review', {
    id:{
        primaryKey:true,
        autoIncrement:true,
        type: DataTypes.INTEGER,
        allowNull:false
    },
   text:{
           type: DataTypes.TEXT,
           allowNull:false,
           
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false
        },
        productId:{
            type: DataTypes.INTEGER,

        }

},{
timestamps: false
})
export default Reviews