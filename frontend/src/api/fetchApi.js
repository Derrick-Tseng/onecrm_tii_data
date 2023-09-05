import '../css/Table.css'
import blobToBase64 from '../helper.js'
import { apiGetAll, apiGetInfoList,apiGetInfoById, apiGetProductContentPdf, apiGetTreatyPdf, apiGetRatePdf } from './agent';

export function getAll(){
    apiGetAll()
    .then(res=>{
        return res;
    })
    .catch(err=>{
        console.log(err);
    })
}

export function getList(limit, page){
    apiGetInfoList(limit, page)
    .then(res=>{
        return res;
    })
    .catch(err=>{
        console.log(err);
    })
}


export function getProductInfo(productNum, setModalContent) {
    apiGetInfoById(productNum)
      .then((res) => {
        const item = res.data[0];
        setModalContent(
          <table className="styled-table">
            <tbody>
              <tr>
                <td>產品編號：</td>
                <td>{item.productNum}</td>
              </tr>
              <tr>
                <td>產品名稱：</td>
                <td>{item.productName}</td>
              </tr>
              <tr>
                <td>產品狀態：</td>
                <td>{item.status}</td>
              </tr>
              <tr>
                <td>發行公司：</td>
                <td>{item.company}</td>
              </tr>
              <tr>
                <td>核准編號：</td>
                <td>{item.approvalNum}</td>
              </tr>
              <tr>
                <td>核准日期：</td>
                <td>{item.approvalDate}</td>
              </tr>
              <tr>
                <td>起售日：</td>
                <td>{item.startDate}</td>
              </tr>
              <tr>
                <td>停售日：</td>
                <td>{item.endDate}</td>
              </tr>
            </tbody>
          </table>
        );
      })
      .catch((err) => {
        setModalContent(
          <>
            <div>Data Not Found</div>
          </>
        );
        console.log(err);
      });
  }
  

export function getProductContentPdf(productNum, setModalContent){
    apiGetProductContentPdf(productNum)
    .then(res => res.data[0].pdf[0])
    .then(blobToBase64)
    .then(b64 => { 
    var url = "data:application/pdf;base64," + b64;
    setModalContent(
        <>
            <object>
                <embed id="pdfID" type="application/pdf" width="1050" height="630" src={url} />
            </object>
        </>
    );
    }).catch(err=> {
        setModalContent(
            <>
                <div>File Not Found</div>
            </>
        );
        console.log(err);
    });
}


export function getTreatyPdf(productNum, setModalContent){
    apiGetTreatyPdf(productNum)
    .then(res => res.data[0].pdf[0])
    .then(blobToBase64)
    .then(b64 => { 
    var url = "data:application/pdf;base64," + b64;
    setModalContent(
        <>  
            <object>
                <embed id="pdfID" type="application/pdf" width="1050" height="630" src={url} />
            </object>
        </>
    );
    }).catch(err=> {
        setModalContent(
            <>
                <div>File Not Found</div>
            </>
        );
        console.log(err);
    });
}

export function getRatePdf(productNum, setModalContent){
    apiGetRatePdf(productNum)
    .then(res => res.data[0].pdf[0])
    .then(blobToBase64)
    .then(b64 => { 
    var url = "data:application/pdf;base64," + b64;
    setModalContent(
        <>  
            <object>
                <embed id="pdfID" type="application/pdf" width="1050" height="630" src={url} />
            </object>
        </>
    );
    }).catch(err=> {
        setModalContent(
            <>
                <div>File Not Found</div>
            </>
        );
        console.log(err);
    });
}