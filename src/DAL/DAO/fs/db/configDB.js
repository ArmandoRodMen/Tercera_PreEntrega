import mongoose from "mongoose";
import config from "../../../../config.js";

const URI = config.MONGO_URI;

mongoose.connect(URI)
.then(()=>console.log("Conectado a la DB"))
.catch(error => console.log(error))