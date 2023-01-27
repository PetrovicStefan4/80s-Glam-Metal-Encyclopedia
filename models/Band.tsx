import mongoose from "mongoose";
import { Schema, model, models, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { IBand } from "../@types/band";

const BandSchema = new Schema<IBand>(
  {
    name: {
      type: String,
      required: true,
    },
    formedAt: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    image: {
      type: {
        path: String,
        name: String,
      },
    },
    soloArtist: {
      type: Boolean,
    },
    info: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

BandSchema.plugin(paginate);

let Band = (models?.Band ||
  mongoose.model("Band", BandSchema)) as mongoose.PaginateModel<IBand>;

export default Band;
