import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Role
interface RoleAttrs {
  name: string;
}

// An interface that describes the properties
// that a Role Model has
interface RoleModel extends mongoose.Model<RoleDoc> {
  build(attrs: RoleAttrs): RoleDoc;
}

// An interface that describes the properties
// that a Role Document has
interface RoleDoc extends mongoose.Document {
  name: string;
  description?: string;
}

const roleSchema = new mongoose.Schema(
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

roleSchema.statics.build = (attrs: RoleAttrs) => {
  return new Role(attrs);
};

const Role = mongoose.model<RoleDoc, RoleModel>("Role", roleSchema);

export { Role };
