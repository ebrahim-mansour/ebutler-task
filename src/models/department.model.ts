import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Department
interface DepartmentAttrs {
  name: string;
}

// An interface that describes the properties
// that a Department Model has
interface DepartmentModel extends mongoose.Model<DepartmentDoc> {
  build(attrs: DepartmentAttrs): DepartmentDoc;
}

// An interface that describes the properties
// that a Department Document has
interface DepartmentDoc extends mongoose.Document {
  name: string;
  description?: string;
}

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

departmentSchema.statics.build = (attrs: DepartmentAttrs) => {
  return new Department(attrs);
};

const Department = mongoose.model<DepartmentDoc, DepartmentModel>(
  "Department",
  departmentSchema
);

export { Department };
