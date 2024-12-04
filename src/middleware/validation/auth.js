import { body } from "express-validator";
import Users from "../../models/users.js";



export const validation = {
    signin: [
        body('email')

            .notEmpty().withMessage("not empty")
            .isLength(8).withMessage("this fiel must  have at least 8 characters")
            .isEmail().withMessage("this is not a valid email")
        ,
        body('password')
            .notEmpty().withMessage("not empty")
            .isLength(8).withMessage("this fiel must  have at least 8 characters")
            .isLength({ min: 8 })
    ],
    signup: [
        body('username')

            .notEmpty().withMessage("this field must not be  empty")
            .isLength(3).withMessage("this fiel must  have at least 3 characters")
            .isLength({ max: 15 }).withMessage("this fiel must not execed from 15 characters")

            .custom(async (value, { req }) => {
                const user = await Users.find({ username: value }).exec()

                if (user.length > 0) throw new Error("this user already exists");

            }),
        body('email')

            .notEmpty().withMessage("not empty")
            .isLength(5).withMessage("this fiel must  have at least 5 characters")
            .isEmail().withMessage("this is not a valid email")
            .custom(async (value, { req }) => {
                const user = await Users.find({ email: value })
                console.log(user)
                if (user.length) throw new Error("this email already exists");


            }),
        body('password')
            .notEmpty().withMessage("not empty")
            .isLength({ min: 8, max: 30 }).withMessage("this fiel must  have at least 8 characters")

    ],

    forgot: [
        body('email')
            .optional()
            .isLength(1).withMessage("this fiel must  have at least 1 characters")
            .isEmail().withMessage("this is not a valid email")
            .custom(async (value, { req }) => {
                const user = await Users.findOne({ email: value })
               // console.log(user)
                if (!user) throw new Error("this email does not correspond to a valid user");

            }),
        body('password')
            .optional()
            
            .isLength({ min: 8, max: 30 }).withMessage("this fiel must  have at least 8 characters")


    ]

}