"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var departmentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
departmentSchema.statics.build = function (attrs) {
    return new Department(attrs);
};
var Department = mongoose_1.default.model("Department", departmentSchema);
exports.Department = Department;
