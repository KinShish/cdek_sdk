import rp = require('request');
interface Options{
	method:string;
	url:string;
	json:boolean;
	headers:{};
	body?:{};
	form?:{};
}
export default class RequestApi {
	async api(method:string,url:string,formData:any,token:string){
		const options:Options={
			method: method,
			url: 'https://api.edu.cdek.ru/v2/' + encodeURI(url),
			json: true,
			headers:{}
		}
		if(token){
			options.body=formData;
			options.headers={'Authorization': 'Bearer '+token}
		}else{
			options.form=formData;
			options.headers={'Content-Type':'application/x-www-form-urlencoded'}
		}
		return await new Promise((resolve)=>{
			rp(options,function (err, resp, body){
				if(err){
					resolve(err);
				}
				resolve(body);
			})
		})
	}
}
