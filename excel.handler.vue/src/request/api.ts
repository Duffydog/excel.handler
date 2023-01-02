import {get,post,filePost} from './http'

const api = {
    test:() => get('/'),
    uploadExcel:(params:any) => filePost('/uploadExcel',params)
}

export default api;