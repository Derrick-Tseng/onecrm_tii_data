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
export const apiGetAllInfo = () => infoRequest.get('/GetAll');
export const apiGetInfoById = (id) => infoRequest.get('/GetInfo/'+ id);

// pdf 相關的 api
export const apiGetProductContentPdf = data => pdfRequest.get('/GetProductContentPdf/'+ data);
export const apiGetTreatyPdf = data => pdfRequest.get('/GetTreatyPdf/'+ data);
export const apiGetRatePdf = data => pdfRequest.get('/GetRatePdf/'+ data);