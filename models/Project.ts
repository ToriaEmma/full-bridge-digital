import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  year: string;
  client: string;
  title: string;
  image: string;
  alt: string;
  className: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    year: { type: String, required: true },
    client: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    className: { type: String, required: true },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
