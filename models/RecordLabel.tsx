import mongoose from "mongoose";
import { Schema, model, models, Model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import IRecordLabel from "../@types/record-label";

const RecordLabelSchema = new Schema<IRecordLabel>(
  {
    name: {
      type: String,
      required: true,
    },
    formedAt: {
      type: String,
    },
    image: {
      type: {
        path: String,
        name: String,
      },
    },
    info: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
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

RecordLabelSchema.plugin(paginate);

let RecordLabel = (models?.RecordLabel ||
  mongoose.model(
    "RecordLabel",
    RecordLabelSchema
  )) as mongoose.PaginateModel<IRecordLabel>;

export default RecordLabel;
