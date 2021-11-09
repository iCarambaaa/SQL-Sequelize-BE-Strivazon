import express from 'express';
import models from "../../db/models/index.js" // import the SQL models

const {Products, Reviews} = models;
const router = express.Router()

router
    .route("/")
    .get(async (req, res, next) => {
        try {
            const reviews = await Reviews.findAll()
            res.send(reviews)
        } catch(error) {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        try {
            const data = await Reviews.create(req.body)
            console.log(data)
            res.status(201).send(data)
        } catch (error) {
            next(error)
        }
    })

    router
        .route("/:id")
        .get(async (req, res, next) => {
            try {
                const product = await Reviews.findByPk(req.params.id, {include: Products})
                res.send(product)
            } catch (error) {
                next(error)
                
            }
        })
        .put(async (req, res, next) => {
            try {
                delete req.body.id                          // can't change id
                const newReview = await Reviews.update(
                    {...req.body},
                    {where: {
                        id: req.params.id,
                    },
                retuning: true,
            }
            )
            res.send(newReview[1][0])                      // [1, [obj]]
            } catch (error) {
                next(error);
            }
        })
        .delete(async (req, res, next) => {
            try {
              const rows = await Reviews.destroy({
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