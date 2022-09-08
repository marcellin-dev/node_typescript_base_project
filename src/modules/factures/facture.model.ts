import mongoose from "mongoose";


const factureSchema = new mongoose.Schema(
    {
        numero_facture: {
            type: String,
            required: true
        },
        montant: {
            type: Number,
            default: 0,
        },


    },
    {timestamps: true}
);

const factureModel = mongoose.model("facture", factureSchema);
export default factureModel;
