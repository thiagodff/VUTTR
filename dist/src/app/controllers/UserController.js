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
var typeorm_1 = require("typeorm");
var User_1 = require("../../database/entity/User");
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getConnection()
                        .getRepository(User_1.User)
                        .find()];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, res.json(users)];
            }
        });
    });
}
exports.index = index;
function store(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, name, email, password, createUser, id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    user = _b.sent();
                    _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                    return [4 /*yield*/, user.findOne({ where: { email: email } })];
                case 2:
                    if (_b.sent()) {
                        return [2 /*return*/, res.status(400).json({ error: { message: 'Duplicated e-mail' } })];
                    }
                    return [4 /*yield*/, user.create({
                            name: name,
                            email: email
                        })];
                case 3:
                    createUser = _b.sent();
                    return [4 /*yield*/, createUser.hashPassword(password)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, user.save(createUser)];
                case 5:
                    id = (_b.sent()).id;
                    return [2 /*return*/, res.json({ id: id, name: name, email: email })];
            }
        });
    });
}
exports.store = store;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, email, oldPassword, password, confirmPassword, name, updateUser, userExists;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    user = _b.sent();
                    _a = req.body, email = _a.email, oldPassword = _a.oldPassword, password = _a.password, confirmPassword = _a.confirmPassword, name = _a.name;
                    return [4 /*yield*/, user.findOneOrFail({ where: { id: req.userId } })];
                case 2:
                    updateUser = _b.sent();
                    if (!(email !== updateUser.email)) return [3 /*break*/, 4];
                    return [4 /*yield*/, user.findOne({ where: { email: email } })];
                case 3:
                    userExists = _b.sent();
                    if (userExists) {
                        return [2 /*return*/, res.status(400).json({ error: 'User already exists.' })];
                    }
                    updateUser.email = email;
                    _b.label = 4;
                case 4:
                    if (password !== confirmPassword) {
                        return [2 /*return*/, res
                                .status(401)
                                .json({ error: 'Password and confirm password does not match.' })];
                    }
                    if (!(oldPassword && password)) return [3 /*break*/, 7];
                    return [4 /*yield*/, updateUser.checkPassword(oldPassword)];
                case 5:
                    if (!(_b.sent())) {
                        return [2 /*return*/, res.status(401).json({ error: 'Password does not match.' })];
                    }
                    return [4 /*yield*/, updateUser.hashPassword(password)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    if (name) {
                        updateUser.name = name;
                    }
                    return [4 /*yield*/, user.save(updateUser)];
                case 8:
                    _b.sent();
                    return [2 /*return*/, res.json(updateUser)];
            }
        });
    });
}
exports.update = update;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    users = _a.sent();
                    return [4 /*yield*/, users.findOneOrFail({ where: { id: req.params.id } })];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, users.remove(user)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.json(user)];
            }
        });
    });
}
exports.remove = remove;
//# sourceMappingURL=UserController.js.map