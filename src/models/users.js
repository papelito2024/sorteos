import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

    sorteos: [{ type: Schema.Types.ObjectId, ref: "sorteos" }],

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
   
    this.password = await this.generateHash(this.password)
    //generate key activate hash
    this.tokens.push( {
      tokenType:"verify",
      token: await bcrypt.hash(this.email + this.user, salt),
      expired: Date.now() + (1000 * 60 * 60 * 24)
    })

    return next();
  } catch (error) {
    return next(erro);
  }
});

usersSchema.methods.generateToken = async function ({type,expiration}) {

  const token = await this.generateHash(this._id)
  
  this.tokens.push({
    tokenType: type,
    token: token,
    expire:expiration
  }) 

   await  this.save()
  return  token
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