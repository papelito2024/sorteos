import Awards from "../models/awards.js"
import Tickets from "../models/tickets.js"


class AwardsController {

    async create(req, res, next) {

        try {

            console.log(req.body)

            const award = new Awards(req.body)

            await award.save()

            return res.send("sorteo agregado")

        } catch (error) {

            return res.send(error.message)
        }



    }


    async edit(req, res, next) {

        try {

            const { participants } = req.body;

            const user = await Users.updateOne({ _id: req.params.id }, { ...req.body })


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


    async get(req, res, next) {

        try {


            const data = await this.get({ ...req.body.filter }, req.body.select, { ...req.body.pagination })

            res.json({
                data,
                pagination,
            })

        } catch (error) {

            res.send(error)
        }

    }




}


export default AwardsController