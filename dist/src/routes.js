"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController = __importStar(require("./app/controllers/UserController"));
var auth_1 = require("./app/middlewares/auth");
var SessionController_1 = __importDefault(require("./app/controllers/SessionController"));
var ToolController_1 = __importDefault(require("./app/controllers/ToolController"));
var routes = express_1.Router();
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController_1.default.store);
routes.use(auth_1.authMiddleware);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.remove);
routes.get('/tools', ToolController_1.default.index);
routes.post('/tools', ToolController_1.default.store);
routes.delete('/tools/:id', ToolController_1.default.remove);
exports.default = routes;
//# sourceMappingURL=routes.js.map