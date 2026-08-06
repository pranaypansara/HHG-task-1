import mongoose from 'mongoose';

const builderCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    builderTitle: {
      type: String,
      required: [true, 'Builder title is required'],
      trim: true,
      maxlength: [60, 'Builder title cannot exceed 60 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role / tech stack is required'],
      trim: true,
      maxlength: [80, 'Role / tech stack cannot exceed 80 characters'],
    },
    status: {
      type: String,
      required: [true, 'Current status is required'],
      trim: true,
      maxlength: [60, 'Status cannot exceed 60 characters'],
    },
    college: {
      type: String,
      required: [true, 'College / company is required'],
      trim: true,
      maxlength: [80, 'College / company cannot exceed 80 characters'],
    },
    generatedImagePath: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const BuilderCard = mongoose.model('BuilderCard', builderCardSchema);

export default BuilderCard;
