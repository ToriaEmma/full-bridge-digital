import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

const LeadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  service: { type: String, required: true },
  message: { type: String, required: true, minlength: 20 },
  status: {
    type: String,
    enum: ["new", "read", "replied"],
    default: "new",
  },
  createdAt: { type: Date, default: Date.now },
});

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
