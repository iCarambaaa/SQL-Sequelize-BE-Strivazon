import express from 'express';
import models from "../../db/models/index.js" // import the SQL models

const {Products, Reviews} = models;
const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const products = await Products.findAll({include: Reviews})
            res.send(products)
        } catch(error) {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        try {
            const data = await Products.create(req.body)
            res.send(data)
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
                delete req.body.id                          // can't change id
                const newProduct = await Products.update(
                    {...req.body},
                    {where: {
                        id: req.params.id,
                    },
                retuning: true,
            }
            )
            res.send(newProduct[1][0])                      // [1, [obj]]
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