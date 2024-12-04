

import Users from "../models/users"
import Controller from "./controller"

class UsersController extends Controller{
    constructor(parameters) {
        super()
    }

   async  create(req, res, next) {

        try {
            
            const user =  new Users(req.body)

            await user.save()

            res.send("user deleted")

        } catch (error) {
            
            res.send(error)
        }
        

    }


   async  edit(req, res, next) {

        try {

            const user = await Users.updateOne({_id:req.id},{...req.body})

            res.send("user deleted")
        } catch (error) {

            res.send(error)
        }


    }


    async delete(req, res, next) {

        try {

            const user = await Users.deleteOne({ _id: req.id }, { ...req.body })


            res.send("user deleted")
        } catch (error) {

            res.send(error)
        }

    }


   async  get(req, res, next) {

        try {

          
           const data = await  this.get({...req.body.filter},req.body.select,{...req.body.pagination})

            res.json({
                data,
                pagination,
            })

        } catch (error) {
            
            res.send(error)
        }

    }


    
    

    
}


export default UsersController