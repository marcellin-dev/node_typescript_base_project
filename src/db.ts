import mongoose from "mongoose";
const { connect } = mongoose;

let LINK_LOCAL = "mongodb://localhost:27017/BD_facture_freemo";

connect(LINK_LOCAL).then(
    () => {
        console.log("connexion reussi a mongo db ");
    },
    (err) => {
        console.log("erreur de connexion " + err);
    }
);
