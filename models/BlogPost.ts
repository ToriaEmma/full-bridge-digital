import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  heroLines: [string, string, string];
  excerpt: string;
  time: string;
  date: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: IBlogSection[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSectionSchema = new Schema<IBlogSection>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: { type: [String], required: true },
});

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    heroLines: { type: [String], required: true },
    excerpt: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    intro: { type: String, required: true },
    sections: { type: [BlogSectionSchema], required: true },
  },
  { timestamps: true }
);

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
