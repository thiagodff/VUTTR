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
var Tool_1 = require("../../database/entity/Tool");
var Tag_1 = require("../../database/entity/Tag");
var ListSearchTools = /** @class */ (function () {
    function ListSearchTools() {
    }
    ListSearchTools.prototype.run = function (_a) {
        var tag = _a.tag, userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            var tags, tools, findTags, findTools, formatTools, _b, _c, filterTools;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getConnection().getRepository(Tag_1.Tag)];
                    case 1:
                        tags = _d.sent();
                        return [4 /*yield*/, typeorm_1.getConnection().getRepository(Tool_1.Tool)];
                    case 2:
                        tools = _d.sent();
                        return [4 /*yield*/, tags.find({
                                where: { name: tag },
                                relations: ['tool']
                            })];
                    case 3:
                        findTags = _d.sent();
                        findTools = findTags.map(function (findTag) { return findTag.tool; });
                        _c = (_b = Promise).all;
                        return [4 /*yield*/, findTools.map(function (findTool) { return __awaiter(_this, void 0, void 0, function () {
                                var tool, searchTags, formatTags, id, title, link, description, user;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tools.findOne({
                                                where: { id: findTool.id },
                                                relations: ['user']
                                            })];
                                        case 1:
                                            tool = (_a.sent());
                                            return [4 /*yield*/, tags.find({ where: { tool: findTool.id } })];
                                        case 2:
                                            searchTags = _a.sent();
                                            formatTags = searchTags.map(function (searchTag) { return searchTag.name; });
                                            id = tool.id, title = tool.title, link = tool.link, description = tool.description, user = tool.user;
                                            if (user.id === userId) {
                                                return [2 /*return*/, {
                                                        id: id,
                                                        title: title,
                                                        link: link,
                                                        description: description,
                                                        tags: formatTags,
                                                        user: {
                                                            id: user.id,
                                                            name: user.name,
                                                            email: user.email
                                                        }
                                                    }];
                                            }
                                            return [2 /*return*/, false];
                                    }
                                });
                            }); })];
                    case 4: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 5:
                        formatTools = _d.sent();
                        filterTools = formatTools.filter(function (formatTool) { return formatTool; });
                        return [2 /*return*/, filterTools];
                }
            });
        });
    };
    return ListSearchTools;
}());
exports.default = new ListSearchTools();
//# sourceMappingURL=ListSearchToolsService.js.map