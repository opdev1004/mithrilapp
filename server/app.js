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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var axios_1 = require("axios");
var API_TOKEN = "7ab4662a810246049aa2d63dc6fe0cb9"; // Replace with your football-data.org API token
var API_URL = "https://api.football-data.org/v4/matches";
var app = (0, express_1["default"])();
var PORT = 3000;
app.use((0, cors_1["default"])());
var matchesCache = [];
app.get("/api/matches", function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(matchesCache.length === 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, fetchData()];
            case 1:
                matchesCache = _a.sent();
                _a.label = 2;
            case 2:
                res.json(matchesCache);
                return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Server running at http://localhost:".concat(PORT));
});
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(API_URL, {
                        headers: { "X-Auth-Token": API_TOKEN }
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.data.matches.map(function (m) {
                            var _a, _b;
                            return ({
                                id: m.id,
                                utcDate: m.utcDate,
                                homeTeam: m.homeTeam.name,
                                awayTeam: m.awayTeam.name,
                                score: "".concat((_a = m.score.fullTime.home) !== null && _a !== void 0 ? _a : "-", " : ").concat((_b = m.score.fullTime.away) !== null && _b !== void 0 ? _b : "-")
                            });
                        })];
            }
        });
    });
}
