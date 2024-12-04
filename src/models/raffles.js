import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const rafflesSchema = new Schema(
    {
        title: {
            unique: true,
            type: String,
            min: 3,
            max: 20,
            required: true,
        }, // String is shorthand for {type: String}

        description: {
            
            type: String,
            min: 30,
            max: 150,
            required: true,
        }, // String is shorthand for {type: String}

        body: {
            
            type: String,
            max: 500,
            required: true,
        }, // String is shorthand for {type: String}

        comments:[{
            comment:String,
            user:{
                type: Schema.Types.ObjectId,
                ref:"Users"
            },
            replies:[{
                
            }]
        }],

        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required:true
        },
        ticket:{
          type: Schema.Types.ObjectId,
          ref: "Tickets",
         
        },
        awards:[{
          type: Schema.Types.ObjectId,
          ref: "Awards",
        }],

        participants:[{
            type: Schema.Types.ObjectId,
            ref: "Users"
        }],

        state: {
          type:String,
          emun: ['open', 'close', 'peding', 'canceled'],
          required:true,
         
        }
    },
    
    { timestamps: true }
)



rafflesSchema.methods.addParticipants= async function (participants){
  try {
 
    const p =  participants
    .map(id=>!this.participants.find(p => p._id != id) ? id : false)
      
 

    this.participants.push(...p)

  
    const t = await this.save()

   // console.log(t)
  } catch (error) {
    console.log(error.message)
  }
 
}


rafflesSchema.methods.removeParticipants = async function (participants) {

  participants.forEach((id)=>{

    this.participants=this.participants.filter((p) => p._id !=id)

  })
  
  await this.save()
}


rafflesSchema.methods.addAwards = async function (awards) {
  const a = awards
    .map(id => !this.awards.find(p => p._id != id) ? id : false)
  this. awards.push(...a)

  await this.save()
}


rafflesSchema.methods.removeAwards = async function (awards) {

  awards.forEach((id) => {
    this.awards = this.awards.filter((p) => p._id != id)
  })
  await this.save()
}


const Raffles = mongoose.model("Raffles", rafflesSchema)


export default Raffles



/*
actualizar el objecto de  un path tipo arreglo ejemplo
Producto.updateOne(
  { nombre: 'Producto A' },
  { $set: { 'items.$[elem].cantidad': 10 } }, // Cambia la cantidad de un objeto específico
  { arrayFilters: [{ 'elem.tipo': 'A' }] }, // Filtro para el objeto que quieres actualizar
  (err, result) => {
    if (err) return console.error(err);
    console.log(result);  // Resultado de la actualización
  }
); 

eliminar un objeto de un path tipo arreglo

Producto.updateOne(
  { nombre: 'Producto A' },
  { $pull: { items: { _id: 'id_del_objeto' } } },
  (err, result) => {
    if (err) return console.error(err);
    console.log(result);  // Muestra el resultado de la operación
  }
);

Producto.updateOne(
  { nombre: 'Producto A' }, // Filtro para el producto
  { $pull: { items: { tipo: 'A' } } }, // Eliminar el objeto del arreglo que tenga tipo 'A'
  (err, result) => {
    if (err) return console.error(err);
    console.log(result);  // Muestra el resultado de la operación
  }
);
 */