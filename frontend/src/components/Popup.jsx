import '../css/Popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import pdf from '../public/test.pdf';

function Popup({productNum}) {
  return (
    <div className="App">
        <div >
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div class="modal-dialog modal-xl">
                    <div class="modal-content" style={{height:"800px"}}>
                        <div class="modal-header">
                            <h5 class="modal-title text-danger" id="exampleModalLabel">PDF + {productNum}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* <iframe src="http://localhost//Users/derricktseng/Desktop/Systex/onecrm_tii_data/frontend/public/test.pdf" scrolling="auto" height="100%" width="100%"></iframe>
                            <Object src="pdf"></Object> */}
                            {/* <embed src={pdf} height="100%" width="100%"></embed> */}

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Popup;