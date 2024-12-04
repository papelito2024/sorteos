
import { body,query } from "express-validator";
import Users from "../../models/users.js";
import Raffles from "../../models/raffles.js";
import mongoose from "mongoose";
import RafflesController from "../../controllers/rafflesController.js";

export  const validation=  {
    create: [
        body('title')

            .notEmpty().withMessage("This field is required")
            .isLength({max:30}).withMessage("this fiel must  have at least 30 characters")
            .custom(async (value, { req }) => {
                const raffle = await Raffles.findOne({ title: value })
               
                if (raffle) throw new Error("this raffle already exists");

                return true
            })
        ,
        body('description')
            .notEmpty().withMessage("This field is required")
            .isLength({max:200}).withMessage("this fiel must  have at least 200 characters")
            
        ,
         body('body')
            .notEmpty().withMessage("This field is required")
            .isLength({max:800}).withMessage("character limit exeded of 800")
            
        ,
        body('state')
            .notEmpty().withMessage("This field is required")
            .custom((value)=>{

                const states =["open","closed","peding","canceled"]

                if(!states.find(s=>s==value)) throw new Error("wrong state value  ")

                return true
            })
        ,
        body('price')
            .notEmpty().withMessage("This field is required")
            . isDecimal({ decimal_digits: '2' }).withMessage('El precio debe ser un número decimal con dos decimales')
            .custom((value) => {
                if (parseFloat(value) <= 0) {
                    throw new Error('El precio debe ser mayor que 0')
                }
                return true
            })
        ,
         body('author')
            .notEmpty().withMessage("This field is required")
             .isMongoId().withMessage("This is not a correct id format ")
            .custom(async (value, { req }) => {
                const user = await Users.findOne({ _id: value })
                console.log(value)
                if (!user) throw new Error("this user doenst exists ");

                return true
            }),
         body('participants')
            .optional()
            .isArray().withMessage("This must be an array value")
            .custom(async (values) => {

              //  console.log(values)
             /*    values.forEach((id)=>{
                    if (!mongoose.Types.ObjectId.isValid(id)) {
                        throw new Error('El ID proporcionado no es un ObjectId válido');
                    }
                }) */
                return true
            })
            .custom(async (value)=>{

                const promises = value.map(async (id) => {
                    const user = await Users.findOne({ _id: id })
                    if (!user) {
                        console.log("ASDasdasd")
                        throw new Error("Este usuario no existe")
                    }
                })
                    await Promise.all(promises) // Espera a que todas las promesas se resuelvan
               
                return true
            }) 
        ],

        edit:[

            body('title')
                .optional()
                .notEmpty().withMessage("This field is required")
                .isLength({ max: 30 }).withMessage("this fiel must  have at least 30 characters")
                .custom(async (value, { req }) => {
                    const raffle = await Raffles.findOne({ title: value })

                    if (raffle) throw new Error("this raffle already exists");

                    return true
                })
            ,
            body('description')
                .optional()
                .notEmpty().withMessage("This field is required")
                .isLength({ max: 200 }).withMessage("this fiel must  have at least 200 characters")

            ,
            body('body')
                .optional()
                .notEmpty().withMessage("This field is required")
                .isLength({ max: 800 }).withMessage("character limit exeded of 800")

            ,
            body('state')
                .optional()
                .notEmpty().withMessage("This field is required")
                .custom((value) => {

                    const states = ["open", "closed", "peding", "canceled"]

                    if (!states.find(s => s == value)) throw new Error("wrong state value  ")

                    return true
                })
            ,
            body('price')
                .optional()
                .notEmpty().withMessage("This field is required")
                .isDecimal({ decimal_digits: '2' }).withMessage('El precio debe ser un número decimal con dos decimales')
                .custom((value) => {
                    if (parseFloat(value) <= 0) {
                        throw new Error('El precio debe ser mayor que 0')
                    }
                    return true
                })
            ,
            body('author')
                .optional()
                .notEmpty().withMessage("This field is required")
                .isMongoId().withMessage("This is not a correct id format ")
                .custom(async (value, { req }) => {
                    const user = await Users.findOne({ _id: value })
                    console.log(value)
                    if (!user) throw new Error("this user doenst exists ");

                    return true
                }),
            body('participants')
                .optional()
                
                .custom(async (values) => {

                       values.forEach((id)=>{
                           if (!mongoose.Types.ObjectId.isValid(id)) {
                               throw new Error('El ID proporcionado no es un ObjectId válido');
                           }
                       }) 
                    return true
                })
                .custom(async (value) => {
            
                    const promises = value.map(async (id) => {
                        const user = await Users.findOne({ _id: id })
                        if (!user) {
                           
                            throw new Error("Este usuario no existe")
                        }
                    })
                    await Promise.all(promises) // Espera a que todas las promesas se resuelvan

                    return true
                }) 
        
        ]
   
    

}