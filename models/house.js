const { Schema, model, Types } = require("mongoose");

//주소 스키마
const AddressSchema = new Schema({
  city: { type: String },
  street: { type: String },
  zipcode: { type: String },
});

const HouseSchema = new Schema({
  //공간 유형
  type: { type: String, enum: ["entire", "private"], required: true },
  //숙소 이름
  name: { type: String },
  //가격
  price: { type: Number },
  //별점 배열
  rating: { type: [Number] },
  //주소
  address: {
    city: String,
    street: String,
    zipCode: String,
  },
  //편의 시설
  amenities: { type: [String] },

  dates: [
    {
      //날짜
      date: {
        year: Number,
        month: Number,
        day: Number,
      },
      //제한인원
      limit: Number,
      //예약 상태
      status: { type: String, enum: ["oncomming", "terminated"] },
    },
  ],
});

HouseSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "house",
});
HouseSchema.set("toObject", { virtuals: true });
HouseSchema.set("toJSON", { virtuals: true });

const House = model("House", HouseSchema);
module.exports = { House };
