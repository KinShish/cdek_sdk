"use strict";
//const {Cdek_sdk} = require("../src");
//import {Cities} from "../src";
// @ts-check

const {cdek}=require('../index')
const fs=require('fs')
const options=require('./config/config.json')
const checkToken = async (cb,dt)=>{
	let req=await cb(options.token,dt);
	if(req.data.status===500||(req.data.requests&&req.data.requests[0].type==='AUTH'&&req.data.requests[0].state==='INVALID')||(req.errors.length>0&&req.errors[0].code==='v2_token_expired')){
		options.token=await cdek.getToken(options.auth)
		fs.writeFileSync('./config/config.json',JSON.stringify(options))
		req=await cb(options.token,dt)
	}
	return req
}

const start=async ()=>{
	//cdek.getDeliveryPoints(options.token,{weight_max:50,city_code:270,allowed_cod:1})
	//const data=await checkToken(cdek.getDeliveryPoint)
	//const www=await checkToken(cdek.getLocationRegions,{country_codes:['RU'],lang:'rus',region_code:7})
	//const req=await checkToken(cdek.getLocationCities,{country_codes:['RU'],lang:'rus',code:137})
	//const req=await checkToken(cdek.getDeliveryPoints,{weight_max:50,city_code:270,lang:'rus',allowed_cod:'1'})
	/*const req=await checkToken(cdek.calculateOnTariffList,{
		type: 2,
		//date: "2021-05-03T11:49:32+0700",
		currency: 1,
		lang: "rus",
		from_location: {code: 270},
		to_location: {code: 44},
		packages: [{height: 100,length: 100,weight: 10000,width: 10}]
	})*/
	/*const req=await checkToken(cdek.calculateOnTariff,{
		type:2,
		//"date": "2020-11-03T11:49:32+0700",
		currency:1,
		tariff_code:11,
		from_location:{code:270},
		to_location:{code:44},
		services:[{code:"DANGER_CARGO",parameter:2}],
		packages: [{height: 10,length: 10,weight: 4000,width: 10}]
	})*/
	//const req=await checkToken(cdek.calculateOnDdp,{weight: 1000,cost: '50000'})
	/*const req=await checkToken(cdek.addOrder,{
		//"number" : "AlnaCdek129786354324234",//не создовайте номер, т.к. сдек считает его не уникальным(сам создает номер равнй uuid)
		"comment" : "Новый заказ",
		"delivery_recipient_cost" : {
			"value" : 50
		},
		"delivery_recipient_cost_adv" : [ {
			"sum" : 3000,
			"threshold" : 200
		} ],
		"from_location" : {
			"code" : 44,
			"city" : "Москва",
			"address" : "пр. Ленинградский, д.4"
		},
		"to_location" : {
			"code" : 270,
			"city" : "Новосибирск",
			"address" : "ул. Блюхера, 32"
		},
		"packages" : [ {
			"number" : "bar-001",
			"comment" : "Упаковка",
			"height" : 10,
			"items" : [ {
				"ware_key" : "00055",
				"payment" : {
					"value" : 3000
				},
				"name" : "Товар",
				"cost" : 300,
				"amount" : 2,
				"weight" : 700,
				"url" : "www.item.ru"
			} ],
			"length" : 10,
			"weight" : 4000,
			"width" : 10
		} ],
		"recipient" : {
			"name" : "Иванов Иван",
			"phones" : [ {
				"number" : "+79134637228"
			} ]
		},
		"sender" : {
			"name" : "Петров Петр"
		},
		"services" : [ {
			"code" : "DELIV_WEEKEND"
		} ],
		"tariff_code" : 137
	})
	console.log(req)
	//if(req.errors.length===0){*/
		//const req2=await checkToken(cdek.getOrder,{uuid:'72753031-700d-42a8-8fef-1b6dc706aaa1'})
		//console.log(req2)
	//}
	/*const req=await checkToken(cdek.editOrder,{
		//"uuid":"72753031-700d-42a8-8fef-1b6dc706aaa1",//Нет ни каких приоритетов я проверял указывайте один из элеиентов
		"cdek_number":"1105358717",
		"tariff_code":"233",
		"sender":{
			"company":"Pogoda",
			"name":"Петров Петр",
			"email":"react@cdek.ru",
			"phones":[
				{
					"number":"+79134637228",
					"additional":"1234"
				}
			]
		},
		"recipient":{
			"company":"NUMM",
			"name":"Константинов Константин",
			"email":"pochta@gmail.com",
			"phones":[
				{
					"number":"+79134635628",
					"additional":"123"
				}
			]
		},
		"to_location":{
			"code" : "270",
			"fias_guid" : "",
			"postal_code" : "",
			"longitude" : "",
			"latitude" : "",
			"country_code" : "",
			"region" : "",
			"sub_region" : "",
			"city" : "Новосибирск",
			"kladr_code" : "",
			"address" : "ул. Блюхера, 32"
		},
		"from_location":{
			"city" : "Новосибирск",
			"address" : "пр. Ленинградский, д.4"
		},
		"services":[
			{
				"code":"DANGER_CARGO"
			},
			{
				"code":"PACKAGE_1",
				"parameter":"1"
			}
		],
		"packages":[
			{
				"number":"bar-666",
				"height":20,
				"length":20,
				"weight":4000,
				"width":20,
				"items":[
					{
						"name":"Товар",
						"ware_key":"00055",
						"payment":{
							"value":3000
						},
						"cost":300,
						"amount":1,
						"weight":700
					}
				]
			}
		]
	})
	//*/
	//console.log(req)
	//const req2=await checkToken(cdek.deleteOrder,{uuid:'72753031-df71-417e-9619-7e54568a2c57'})
	//const req2=await checkToken(cdek.refusalOrder,{uuid:'72753031-700d-42a8-8fef-1b6dc706aaa1'})
	//console.log(req2)
	const req2=await checkToken(cdek.getOrder,{uuid:'72753031-df71-417e-9619-7e54568a2c57'})
	console.log(req2,req2.data.statuses)



}
start()
	.then()
	.catch(err=>console.log(err))
