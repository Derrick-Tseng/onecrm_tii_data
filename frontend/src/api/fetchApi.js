
import blobToBase64 from '../helper.js'
import { apiGetInfoById, apiGetProductContentPdf, apiGetTreatyPdf, apiGetRatePdf } from './agent';

export function getProductInfo(productNum, setModalContent){
    apiGetInfoById(productNum)
    .then(res =>{
        const item = res.data[0];
        setModalContent(
            <>
                <div>{item.productNum}</div>
                <div>{item.productName}</div>
            </>
        );
    })
    .catch(err=> {
        setModalContent(
            <>
                <div>Data Not Found</div>
            </>
        );
        console.log(err);
    })
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

    // apiGetProductContentPdf(productNum)
    // .then(res =>{
    //     const item = res.data[0].pdf[0];
    //     var arrayBuffer =  new Int16Array(item); 
    //     const url = URL.createObjectURL(new Blob([arrayBuffer], {type: "application/pdf"}))
    //     setModalContent(
    //         <>
    //             <iframe width='100%' height='100%' src={url}></iframe>
    //         </>
    //     );
    // })
    // .catch(err=> {
    //     console.log(err);
    // });
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