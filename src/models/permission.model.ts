import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new Permission
interface PermissionAttrs {
  name: string;
}

// An interface that describes the properties
// that a Permission Model has
interface PermissionModel extends mongoose.Model<PermissionDoc> {
  build(attrs: PermissionAttrs): PermissionDoc;
}

// An interface that describes the properties
// that a Permission Document has
interface PermissionDoc extends mongoose.Document {
  name: string;
  description?: string;
}

const permissionSchema = new mongoose.Schema(
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

permissionSchema.statics.build = (attrs: PermissionAttrs) => {
  return new Permission(attrs);
};

const Permission = mongoose.model<PermissionDoc, PermissionModel>(
  "Permission",
  permissionSchema
);

export { Permission };
