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
var typeorm_1 = require("typeorm");
var Tool_1 = require("../../database/entity/Tool");
var Tag_1 = require("../../database/entity/Tag");
var User_1 = require("../../database/entity/User");
var ListSearchToolsService_1 = __importDefault(require("../services/ListSearchToolsService"));
var ListToolsService_1 = __importDefault(require("../services/ListToolsService"));
exports.default = {
    index: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tag, userId, tools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = req.query.tag;
                        userId = req.userId;
                        if (!tag) return [3 /*break*/, 2];
                        return [4 /*yield*/, ListSearchToolsService_1.default.run({ tag: tag, userId: userId })];
                    case 1:
                        tools = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ListToolsService_1.default.run({ userId: userId })];
                    case 3:
                        tools = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, res.json(tools)];
                }
            });
        });
    },
    store: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tools, repoTags, user, _a, title, link, description, tags, tool, saveTools, newTags, id;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(Tool_1.Tool)];
                    case 1:
                        tools = _b.sent();
                        return [4 /*yield*/, typeorm_1.getConnection().getRepository(Tag_1.Tag)];
                    case 2:
                        repoTags = _b.sent();
                        return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(User_1.User)
                                .findOneOrFail({ where: { id: req.userId } })];
                    case 3:
                        user = _b.sent();
                        _a = req.body, title = _a.title, link = _a.link, description = _a.description, tags = _a.tags;
                        tool = new Tool_1.Tool();
                        tool.title = title;
                        tool.link = link;
                        tool.description = description;
                        tool.user = user;
                        return [4 /*yield*/, tools.save(tool)];
                    case 4:
                        saveTools = _b.sent();
                        return [4 /*yield*/, Promise.all(tags.map(function (tagName) { return __awaiter(_this, void 0, void 0, function () {
                                var tag;
                                return __generator(this, function (_a) {
                                    tag = new Tag_1.Tag();
                                    tag.name = tagName;
                                    tag.tool = saveTools;
                                    return [2 /*return*/, tag];
                                });
                            }); }))];
                    case 5:
                        newTags = (_b.sent());
                        return [4 /*yield*/, repoTags.save(newTags)];
                    case 6:
                        _b.sent();
                        id = saveTools.id;
                        return [2 /*return*/, res.status(201).json({
                                id: id,
                                title: title,
                                link: link,
                                description: description,
                                tags: tags
                            })];
                }
            });
        });
    },
    remove: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tools, tool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(Tool_1.Tool)];
                    case 1:
                        tools = _a.sent();
                        return [4 /*yield*/, tools.findOne({ where: { id: req.params.id } })];
                    case 2:
                        tool = _a.sent();
                        if (!tool) return [3 /*break*/, 4];
                        return [4 /*yield*/, tools.remove(tool)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(401).json({ error: 'Ferramenta não encontrada' })];
                    case 5: return [2 /*return*/, res.status(204).json()];
                }
            });
        });
    }
};
//# sourceMappingURL=ToolController.js.map