import {config} from "../config";

const tips = {
    1:'抱歉,出现了一个错误',
    1005:'不正确的开发者key',
    3000:'该期内容不存在'
}

class HTTP{
    //#解构
    request({url,data={},method='GET'}){
        return new Promise((resolve, reject)=>{
            this._request(url,resolve,reject,data,method)
        })
    }
    
    _request(url,resolve,reject,data={},method='GET'){
        //url , data , method,
        wx.request({
            url:config.api_base_url + url,
            data:data,
            method:method,
            header:{
                'content-type':'application/json',
                'appkey':config.appKey
            },
            success:(res) =>{
                let code = res.statusCode.toString()
                if(code.startsWith('2')){
                    resolve(res.data)
                }else {
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail:(err) =>{
                reject()
                this._show_error(1)
            }
        })
    }
    
    _show_error(error_code){
        if(!error_code){
            error_code = 1
        }
      const tip = tips[error_code]
        wx.showToast({
          title: tip ?tip:tips[1],
            icon:'none',
            duration:2000
        })
    }
}

export  {HTTP}