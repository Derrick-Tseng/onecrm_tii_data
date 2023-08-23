import axios from 'axios';

// info 相關的 api
const infoRequest = axios.create({
  baseURL: 'http://localhost:5050/api/Info/'
});
// pdf 相關的 api
const pdfRequest = axios.create({
  baseURL: 'http://localhost:5050/api/Pdf/'
});

// info 相關的 api
export const apiGetAll = () => infoRequest.get('/GetAll');
export const apiGetInfoList = (limit, page, company, status) => 
  infoRequest.get('/GetList?limit=' + limit + '&page=' + page + "&Company=" + company + "&Status=" + status);

export const apiGetInfoListSearchbox = (limit, page, searchbox) => 
    infoRequest.get('/GetList?limit=' + limit + '&page=' + page + "&Searchbox=" + searchbox);

export const apiGetInfoById = (id) => infoRequest.get('/GetInfo/' + id);

// pdf 相關的 api
export const apiGetProductContentPdf = data => pdfRequest.get('/GetProductContentPdf/' + data);
export const apiGetTreatyPdf = data => pdfRequest.get('/GetTreatyPdf/' + data);
export const apiGetRatePdf = data => pdfRequest.get('/GetRatePdf/' + data);