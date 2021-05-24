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
	url:string;
	getUrl(test:boolean){
		this.url=test?'https://api.edu.cdek.ru/v2/':'https://api.cdek.ru/v2/'
	};
	async api(method:string,url:string,formData:any,token:string){
		this.url=this.url===undefined?'https://api.edu.cdek.ru/v2/':this.url;
		const options:Options={
			method: method,
			url: this.url + encodeURI(url),
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
		console.log(this.url)
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
