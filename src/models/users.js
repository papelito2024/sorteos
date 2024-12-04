import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;



const usersSchema = new Schema(
  {
    username: {
      unique: true,
      type: String,
      min: 3,
      max: 20,
      required: true,
    }, // String is shorthand for {type: String}

    password: {
      required: true,
      type: String,
      min: 1,
    },

    email: {
      unique: true,
      required: true,
      type: String,
      min: 3,
      max: 20,
    },

    rol: {
      type: String,
      default: "user",
    },

    location: {
      country: String,
      state: String,
      city: String,
    },

    address: String,

    birthDate: Date,

    gender: String,

    raffles: [{ type: Schema.Types.ObjectId, ref: "Raffles" }],

    tickets:[{
      type: Schema.Types.ObjectId, ref: "Ticket" 
    }],
    verified: {
      type: Boolean,
      default: false,
    },
    
    refreshToken:{
      type:String
    },

    tokens:[
      {
        tokenType: {
          type: String,

        },
        token: {
          type: String
        },
        expire: {
          type: Date,
          default: Date.now() + (1000 * 60 * 30)
        }
      }
    ], 

    avatar: {
      type: String,
      default: "pictures/users/avatar.png",
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    //generate password hash
    this.password =await  this.generateHash(this.password)
    //generate key activate hash

   this.generateToken({ type: "verify", expire:Date.now() + (1000 * 60 * 60 * 24) })
    

    return next();
  } catch (error) {
    return next(error); 
  }
});

usersSchema.methods.generateToken =  function ({type,expiration}) {

  const token = uuidv4().replace(/[\/-]/g, '');
  
  const tDoc ={
    tokenType: type,
      token: token,
        expire: expiration
  }

  this.tokens= this.tokens.map(token=>token.tokenType==type ? tDoc : token )
  


};



usersSchema.methods.generateHash = async function (data) {

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(data, salt)


  return hash
};

usersSchema.methods.validatePassword = async function validatePassword(data) {
  return await bcrypt.compare(data, this.password);
};

usersSchema.methods.validateUser = function validatePassword(key) {
  return this.key == key;
};

const Users = mongoose.model("Users", usersSchema);


export default Users



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