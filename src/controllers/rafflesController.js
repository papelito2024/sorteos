import Raffles from "../models/raffles.js"
import Tickets from "../models/tickets.js"


class RafflesController {
   
    async create(req, res, next) {

        try {

            console.log(req.body)

            const raffle = new Raffles(req.body)

            const ticket = new Tickets({
                raffle:raffle._id,
                price:req.body.price
            })

            raffle.ticket= ticket

            if (req.body.participants) {

                raffle.participants.push(...participants)

            }
            if (req.body.awards) {

                raffle.awards.push(...awards)

            }
            await Promise.all([await ticket.save(),await  raffle.save()]) 
            

            return  res.send("sorteo agregado")

        } catch (error) {

           return  res.send(error.message)
        }
         


    }


    async edit(req, res, next) {

        try {
            

            const raffle = await Raffles.findOneAndUpdate({ _id: req.params.id }, { ...req.body })

            
            
            if (req.body.price) {

              const r=  await  Tickets.updateOne({_id:raffle.ticket},{price:req.body.price})
                //console.log(r)
            }

            

            
            res.send("si guachin")
        } catch (error) {

            res.send(error.message)
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


    async participants(req, res, next) {


       
        try {
            const action = req.params.action
            const id = req.params.id
            const {participants} = req.body

            
            if(action){

               
                const raffle = await Raffles.findOne({_id:id})
                
                
                switch (action) {
                    case "add":
                      
                     const a=   await raffle.addParticipants(participants)
                    
                        break;
                    case "remove":
                       
                        await raffle.removeParticipants(participants)
                        break;
                
                    default:
                        break;
                }

            }

           res.send("eso guachin")

        } catch (error) {

            res.send(error.mesasge)
        }

    }

    async awards(req, res, next) {

        try {
            const action = req.params.action
            const id = req.params.id
            const { awards } = req.body
            if (action && id && awards.length > 0) {

                const user = await findOne({ _id: id })


                switch (action) {
                    case "add":
                        await user.addAwards(awards)
                        break;
                    case "remove":
                        await user.removeAwards(awards)
                        break;

                    default:
                        break;
                }

            }



        } catch (error) {

            res.send(error)
        }

    }




}


export default RafflesController