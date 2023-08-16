import '../css/Popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { getProductInfo, getProductContentPdf, getTreatyPdf, getRatePdf } from '../api/fetchApi';
// import pdf from '../public/test.pdf';



function Popup({productNum, content, setModalContent}) {
  return (
    <div className="App">
        <div >
            <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content" style={{height:"800px"}}>
                        <div class="modal-header">
                            <h5 class="modal-title text-danger" id="exampleModalLabel">詳細資料{productNum}</h5>
                            <button type="button" onClick={()=>getProductInfo(productNum, setModalContent)}>基本資料</button>
                            <button type="button" onClick={()=>getProductContentPdf(productNum, setModalContent)}>產品簡章</button>
                            <button type="button" onClick={() => getTreatyPdf(productNum, setModalContent)}>條款</button>
                            <button type="button" onClick={() => getRatePdf(productNum, setModalContent)}>費率</button>
                            <button type="button" onClick={()=>setModalContent(null)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {content}
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={()=>setModalContent(null)} class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Popup;