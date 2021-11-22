import mongoose from "mongoose";

// An interface that describes the properties
// that are requried to create a new RolePermission
interface RolePermissionAttrs {
  roleId: string;
  permissions: string[];
}

// An interface that describes the properties
// that a RolePermission Model has
interface RolePermissionModel extends mongoose.Model<RolePermissionDoc> {
  build(attrs: RolePermissionAttrs): RolePermissionDoc;
}

// An interface that describes the properties
// that a RolePermission Document has
interface RolePermissionDoc extends mongoose.Document {
  roleId: string;
  permissions: string[];
}

const rolePermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    permissions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Permission",
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

rolePermissionSchema.statics.build = (attrs: RolePermissionAttrs) => {
  return new RolePermission(attrs);
};

const RolePermission = mongoose.model<RolePermissionDoc, RolePermissionModel>(
  "RolePermission",
  rolePermissionSchema
);

export { RolePermission };
