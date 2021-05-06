"use strict";
//const {Cdek_sdk} = require("../src");
//import {Cities} from "../src";
// @ts-check

const {cdek}=require('../index')
const fs=require('fs')
const options=require('./config/config.json')
const checkToken = async (cb,dt)=>{
	let req=await cb(options.token,dt);
	if(req.data.status===500||(req.data.requests&&req.data.requests[0].type==='AUTH'&&req.data.requests[0].state==='INVALID')){
		options.token=await cdek.getToken(options.auth)
		fs.writeFileSync('./config/config.json',JSON.stringify(options))
		req=await cb(options.token,dt)
	}
	return req
}

const start=async ()=>{
	//cdek.getDeliveryPoints(options.token,{weight_max:50,city_code:270,allowed_cod:1})
	//const data=await checkToken(cdek.getDeliveryPoint)
	//const req=await checkToken(cdek.getLocationRegions,{country_codes:['RU'],lang:'rus',region_code:7}
	//const req=await checkToken(cdek.getLocationCities,{country_codes:['RU'],lang:'rus',city:"славянск-на-кубани"})
	//const req=await checkToken(cdek.getDeliveryPoints,{weight_max:50,city_code:270,lang:'rus',allowed_cod:'1'})
	const req=await checkToken(cdek.calculateOnTariffList,{
		type: 1,
		date: "2021-11-03T11:49:32+0700",
		currency: 1,
		lang: "rus",
		from_location: {
			code: 270
		},
		to_location: {
			code: 44
		},
		packages: [
			{
				height: 10,
				length: 10,
				weight: 4000,
				width: 10
			}
		]
	})
	console.log(req)
}
start()
	.then()
	.catch(err=>console.log(err))
