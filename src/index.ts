import RequestApi from './request/cdek'
import * as DataForRequest from './interface/dataForRequest'

let request= new RequestApi();

export interface Login {
	account: string;
	secret: number;
}
interface errors{
	code:string;
	message:string;
}
function getError(message){
	return {code:"cdek_sdk_invalid_format",message}
}
interface Errors{
	errors?:errors[]
}
class Cdek_sdk {
	async getToken(login:Login){
		const oath:any=await request.api('POST','oauth/token?parameters',{
			grant_type:'client_credentials',
			client_id:login.account,
			client_secret:login.secret
		},'')
		console.log("Новый токен:"+oath.access_token)
		if(oath.access_token){
			return oath.access_token
		}
		return oath
	}
	async getLocationRegions(token:string,data: DataForRequest.Regions){
		const res={errors:[],data:{}};
		const arrayParams=[];
		for(let key of Object.keys(data)){
			switch (key) {
				case 'country_codes':
					const arrCountry=[]
					for(let c of data.country_codes){
						if(c.length!==2){
							res.errors.push(getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"))
							break;
						} else arrCountry.push(c)
					}
					if(arrCountry.length>0) arrayParams.push('country_codes='+arrCountry.join())
					break
				case 'kladr_region_code':
					if(data.kladr_region_code.length>255) res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('kladr_region_code='+data.kladr_region_code)
					break
				case 'page':
					if(!data.size) res.errors.push(getError('size обязателен если указан page'))
					else arrayParams.push('page='+data.page)
					break
				case 'lang':
					if(data.lang.length!==3) res.errors.push(getError("Локализация. По умолчанию 'rus':string(3)"))
					else arrayParams.push('lang='+data.lang)
					break
				default:
					arrayParams.push(key+'='+data[key])
					break
			}
		}
		const req:Errors=await request.api('GET','location/regions?'+arrayParams.join('&'), {},token)
		if(req.errors)res.errors=res.errors.concat(req.errors)
		else res.data=req
		return res
	}
	async getLocationCities(token:string,data:DataForRequest.Cities){
		const res={errors:[],data:{}};
		const arrayParams=[];
		for(let key of Object.keys(data)){
			switch (key) {
				case 'country_codes':
					const arrCountry=[]
					for(let c of data.country_codes){
						if(c.length!==2){
							res.errors.push(getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"))
							break;
						} else arrCountry.push(c)
					}
					if(arrCountry.length>0) arrayParams.push('country_codes='+arrCountry.join())
					break
				case 'kladr_region_code':
					if(data.kladr_region_code.length>255) res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('kladr_region_code='+data.kladr_region_code)
					break
				case 'kladr_code':
					if(data.kladr_code.length>255) res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('kladr_code='+data.kladr_code)
					break
				case 'postal_code':
					if(data.postal_code.length>255) res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('postal_code='+data.postal_code)
					break
				case 'city':
					if(data.city.length>255) res.errors.push(getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('city='+data.city)
					break
				case 'page':
					if(!data.size) res.errors.push(getError('size обязателен если указан page'))
					else arrayParams.push('page='+data.page)
					break
				case 'lang':
					if(data.lang.length!==3) res.errors.push(getError("Локализация. По умолчанию 'rus':string(3)"))
					else arrayParams.push('lang='+data.lang)
					break
				case 'payment_limit':
					if(data.payment_limit===-1||data.payment_limit===0||data.payment_limit) arrayParams.push('payment_limit='+data.payment_limit)
					else res.errors.push(getError("Ограничение на сумму наложенного платежа: -1 - ограничения нет; 0 - наложенный платеж не принимается; положительное значение - сумма наложенного платежа не более данного значения. Устаревшее поле"))
					break
				default:
					arrayParams.push(key+'='+data[key])
					break
			}
		}
		const req:Errors=await request.api('GET','location/cities?'+arrayParams.join('&'), {},token)
		if(req.errors)res.errors=res.errors.concat(req.errors)
		else res.data=req
		return res
	}
	async getDeliveryPoints(token:string,data:DataForRequest.DeliveryPoints){
		const res={errors:[],data:{}};
		const arrayParams=[];
		for(let key of Object.keys(data)){
			switch (key) {
				case 'city_code':
					if(data.postal_code) res.errors.push(getError("Если одновременно указаны параметры city_code и postal_code, то для определения города всех стран присутствия СДЭК приоритет отдается city_code"))
					arrayParams.push('city_code='+data.city_code)
					break
				case 'type':
					res.errors.push(getError("Тип офиса, может принимать значения:«PVZ» - для отображения только складов СДЭК;«POSTAMAT» - для отображения постаматов СДЭК;«ALL» - для отображения всех ПВЗ независимо от их типа.При отсутствии параметра принимается значение по умолчанию «ALL»."))
					switch (data.type){
						case 'PVZ':
							arrayParams.push('type=PVZ')
							break
						case 'POSTAMAT':
							arrayParams.push('type=POSTAMAT')
							break
						default:
							arrayParams.push('type=ALL')
							break
					}
					break
				case 'country_codes':
					const arrCountry=[]
					for(let c of data.country_codes){
						if(c.length!==2){
							res.errors.push(getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"))
							break;
						} else arrCountry.push(c)
					}
					if(arrCountry.length>0) arrayParams.push('country_code='+arrCountry.join())
					break
				case 'lang':
					if(data.lang.length!==3) res.errors.push(getError("Локализация. По умолчанию 'rus':string(3)"))
					else arrayParams.push('lang='+data.lang)
					break
				default:
					arrayParams.push(key+'='+data[key])
					break
			}
		}
		const req:Errors=await request.api('GET','deliverypoints?'+arrayParams.join('&'), {},token);
		if(req.errors)res.errors=res.errors.concat(req.errors)
		else res.data=req
		return res
	}

	public async calculateOnTariffList(token,data:DataForRequest.TariffLis){
		const res={errors:[],data:{}};
		const req:Errors= await request.api('POST','calculator/tarifflist',data,token)
		if(req.errors)res.errors=res.errors.concat(req.errors)
		else res.data=req
		return res
	}
	/*addOrder:async (token,data)=>{

		/*
			data:{
				//type:integer,
				//number:string(40),
				tariff_code:integer,
				//comment:string(255),
				//developer_key:string()                //Ключ разработчика,
				//shipment_point:string(255),           //!from_location
				delivery_point:string(255),             //!to_location
				//date_invoice:date (yyyy-MM-dd),       //MN
				//shipper_name:string(255),             //MN
				//shipper_address:string(255),          //MN
				//delivery_recipient_cost:{             //money
					value:float,
					//vat_sum:float,
					//vat_rate:integer
				},
				//delivery_recipient_cost_adv:{         //threshold[]
					threshold:integer
					sum:float,
					//vat_sum:float,
					//vat_rate:integer
				},
				sender:{                                //contact
					company:string(255),
					name:string(255),
					email:string(255),
					phones:{                            //phone[]
						number:string(255),
						//additional:string(255)
					}
				},
				//seller:{                              //seller  MN
					//name:string(255),                 //!inn
					//inn:string(12),
					//phone:string(255),                //!inn
					//ownership_form:integer,           //!inn
					//address:string(255)               //MN
				},
				recipient:{                             //contact
					//company:string(255),
					name:string(255),
					//passport_series:string(4),
					//passport_number:string(30),
					//passport_date_of_issue:date (yyyy-MM-dd),
					//passport_organization:string(255),
					//tin:string(12),
					//passport_date_of_birth:date (yyyy-MM-dd),
					//email:string(255),
					phones:{                            //phone[]
						number:string(255),
						//additional:string(255)
					}
				},
				//from_location:{                       //location
					//code:integer,
					//fias_guid:UUID,
					//postal_code:string(255),
					//longitude:float,
					//latitude:float,
					//country_code:string(2),
					//region:string(255),
					//region_code:integer,
					//sub_region:string(255),
					//city:string(255),
					//kladr_code:string(255),
					address:string(255)
				},
				//to_location:{                       //location
					//code:integer,
					//fias_guid:UUID,
					//postal_code:string(255),
					//longitude:float,
					//latitude:float,
					//country_code:string(2),
					//region:string(255),
					//region_code:integer,
					//sub_region:string(255),
					//city:string(255),
					//kladr_code:string(255),
					address:string(255)
				},
				//services:{                        //service[]
					code:string(16),
					//parameter:float
				},
				packages:{                          //package[]
					number:string(20),
					weight:integer,
					length:integer,                 //(length&&height&&width)||weight>=100
					width:integer,                  //(length&&height&&width)||weight>=100
					height:integer,                 //(length&&height&&width)||weight>=100
					//comment:string(255),
					items:{                         //item[]
						name:string(255),
						ware_key:string(50),        // [A-z А-я 0-9 ! @ " # № $ ; % ^ : & ? * () _ - + = ? < > , .{ } [ ] \ / , пробел]
						//marking:string(),
						payment:{                   //money
							value:float,
							//vat_sum:float,
							//vat_rate:integer
						},
						cost:float,
						weight:integer,
						//weight_gross,             //MN
						amount:integer,
						//name_i18n:string(255),
						//brand:string(255),
						//country_code:string(2),   //ISO_3166-1_alpha-2
						//material:integer,
						//wifi_gsm:boolean,
						//url:string(255),
						//print:string(7)           //[barcode,waybill]
					}
				}
			}

		return await request.api('GET','orders/72753033-1cf5-447c-a420-c29f4b488ac6',{},token)

	},*/
}
export const cdek= new Cdek_sdk()

