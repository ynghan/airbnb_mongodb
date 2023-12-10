const mongoose = require("mongoose");
const { Schema } = mongoose;

const GuestSchema = new Schema(
    {
        name: { type: String, required: true },
        age: Number,
        address: {
            city: String,
            street: String,
            zipCode: String,
        },  
    },
    { timestamps: true }
);

GuestSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "guest",
    });
    GuestSchema.set("toObject", { virtuals: true });
    GuestSchema.set("toJSON", { virtuals: true });

const Guest = mongoose.model("Guest", GuestSchema);
module.exports = { Guest };