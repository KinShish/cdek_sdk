import RequestApi from './request/cdek'
import Change from './change'
import * as DataForRequest from './interface/dataForRequest'
const change= new Change();
const request= new RequestApi();

const formationResponse=async (method,url,data,token)=>{
	const res={errors:[],warnings:[],data:{},state:''};
	const req:AddRequest= await request.api(method,url,data,token)
	req.requests.sort((a:Errors,b:Errors)=>{return new Date(b.date_time).getTime() - new Date(a.date_time).getTime()})
	console.log(req.requests)
	if(req.entity) res.data=req.entity
	if(req.requests[0].state) res.state=req.requests[0].state
	if(req.requests[0].errors) res.errors=res.errors.concat(req.requests[0].errors)
	if(req.requests[0].warnings) res.warnings=res.warnings.concat(req.requests[0].warnings)
	return res
}
export interface Login {
	account: string;
	secret: string;
}
interface errors{
	code:string;
	message:string;
}
interface warnings{
	code:string;
	message:string;
}
interface Errors{
	state?:string;
	date_time?:string;
	errors?:errors[];
	warnings?:warnings[];
}
interface AddRequest{
	entity?:{
		uuid:string;
	}
	requests?:[Errors]
}

class Cdek_sdk {
	getTestServer(test:boolean){
		request.getUrl(test)
	}
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
		const res={errors:[],data:{},state:''};
		const arrayParams=[];
		for(let key of Object.keys(data)){
			switch (key) {
				case 'country_codes':
					const arrCountry=[]
					for(let c of data.country_codes){
						if(c.length!==2){
							res.errors.push(change.getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"))
							break;
						} else arrCountry.push(c)
					}
					if(arrCountry.length>0) arrayParams.push('country_codes='+arrCountry.join())
					break
				case 'kladr_region_code':
					if(data.kladr_region_code.length>255) res.errors.push(change.getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('kladr_region_code='+data.kladr_region_code)
					break
				case 'page':
					if(!data.size) res.errors.push(change.getError('size обязателен если указан page'))
					else arrayParams.push('page='+data.page)
					break
				case 'lang':
					if(data.lang.length!==3) res.errors.push(change.getError("Локализация. По умолчанию 'rus':string(3)"))
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
							res.errors.push(change.getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"))
							break;
						} else arrCountry.push(c)
					}
					if(arrCountry.length>0) arrayParams.push('country_codes='+arrCountry.join())
					break
				case 'kladr_region_code':
					if(data.kladr_region_code.length>255) res.errors.push(change.getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('kladr_region_code='+data.kladr_region_code)
					break
				case 'kladr_code':
					if(data.kladr_code.length>255) res.errors.push(change.getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('kladr_code='+data.kladr_code)
					break
				case 'postal_code':
					if(data.postal_code.length>255) res.errors.push(change.getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('postal_code='+data.postal_code)
					break
				case 'city':
					if(data.city.length>255) res.errors.push(change.getError("Код КЛАДР региона Устаревшее поле:string(255)"))
					else arrayParams.push('city='+data.city)
					break
				case 'page':
					if(!data.size) res.errors.push(change.getError('size обязателен если указан page'))
					else arrayParams.push('page='+data.page)
					break
				case 'lang':
					if(data.lang.length!==3) res.errors.push(change.getError("Локализация. По умолчанию 'rus':string(3)"))
					else arrayParams.push('lang='+data.lang)
					break
				case 'payment_limit':
					if(data.payment_limit===-1||data.payment_limit===0||data.payment_limit) arrayParams.push('payment_limit='+data.payment_limit)
					else res.errors.push(change.getError("Ограничение на сумму наложенного платежа: -1 - ограничения нет; 0 - наложенный платеж не принимается; положительное значение - сумма наложенного платежа не более данного значения. Устаревшее поле"))
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
					if(data.postal_code) res.errors.push(change.getError("Если одновременно указаны параметры city_code и postal_code, то для определения города всех стран присутствия СДЭК приоритет отдается city_code"))
					arrayParams.push('city_code='+data.city_code)
					break
				case 'type':
					res.errors.push(change.getError("Тип офиса, может принимать значения:«PVZ» - для отображения только складов СДЭК;«POSTAMAT» - для отображения постаматов СДЭК;«ALL» - для отображения всех ПВЗ независимо от их типа.При отсутствии параметра принимается значение по умолчанию «ALL»."))
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
							res.errors.push(change.getError("Массив кодов стран в формате  ISO_3166-1_alpha-2:string(2)[]"))
							break;
						} else arrCountry.push(c)
					}
					if(arrCountry.length>0) arrayParams.push('country_code='+arrCountry.join())
					break
				case 'lang':
					if(data.lang.length!==3) res.errors.push(change.getError("Локализация. По умолчанию 'rus':string(3)"))
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
	async calculateOnTariffList(token,data:DataForRequest.TariffList){
		const res={errors:[],data:{}};
		if(data.type&&!(data.type==1||data.type==2)){
			res.errors.push(change.getError("Тип заказа:1 - интернет-магазин; 2 - доставка; По умолчанию - 1"))
			data.type=1;
		}
		if(data.lang){
			if(data.lang.length!==3){
				res.errors.push(change.getError("Локализация. По умолчанию 'rus':string(3)"))
				data.lang='rus'
			}
		}
		change.changeLocation(data.from_location,res)
		change.changeLocation(data.to_location,res)
		change.changePackages(data.packages,res)
		const req:Errors= await request.api('POST','calculator/tarifflist',data,token)
		if(req.errors)res.errors=res.errors.concat(req.errors)
		else res.data=req
		return res
	}
	async calculateOnTariff(token,data:DataForRequest.Tariff){
		const res={errors:[],data:{}};
		if(data.type&&!(data.type==1||data.type==2)){
			res.errors.push(change.getError("Тип заказа:1 - интернет-магазин; 2 - доставка; По умолчанию - 1"))
			data.type=1;
		}
		change.changeLocation(data.from_location,res)
		change.changeLocation(data.to_location,res)
		change.changeServices(data.services,res)
		change.changePackages(data.packages,res)
		const req:Errors= await request.api('POST','calculator/tariff',data,token)
		if(req.errors)res.errors=res.errors.concat(req.errors)
		else res.data=req
		return res
	}
	async calculateOnDdp(token,data:DataForRequest.Ddp){
		const res={errors:[],data:{}};
		const req:Errors= await request.api('POST','ddp',data,token)
		if(req.errors)res.errors=res.errors.concat(req.errors)
		else res.data=req
		return res
	}
	async getOrder(token,data:{uuid:string}){
		return await formationResponse('GET','orders/'+data.uuid,{},token)
	}
	async addOrder(token,data:DataForRequest.Order){
		const res={errors:[],data:{}};
		if(data.type&&!(data.type==1||data.type==2)){
			res.errors.push(change.getError("Тип заказа:1 - интернет-магазин; 2 - доставка; По умолчанию - 1"))
			data.type=1;
		}
		if(data.number){
			if(data.number.length>40){
				res.errors.push(change.getError("Номер заказа в ИС Клиента (если не передан, будет присвоен номер заказа в ИС СДЭК - uuid) " +
					"Только для заказов 'интернет-магазин' " +
					"Может содержать только цифры, буквы латинского алфавита или спецсимволы (формат ASCII):string(40)"))
				data.number=data.number.substr(0, 40)
			}
		}
		if(!data.tariff_code){
			res.errors.push(change.getError("Обязательно должен быть код тарифа: integer"))
		}
		if(data.comment){
			if(data.comment.length>255){
				res.errors.push(change.getError("Комментарий к заказу:string(255)"))
				data.comment=data.comment.substr(0, 255)
			}
		}
		if(data.shipment_point&&data.from_location){
			res.errors.push(change.getError("Код ПВЗ СДЭК, на который будет производиться самостоятельный привоз клиентом " +
				"Не может использоваться одновременно с from_location"))
		}
		if(data.delivery_point&&data.to_location){
			res.errors.push(change.getError("Код ПВЗ СДЭК, на который будет доставлена посылка " +
				"Не может использоваться одновременно с to_location"))
		}
		if(data.type==2&&data.date_invoice){
			res.errors.push(change.getError("Дата инвойса Только для заказов 'интернет-магазин'"))
		}
		if(data.type==2&&data.shipper_name){
			res.errors.push(change.getError("Грузоотправитель Только для заказов 'интернет-магазин'"))
		}
		if(data.type==2&&data.shipper_address){
			res.errors.push(change.getError("Адрес грузоотправителя Только для заказов 'интернет-магазин'"))
		}
		change.changeMoney(data.delivery_recipient_cost,res)
		change.changeThreshold(data.delivery_recipient_cost_adv,res)
		change.changeContact(data.sender,res)
		change.changeSeller(data.seller,res)
		change.changeContact(data.recipient,res)
		change.changeLocation(data.from_location,res)
		change.changeLocation(data.to_location,res)
		change.changeServices(data.services,res)
		change.changePackages(data.packages,res)
		if(data.print){
			if(data.print.length===7){
				res.errors.push(change.getError("Необходимость сформировать печатную форму по заказу Может принимать значения:" +
					" barcode - ШК мест (число копий - 1) waybill - квитанция (число копий - 2):string(7)"))
				data.print=data.print.substr(0, 7)
			}else{
				if(!(data.print==='barcode'||data.print==='waybill')){
					res.errors.push(change.getError("print должен иметь значение barcode или waybill"))
				}
			}
		}
		const req:AddRequest= await request.api('POST','orders',data,token)
		if(req.entity) res.data=req.entity
		if(req.requests[0].errors) res.errors=res.errors.concat(req.requests[0].errors)
		return res
	}
	async editOrder(token,data:DataForRequest.EditOrder){
		const res={errors:[],data:{},state:''};
		if(data.cdek_number){
			if(data.uuid){
				res.errors.push(change.getError("Идентификация заказа происходит по указанным полям (в приоритете cdek_number)."))
			}
		}
		if(data.number){
			if(data.number.length>40){
				res.errors.push(change.getError("Номер заказа в ИС Клиента (если не передан, будет присвоен номер заказа в ИС СДЭК - uuid) " +
					"Только для заказов 'интернет-магазин' " +
					"Может содержать только цифры, буквы латинского алфавита или спецсимволы (формат ASCII):string(40)"))
				data.number=data.number.substr(0, 40)
			}
		}
		if(!data.uuid&&!data.cdek_number){
			res.errors.push(change.getError("Обязательно должен быть uuid или cdek_number"))
		}
		if(data.comment){
			if(data.comment.length>255){
				res.errors.push(change.getError("Комментарий к заказу:string(255)"))
				data.comment=data.comment.substr(0, 255)
			}
		}
		if(data.shipment_point&&data.from_location){
			res.errors.push(change.getError("Код ПВЗ СДЭК, на который будет производиться самостоятельный привоз клиентом " +
				"Не может использоваться одновременно с from_location"))
		}
		if(data.delivery_point&&data.to_location){
			res.errors.push(change.getError("Код ПВЗ СДЭК, на который будет доставлена посылка " +
				"Не может использоваться одновременно с to_location"))
		}
		if(data.type==2&&data.date_invoice){
			res.errors.push(change.getError("Дата инвойса Только для заказов 'интернет-магазин'"))
		}
		if(data.type==2&&data.shipper_name){
			res.errors.push(change.getError("Грузоотправитель Только для заказов 'интернет-магазин'"))
		}
		if(data.type==2&&data.shipper_address){
			res.errors.push(change.getError("Адрес грузоотправителя Только для заказов 'интернет-магазин'"))
		}
		change.changeMoney(data.delivery_recipient_cost,res)
		change.changeThreshold(data.delivery_recipient_cost_adv,res)
		change.changeContact(data.sender,res)
		change.changeSeller(data.seller,res)
		change.changeContact(data.recipient,res)
		change.changeLocation(data.from_location,res)
		change.changeLocation(data.to_location,res)
		change.changeServices(data.services,res)
		change.changePackages(data.packages,res)
		if(data.print){
			if(data.print.length===7){
				res.errors.push(change.getError("Необходимость сформировать печатную форму по заказу Может принимать значения:" +
					" barcode - ШК мест (число копий - 1) waybill - квитанция (число копий - 2):string(7)"))
				data.print=data.print.substr(0, 7)
			}else{
				if(!(data.print==='barcode'||data.print==='waybill')){
					res.errors.push(change.getError("print должен иметь значение barcode или waybill"))
				}
			}
		}
		const req:AddRequest= await request.api('PATCH','orders',data,token)
		if(req.entity) res.data=req.entity
		if(req.requests[0].state) res.state=req.requests[0].state
		if(req.requests[0].errors) res.errors=res.errors.concat(req.requests[0].errors)
		return res
	}//На CDEK редактирование работает голимо, точнее я так и не смог отредактировать заказ
	async deleteOrder(token,data:{uuid:string}){
		return await formationResponse('DELETE','orders/'+data.uuid,{},token)
	}
	async refusalOrder(token,data:{uuid:string}){
		return await formationResponse('POST','orders/'+data.uuid+'/refusal',{},token)
	}

}
export const cdek= new Cdek_sdk()

