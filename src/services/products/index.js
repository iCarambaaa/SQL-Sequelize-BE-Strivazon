import express from 'express';
import models from "../../db/models/index.js" // import the SQL models

const {Products, Reviews} = models;
const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const products = await Products.findAll({include: Reviews})
            res.status(200).send(products)
            console.log("here are the products", products)
        } catch(error) {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        
        try {
            const {...body} = await req.body 
            const data = await Products.create(body)
            console.log("here data:", data)
            res.status(201).send(data)
        } catch (error) {
            next(error)
        }
    })

    router
        .route("/:id")
        .get(async (req, res, next) => {
            try {
                const product = await Products.findByPk(req.params.id, {include: Reviews})
                res.send(product)
            } catch (error) {
                next(error)
                
            }
        })
        .put(async (req, res, next) => {
            try {
            
                delete req.body.id                          // prevent change id
                const newProduct = await Products.update(
                    req.body,
                    {where: {
                        id: req.params.id,
                    },
                retuning: true,
            }
            )
            console.log("here updated: ", newProduct)                    // [1, [obj]]
            res.send({newProduct})  
            } catch (error) {
                next(error);
            }
        })
        .delete(async (req, res, next) => {
            try {
              const rows = await Products.destroy({
                where: {
                  id: req.params.id,
                },
              });
              res.send({ rows });
            } catch (error) {
             
              next(error);
            }
          });

          export default router;