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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = __importDefault(require("faker"));
var supertest_1 = __importDefault(require("supertest"));
var typeorm_1 = require("typeorm");
var app_1 = __importDefault(require("../../src/app"));
var User_1 = require("../../src/database/entity/User");
var database_1 = require("../../src/config/database");
describe('User', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.createTypeormConn()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.closeDatabaseConn()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should encrypt user password when new user created', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, createUser, newUser, compareHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(User_1.User)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, user.create({
                            name: faker_1.default.name.findName(),
                            email: faker_1.default.internet.email()
                        })];
                case 2:
                    createUser = _a.sent();
                    return [4 /*yield*/, createUser.hashPassword('123456')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user.save(createUser)];
                case 4:
                    newUser = _a.sent();
                    return [4 /*yield*/, newUser.checkPassword('123456')];
                case 5:
                    compareHash = _a.sent();
                    expect(compareHash).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to register', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post('/users')
                        .send({
                        name: faker_1.default.name.findName(),
                        email: faker_1.default.internet.email(),
                        password: faker_1.default.internet.password()
                    })];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to register with duplicated e-mail', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post('/users')
                        .send({
                        name: faker_1.default.name.findName(),
                        email: 'email.test@gmail.com',
                        password: faker_1.default.internet.password()
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: faker_1.default.name.findName(),
                            email: 'email.test@gmail.com',
                            password: faker_1.default.internet.password()
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('User after signin', function () {
    var token;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.createTypeormConn()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/users')
                            .send({
                            name: 'user',
                            email: 'email.test@gmail.com',
                            password: '123456'
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .post('/sessions')
                            .send({
                            email: 'email.test@gmail.com',
                            password: '123456'
                        })];
                case 3:
                    response = _a.sent();
                    token = response.body.token;
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.closeDatabaseConn()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to access with no token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default).get('/users')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to access with wrong token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get('/users')
                        .set('Authorization', 'bearer invalidToken')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to show all users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .get('/users')
                        .set('Authorization', "bearer " + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body[0]).toHaveProperty('id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to update user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .put('/users')
                        .send({
                        name: faker_1.default.name.findName(),
                        email: faker_1.default.internet.email(),
                        oldPassword: '123456',
                        password: '123123',
                        confirmPassword: '123123'
                    })
                        .set('Authorization', "bearer " + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to update without changing any data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .put('/users')
                        .send({
                        email: 'email.test@gmail.com'
                    })
                        .set('Authorization', "bearer " + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('id');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to change the email to an already exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .post('/users')
                        .send({
                        name: faker_1.default.name.findName(),
                        email: 'email@email.com',
                        password: faker_1.default.internet.password()
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app_1.default)
                            .put('/users')
                            .send({
                            name: faker_1.default.name.findName(),
                            email: 'email@email.com'
                        })
                            .set('Authorization', "bearer " + token)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to update password if confirm password are wrong', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .put('/users')
                        .send({
                        name: faker_1.default.name.findName(),
                        oldPassword: '123456',
                        password: '123123',
                        confirmPassword: '123111'
                    })
                        .set('Authorization', "bearer " + token)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to update password if old password are wrong', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .put('/users')
                        .send({
                        name: faker_1.default.name.findName(),
                        oldPassword: '112233',
                        password: '123123',
                        confirmPassword: '123123'
                    })
                        .set('Authorization', "bearer " + token)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to remove an user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1.default(app_1.default)
                        .delete('/users/1')
                        .set('Authorization', "bearer " + token)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('email');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=user.test.js.map