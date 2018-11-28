import {config} from "../config";

const tips = {
    1:'抱歉,出现了一个错误',
    1005:'不正确的开发者key',
    3000:'该期内容不存在'
}

class HTTP{
    request(params){
        //url , data , method,
        if(!params.method){
            params.method = 'GET'
        }
        wx.request({
            url:config.api_base_url + params.url,
            data:params.data,
            method:params.method,
            header:{
                'content-type':'application/json',
                'appkey':config.appKey
            },
            success:(res) =>{
                let code = res.statusCode.toString()
                if(code.startsWith('2')){
                    params.success && params.success(res.data)
                }else {
                   let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail:(err) =>{
                this._show_error(1)
            }
        })
    }
    
    _show_error(error_code){
        if(!error_code){
            error_code = 1
        }
        wx.showToast({
            title:tips[error_code],
            icon:'none',
            duration:2000
        })
    }
}

export  {HTTP}