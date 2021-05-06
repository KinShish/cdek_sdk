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
exports.cdek = void 0;
var cdek_1 = require("./request/cdek");
var request = new cdek_1.default();
function getError(message) {
    return { code: "cdek_sdk_invalid_format", message: message };
}
var Cdek_sdk = /** @class */ (function () {
    function Cdek_sdk() {
    }
    Cdek_sdk.prototype.getToken = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var oath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.api('POST', 'oauth/token?parameters', {
                            grant_type: 'client_credentials',
                            client_id: login.account,
                            client_secret: login.secret
                        }, '')];
                    case 1:
                        oath = _a.sent();
                        console.log("Новый токен:" + oath.access_token);
                        if (oath.access_token) {
                            return [2 /*return*/, oath.access_token];
                        }
                        return [2 /*return*/, oath];
                }
            });
        });
    };
    Cdek_sdk.prototype.getLocationRegions = function (token, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, arrayParams, _i, _a, key, arrCountry, _b, _c, c, req;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        res = { errors: [], data: {} };
                        arrayParams = [];
                        for (_i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                            key = _a[_i];
                            switch (key) {
                                case 'country_codes':
                                    arrCountry = [];
                                    for (_b = 0, _c = data.country_codes; _b < _c.length; _b++) {
                                        c = _c[_b];
                                        if (c.length !== 2) {
                                            res.errors.push(getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"));
                                            break;
                                        }
                                        else
                                            arrCountry.push(c);
                                    }
                                    if (arrCountry.length > 0)
                                        arrayParams.push('country_codes=' + arrCountry.join());
                                    break;
                                case 'kladr_region_code':
                                    if (data.kladr_region_code.length > 255)
                                        res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"));
                                    else
                                        arrayParams.push('kladr_region_code=' + data.kladr_region_code);
                                    break;
                                case 'page':
                                    if (!data.size)
                                        res.errors.push(getError('size обязателен если указан page'));
                                    else
                                        arrayParams.push('page=' + data.page);
                                    break;
                                case 'lang':
                                    if (data.lang.length !== 3)
                                        res.errors.push(getError("Локализация. По умолчанию 'rus':string(3)"));
                                    else
                                        arrayParams.push('lang=' + data.lang);
                                    break;
                                default:
                                    arrayParams.push(key + '=' + data[key]);
                                    break;
                            }
                        }
                        return [4 /*yield*/, request.api('GET', 'location/regions?' + arrayParams.join('&'), {}, token)];
                    case 1:
                        req = _d.sent();
                        if (req.errors)
                            res.errors = res.errors.concat(req.errors);
                        else
                            res.data = req;
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Cdek_sdk.prototype.getLocationCities = function (token, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, arrayParams, _i, _a, key, arrCountry, _b, _c, c, req;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        res = { errors: [], data: {} };
                        arrayParams = [];
                        for (_i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                            key = _a[_i];
                            switch (key) {
                                case 'country_codes':
                                    arrCountry = [];
                                    for (_b = 0, _c = data.country_codes; _b < _c.length; _b++) {
                                        c = _c[_b];
                                        if (c.length !== 2) {
                                            res.errors.push(getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"));
                                            break;
                                        }
                                        else
                                            arrCountry.push(c);
                                    }
                                    if (arrCountry.length > 0)
                                        arrayParams.push('country_codes=' + arrCountry.join());
                                    break;
                                case 'kladr_region_code':
                                    if (data.kladr_region_code.length > 255)
                                        res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"));
                                    else
                                        arrayParams.push('kladr_region_code=' + data.kladr_region_code);
                                    break;
                                case 'kladr_code':
                                    if (data.kladr_code.length > 255)
                                        res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"));
                                    else
                                        arrayParams.push('kladr_code=' + data.kladr_code);
                                    break;
                                case 'postal_code':
                                    if (data.postal_code.length > 255)
                                        res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"));
                                    else
                                        arrayParams.push('postal_code=' + data.postal_code);
                                    break;
                                case 'city':
                                    if (data.city.length > 255)
                                        res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"));
                                    else
                                        arrayParams.push('city=' + data.city);
                                    break;
                                case 'page':
                                    if (!data.size)
                                        res.errors.push(getError('size обязателен если указан page'));
                                    else
                                        arrayParams.push('page=' + data.page);
                                    break;
                                case 'lang':
                                    if (data.lang.length !== 3)
                                        res.errors.push(getError("Локализация. По умолчанию 'rus':string(3)"));
                                    else
                                        arrayParams.push('lang=' + data.lang);
                                    break;
                                case 'payment_limit':
                                    if (data.payment_limit === -1 || data.payment_limit === 0 || data.payment_limit)
                                        arrayParams.push('payment_limit=' + data.payment_limit);
                                    else
                                        res.errors.push(getError("Ограничение на сумму наложенного платежа: -1 - ограничения нет; 0 - наложенный платеж не принимается; положительное значение - сумма наложенного платежа не более данного значения. Устаревшее поле"));
                                    break;
                                default:
                                    arrayParams.push(key + '=' + data[key]);
                                    break;
                            }
                        }
                        return [4 /*yield*/, request.api('GET', 'location/cities?' + arrayParams.join('&'), {}, token)];
                    case 1:
                        req = _d.sent();
                        if (req.errors)
                            res.errors = res.errors.concat(req.errors);
                        else
                            res.data = req;
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Cdek_sdk.prototype.getDeliveryPoints = function (token, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, arrayParams, _i, _a, key, arrCountry, _b, _c, c, req;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        res = { errors: [], data: {} };
                        arrayParams = [];
                        for (_i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                            key = _a[_i];
                            switch (key) {
                                case 'city_code':
                                    if (data.postal_code)
                                        res.errors.push(getError("Если одновременно указаны параметры city_code и postal_code, то для определения города всех стран присутствия СДЭК приоритет отдается city_code"));
                                    arrayParams.push('city_code=' + data.city_code);
                                    break;
                                case 'type':
                                    res.errors.push(getError("Тип офиса, может принимать значения:«PVZ» - для отображения только складов СДЭК;«POSTAMAT» - для отображения постаматов СДЭК;«ALL» - для отображения всех ПВЗ независимо от их типа.При отсутствии параметра принимается значение по умолчанию «ALL»."));
                                    switch (data.type) {
                                        case 'PVZ':
                                            arrayParams.push('type=PVZ');
                                            break;
                                        case 'POSTAMAT':
                                            arrayParams.push('type=POSTAMAT');
                                            break;
                                        default:
                                            arrayParams.push('type=ALL');
                                            break;
                                    }
                                    break;
                                case 'country_codes':
                                    arrCountry = [];
                                    for (_b = 0, _c = data.country_codes; _b < _c.length; _b++) {
                                        c = _c[_b];
                                        if (c.length !== 2) {
                                            res.errors.push(getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"));
                                            break;
                                        }
                                        else
                                            arrCountry.push(c);
                                    }
                                    if (arrCountry.length > 0)
                                        arrayParams.push('country_code=' + arrCountry.join());
                                    break;
                                case 'lang':
                                    if (data.lang.length !== 3)
                                        res.errors.push(getError("Локализация. По умолчанию 'rus':string(3)"));
                                    else
                                        arrayParams.push('lang=' + data.lang);
                                    break;
                                default:
                                    arrayParams.push(key + '=' + data[key]);
                                    break;
                            }
                        }
                        return [4 /*yield*/, request.api('GET', 'deliverypoints?' + arrayParams.join('&'), {}, token)];
                    case 1:
                        req = _d.sent();
                        if (req.errors)
                            res.errors = res.errors.concat(req.errors);
                        else
                            res.data = req;
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Cdek_sdk.prototype.calculateOnTariffList = function (token, data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = { errors: [], data: {} };
                        return [4 /*yield*/, request.api('POST', 'calculator/tarifflist', data, token)];
                    case 1:
                        req = _a.sent();
                        if (req.errors)
                            res.errors = res.errors.concat(req.errors);
                        else
                            res.data = req;
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return Cdek_sdk;
}());
exports.cdek = new Cdek_sdk();
//# sourceMappingURL=index.js.map