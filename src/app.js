
import express from "express"
import morgan from "morgan"
import cors from "cors"
import createHttpError from "http-errors"
import path from "path"
import cookieParser from "cookie-parser"
// loadEnv.js
import dotenv from 'dotenv';

import session from "express-session"
import { getGlobals } from "common-es";
const { __dirname, __filename } = getGlobals(import.meta.url);


/**
 *  app express initialization
 */

const app = express();


/**
 * dotenv enviroment varaibles
 */
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//cors
app.use(cors());


//static files
 
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessions 

/*
*/
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:false,
  cookie: { 
    secure: process.env.ENV=="production"  },
    maxAge: 1000 * 60 * 30,
}))




/**
 * routes config
 */


import  authRouter from "./routes/auth.js"
//console.log(authRouter)

app.use("/auth",authRouter)



///////////asdasssssssasdasd



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 // res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  res.send('error no hay ruta');
});



export default app
