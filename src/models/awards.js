import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const AwardsSchema = new Schema(
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

       media:[String]
    },

    { timestamps: true }
)



const Awards = mongoose.model("Awards", AwardsSchema)


export default Awards



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