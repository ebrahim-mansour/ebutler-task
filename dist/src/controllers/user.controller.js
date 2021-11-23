"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByIdController = exports.assignDepartController = exports.getUserByIdController = exports.getAllUsersController = exports.createUserController = void 0;
var not_found_error_1 = require("../common/errors/not-found-error");
var user_model_1 = require("../models/user.model");
exports.createUserController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, username, email, password, role, departmentId, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, username = _a.username, email = _a.email, password = _a.password, role = _a.role, departmentId = _a.departmentId;
                user = user_model_1.User.build({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password,
                    role: role,
                    departmentId: departmentId,
                });
                return [4 /*yield*/, user.save()];
            case 1:
                _b.sent();
                res.status(201).send({ user: user });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUsersController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchKey, role, departmentId, query, limit, page, skip, users;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, searchKey = _a.searchKey, role = _a.role, departmentId = _a.departmentId;
                query = {};
                limit = +(req.query.limit || 50);
                page = +(req.query.page || 1);
                skip = (page - 1) * limit;
                if (searchKey) {
                    query.$or = [
                        { username: { $regex: searchKey, $options: "i" } },
                        { email: { $regex: searchKey, $options: "i" } },
                    ];
                }
                if (role) {
                    query.role = role;
                }
                if (departmentId) {
                    query.departmentId = departmentId;
                }
                return [4 /*yield*/, user_model_1.User.find(query).skip(skip).limit(limit)];
            case 1:
                users = _b.sent();
                res.status(200).send({ users: users });
                return [2 /*return*/];
        }
    });
}); };
exports.getUserByIdController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new not_found_error_1.NotFoundError();
                }
                res.status(200).send({ user: user });
                return [2 /*return*/];
        }
    });
}); };
exports.assignDepartController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new not_found_error_1.NotFoundError();
                }
                user.set({
                    departmentId: req.body.departmentId,
                });
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                res.status(200).send({ user: user });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUserByIdController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findByIdAndDelete(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new not_found_error_1.NotFoundError();
                }
                res.status(200).send({ message: "user deleted successfully" });
                return [2 /*return*/];
        }
    });
}); };
