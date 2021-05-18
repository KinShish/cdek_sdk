"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_codes = ['INSURANCE', 'DELIV_WEEKEND', 'TAKE_SENDER', 'DELIV_RECEIVER', 'TRYING_ON', 'PART_DELIV', 'INSPECTION_CARGO',
    'REVERSE', 'DANGER_CARGO', 'PACKAGE_1', 'PACKAGE_2', 'WAIT_FOR_RECEIVER', 'WAIT_FOR_SENDER', 'REPEATED_DELIVERY', 'SMS',
    'GET_UP_FLOOR_BY_HAND', 'GET_UP_FLOOR_BY_ELEVATOR', 'CALL', 'THERMAL_MODE'];
var Change = /** @class */ (function () {
    function Change() {
    }
    Change.prototype.getError = function (message) {
        return { code: "cdek_sdk_invalid_format", message: message };
    };
    ;
    Change.prototype.changeServices = function (data, res) {
        if (data) {
            for (var i in data) {
                if (!data[i].code) {
                    res.errors.push(this.getError("Должен быть обязательно:string code"));
                    break;
                }
                else {
                    if (!service_codes.includes(data[i].code)) {
                        res.errors.push(this.getError("Дополнительные услигу должны точно совпадать:string code"));
                    }
                }
            }
        }
    };
    ;
    Change.prototype.changeItems = function (data, res) {
        if (data) {
            for (var i in data) {
                if (!data[i].name || !data[i].ware_key || !data[i].cost || !data[i].weight || !data[i].amount) {
                    res.errors.push(this.getError("Должены быть обязательно name,ware_key,cost,weight,amount"));
                }
                if (data[i].name && data[i].name.length > 255) {
                    res.errors.push(this.getError("Наименование товара (может также содержать описание товара: размер, цвет):string(255)"));
                    data[i].name = data[i].name.substr(0, 255);
                }
                if (data[i].ware_key && data[i].ware_key.length > 50) {
                    res.errors.push(this.getError("Идентификатор/артикул товара Артикул товара может содержать только символы:" +
                        " [A-z А-я 0-9 ! @ \" # № $ ; % ^ : & ? * () _ - + = ? < > , .{ } [ ] \\ / , пробел]:string(50)"));
                    data[i].ware_key = data[i].ware_key.substr(0, 50);
                }
                this.changeMoney(data[i].payment, res);
                if (data[i].name_i18n && data[i].name_i18n.length > 255) {
                    res.errors.push(this.getError("Наименование на иностранном языке:string(255)"));
                    data[i].name_i18n = data[i].name_i18n.substr(0, 255);
                }
                if (data[i].brand && data[i].brand.length > 255) {
                    res.errors.push(this.getError("Наименование на иностранном языке:string(255)"));
                    data[i].brand = data[i].brand.substr(0, 255);
                }
                if (data[i].country_code && data[i].country_code.length !== 2) {
                    res.errors.push(this.getError("Код страны производителя товара в формате  ISO_3166-1_alpha-2 По умолчанию ru"));
                    data[i].country_code = 'ru';
                }
                if (data[i].url && data[i].url.length > 255) {
                    res.errors.push(this.getError("\tСсылка на сайт интернет-магазина с описанием товара:string(255)"));
                    data[i].url = data[i].url.substr(0, 255);
                }
            }
        }
    };
    ;
    Change.prototype.changePackages = function (data, res) {
        if (data) {
            for (var i in data) {
                if (!data[i].number || !data[i].weight) {
                    res.errors.push(this.getError("Должены быть обязательно number,weight"));
                }
                if (data[i].length || data[i].width || data[i].height || data[i].weight >= 100) {
                    if (!data[i].length || !data[i].width || !data[i].height)
                        res.errors.push(this.getError("Усли указаны остальные габариты, заказ до постамата или общий вес >=100 гр. Обязательны width,length,height"));
                }
                if (data[i].number && data[i].number.length > 20) {
                    res.errors.push(this.getError("Должен быть обязательно:string(20) number"));
                }
                if (data[i].comment && data[i].comment.length > 255) {
                    res.errors.push(this.getError("Комментарий к упаковке:string(255)"));
                    data[i].comment = data[i].comment.substr(0, 255);
                }
                this.changeItems(data[i].items, res);
            }
        }
    };
    ;
    Change.prototype.changeLocation = function (data, res) {
        if (data) {
            if (!data.code && !data.postal_code && !data.country_code && !data.city && !data.address) {
                res.errors.push(this.getError("Должен быть хотя бы один из: code,postal_code,country_code,country_code,city,address"));
            }
            if (data.postal_code) {
                if (data.postal_code.length > 255) {
                    res.errors.push(this.getError("Почтовый индекс:string(255)"));
                    data.postal_code = data.postal_code.substr(0, 255);
                }
            }
            if (data.country_code) {
                if (data.country_code.length !== 2) {
                    res.errors.push(this.getError("Код страны в формате ISO_3166-1_alpha-2:string(2); По умолчанию ru"));
                    data.country_code = 'ru';
                }
            }
            if (data.region) {
                if (data.region.length > 255) {
                    res.errors.push(this.getError("Название региона:string(255)"));
                    data.region = data.region.substr(0, 255);
                }
            }
            if (data.sub_region) {
                if (data.sub_region.length > 255) {
                    res.errors.push(this.getError("Название района региона:string(255)"));
                    data.sub_region = data.sub_region.substr(0, 255);
                }
            }
            if (data.city) {
                if (data.city.length > 255) {
                    res.errors.push(this.getError("Название города:string(255)"));
                    data.city = data.city.substr(0, 255);
                }
            }
            if (data.kladr_code) {
                if (data.kladr_code.length > 255) {
                    res.errors.push(this.getError("Код КЛАДР:string(255)"));
                    data.kladr_code = data.kladr_code.substr(0, 255);
                }
            }
            if (data.address) {
                if (data.address.length > 255) {
                    res.errors.push(this.getError("Почтовый индекс:string(255)"));
                    data.address = data.address.substr(0, 255);
                }
            }
        }
    };
    ;
    Change.prototype.changeMoney = function (data, res) {
        if (data) {
            if (!data.value) {
                res.errors.push(this.getError("Доп. сбор за доставку, которую ИМ берет с получателя. Только для заказов 'интернет-магазин: float"));
            }
        }
    };
    ;
    Change.prototype.changeThreshold = function (data, res) {
        if (data) {
            for (var i in data) {
                if (!data[i].threshold) {
                    res.errors.push(this.getError("Доп. сбор за доставку товаров, общая стоимость которых попадает в интервал: integer"));
                    break;
                }
            }
        }
    };
    ;
    Change.prototype.changePhones = function (data, res) {
        if (data) {
            for (var i in data) {
                if (!data[i].number) {
                    res.errors.push(this.getError("Должен быть указан phone.number:string(255)"));
                }
                if (data[i].number && data[i].number.length > 255) {
                    res.errors.push(this.getError("Номер телефона Должен передаваться в международном формате: код страны (для России +7) и сам номер (10 и более цифр):string(255)"));
                    data[i].number = data[i].number.substr(0, 255);
                }
                if (data[i].additional && data[i].additional.length > 255) {
                    res.errors.push(this.getError("Дополнительная информация (добавочный номер):string(255)"));
                    data[i].additional = data[i].additional.substr(0, 255);
                }
            }
        }
    };
    ;
    Change.prototype.changeContact = function (data, res) {
        if (data) {
            if (data.company) {
                if (data.company.length > 255) {
                    res.errors.push(this.getError("Название компании:string(255)"));
                    data.company = data.company.substr(0, 255);
                }
            }
            if (!data.name) {
                res.errors.push(this.getError("обязательно должно быть указано contact.name"));
            }
            if (data.name) {
                if (data.name.length > 255) {
                    res.errors.push(this.getError("ФИО контактного лица:string(255)"));
                    data.name = data.name.substr(0, 255);
                }
            }
            if (data.passport_series) {
                if (data.passport_series.length !== 4) {
                    res.errors.push(this.getError("Серия паспорта:string(4)"));
                    data.passport_series = data.passport_series.substr(0, 4);
                }
            }
            if (data.passport_number) {
                if (data.passport_number.length > 30) {
                    res.errors.push(this.getError("Номер паспорта:string(30)"));
                    data.passport_number = data.passport_number.substr(0, 30);
                }
            }
            if (data.passport_organization) {
                if (data.passport_organization.length > 255) {
                    res.errors.push(this.getError("Номер паспорта:string(255)"));
                    data.passport_organization = data.passport_organization.substr(0, 255);
                }
            }
            if (data.tin) {
                if (data.tin && !(data.tin.length == 10 || data.tin.length == 12))
                    res.errors.push(this.getError("ИНН Может содержать 10, либо 12 символов"));
            }
            if (data.email) {
                if (data.email.length > 255) {
                    res.errors.push(this.getError("Эл. адрес:string(255)"));
                    data.email = data.email.substr(0, 255);
                }
            }
            this.changePhones(data.phones, res);
        }
    };
    ;
    Change.prototype.changeSeller = function (data, res) {
        if (data) {
            if (data.name) {
                if (data.name.length > 255) {
                    res.errors.push(this.getError("Наименование истинного продавца:string(255)"));
                    data.name = data.name.substr(0, 255);
                }
            }
            if (data.phone) {
                if (data.phone.length > 255) {
                    res.errors.push(this.getError("Телефон истинного продавца:string(255)"));
                    data.phone = data.phone.substr(0, 255);
                }
            }
            if (data.inn) {
                if (data.inn && !(data.inn.length == 10 || data.inn.length == 12))
                    res.errors.push(this.getError("ИНН истинного продавца Может содержать 10, либо 12 символов:string(12)"));
                if (!data.name || !data.phone || !data.ownership_form)
                    res.errors.push(this.getError("Должен быть seller.name,seller.phone,seller.ownership_form если указан seller.inn"));
            }
            if (data.address) {
                if (data.address.length > 255) {
                    res.errors.push(this.getError("Адрес истинного продавца. Используется при печати инвойсов для отображения адреса настоящего продавца товара, либо торгового названия.:string(255)"));
                    data.address = data.address.substr(0, 255);
                }
            }
        }
    };
    ;
    return Change;
}());
exports.default = Change;
//# sourceMappingURL=change.js.map