import {Request, Response} from "express";

import cors from "cors";
import  appRoutes from "./index.route"
import express from "express"
import { urlencoded } from "express";

const corsOptions = {
    origin: "*",
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};


export default class Server {
readonly  port:number  ;

    constructor(port :number ) {
        this.port = port
    }

    start(){
        const app = express()

        app.use(urlencoded({ extended: true }));

        app.use(cors(corsOptions));

        app.use(express.json());

       require("./db")

//entry routes

        app.use("/api", appRoutes);

        app.listen(this.port, function (){

            console.log("le serveur tourne ")
        })
    }
}