import mongoose from "mongoose";
const { connect } = mongoose;

let LINK_LOCAL = "mongodb://localhost:27017/BD_facture_freemo";
let LINK_ONLINE =
    "mongodb+srv://marc:AcsTN9V5qUL6qUzD@cluster0.txtzh.mongodb.net/BD_facture_freemo";

connect(LINK_LOCAL).then(
    () => {
        console.log("connexion reussi a mongo db ");
    },
    (err) => {
        console.log("erreur de connexion " + err);
    }
);
