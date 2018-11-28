import {HTTP} from "../utils/http.js";

class ClassicModel extends HTTP{
    getLatest(sCallback){
        this.request({
            url:'classic/latest',
            method:'GET',
            success:(res)=>{
                sCallback(res)
            }
        })
    }
}

export {ClassicModel}