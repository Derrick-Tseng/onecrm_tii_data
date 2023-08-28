import '../css/Content.css';
import Popup from './Popup';
import React, {useState} from "react";
import { apiGetInfoById, apiGetInfoList, apiGetInfoListSearchbox } from "../api/agent.js";


function setModal(productNum, setModalContentId, setModalContent){
    setModalContentId(productNum);
    apiGetInfoById(productNum)
    .then(res =>{
        const item = res.data[0];
        setModalContent(



                
            <>
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

async function getList(setInfoList, limit, page, setPageNum, companySelect="all", statusSelect="all", searchbox=""){
    
    if(companySelect === null){
        companySelect = "all";
    }
    if(statusSelect === null){
        statusSelect = "all";
    }
    

    if(searchbox !== null && searchbox.length !== 0 && searchbox.indexOf(" ") === -1){
        await apiGetInfoListSearchbox(limit, page, searchbox)
        .then(res=>{
            setInfoList(res.data.data);
            setPageNum(res.data.pages);
            return 
        })
        .catch(err=>{
            console.log(err)
            return 
        })
    }
    else{
        await apiGetInfoList(limit, page, companySelect, statusSelect)
        .then(res=>{
            setInfoList(res.data.data);
            setPageNum(res.data.pages);
            return 
        })
        .catch(err=>{
            console.log(err)
            return 
        })
    }
}


function RenderItems({info}){
    const [modalContentId, setModalContentId] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const itemList = info.map(item => 
        
        <div className="Group-69612" key={item.productNum}>
            <input type="checkbox" className="cb2" id="cb" name={item.productNum}></input>
            <span className='shared-span-style span1'>{item.company}</span>
            <span className='shared-span-style DCB'>{item.productNum}</span>
            <span className='shared-span-style span2'>{item.productName}</span>
            {/* <span className='span3'>{item.status}</span> */}
            <button type="button" onClick={()=>setModal(item.productNum, setModalContentId, setModalContent)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">查看</button>
            <Popup productNum={modalContentId} content={modalContent} setModalContent={setModalContent}/>
        </div>
    );
    
    return itemList;
}


function TitleBox(){
    return (
        <div className="Rectangle-2870">
            {/* <input type="checkbox" className="cb1" id="cb_title"></input> */}
            <span className='shared-title-span-style span1'>壽險公司</span>
            <span className='shared-title-span-style DCB'>代碼</span>
            <span className='shared-title-span-style span2'>產品名稱</span>
            {/* <span className='titile_span3'></span> */}
            {/* <button className='titile_btn'>查看</button> */}
        </div>
    )
}


function FooterPageSelect({dataList, setCurrentPage, setInfoList, limit, setPageNum, currentPage, companySelect, statusSelect, searchBox}){
	const listItem = dataList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);

    const handleChange = (e) => {
        setCurrentPage(e.target.value);
        getList(setInfoList, limit, e.target.value, setPageNum, companySelect, statusSelect, searchBox);
    };

  	return (
    	<select value={currentPage} id="footer-select" className='footer-select' onChange={handleChange}>
      		<option value="" disabled hidden>Page</option>
            {listItem}
    	</select>
    );
}

function FooterPageLimitSelect({dataList, setTodosPerPage, setInfoList, setPageNum, todosPerPage, setCurrentPage, companySelect, statusSelect, searchBox}){
	const listItem = dataList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);

    const handleChange = (e) => {
        setTodosPerPage(parseInt(e.target.value));
        setCurrentPage(1)
        getList(setInfoList, parseInt(e.target.value), 1, setPageNum, companySelect, statusSelect, searchBox);
    };

  	return (
    	<select value={todosPerPage} id="footer-select" className='footer-select' onChange={handleChange}>
      		<option value="" disabled hidden>Page</option>
            {listItem}
    	</select>
    );
}

function prevPage(setCurrentPage, setPageNum, prev, setInfoList, limit, companySelect, statusSelect, searchBox){
    setCurrentPage(prev);
    getList(setInfoList, limit, prev, setPageNum, companySelect, statusSelect, searchBox);
}

function nextPage(setCurrentPage, setPageNum, next, setInfoList, limit, companySelect, statusSelect, searchBox){
    setCurrentPage(next);
    getList(setInfoList, limit, next, setPageNum, companySelect, statusSelect, searchBox);
}


function Content({companySelect, statusSelect, searchBox}) {
    const [infoList, setInfoList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(2);
    const [pageNum, setPageNum] = useState(0);

    var prev = currentPage - 1 <= 0 ? 1 : currentPage-1;
    var next = currentPage + 1 > pageNum ? currentPage : currentPage+1;

    const pagesSelect = []
    const pagesLimitSelect = [1, 2, 3, 4]

    for(let i=1; i<=pageNum; i++){
        pagesSelect.push(i);
    }

    return (
    	<div className="Content">
            <button onClick={()=>getList(setInfoList, todosPerPage, 1, setPageNum, companySelect, statusSelect, searchBox)}>查詢</button>
            <TitleBox/>
            <RenderItems info={infoList}/>
            <div className="Rectangle-3019">
                <div className="Group-69595">
                    <div className="Group-69454">
                        <span className='span5'>一頁最多顯示</span>
                        <FooterPageLimitSelect dataList={pagesLimitSelect} setTodosPerPage={setTodosPerPage} setInfoList={setInfoList} setPageNum={setPageNum} todosPerPage={todosPerPage} setCurrentPage={setCurrentPage}  companySelect={companySelect} statusSelect={statusSelect} searchBox={searchBox} />
                        <span className='span5_2'>Page Select</span>
                        <FooterPageSelect dataList={pagesSelect} setCurrentPage={setCurrentPage} setInfoList={setInfoList} limit={todosPerPage}  setPageNum={setPageNum} currentPage={currentPage} companySelect={companySelect} statusSelect={statusSelect} searchBox={searchBox}/>
                        
                        <span className="span6">共 {pageNum} 頁</span>
                    </div>
                    {/* <div className="Group-69455">
                        <button className='btn-left' onClick={()=>prevPage(setCurrentPage, setPageNum, prev, setInfoList, todosPerPage)}>上一頁</button>
                        <span className='span7'>{currentPage}</span>
                        <button className='btn-right' onClick={()=>nextPage(setCurrentPage, setPageNum, next, setInfoList, todosPerPage)}>下一頁</button>
                    </div> */}
                </div>
                    <div className="Group-69455">
                        <button className='btn-left' onClick={()=>prevPage(setCurrentPage, setPageNum, prev, setInfoList, todosPerPage,  companySelect, statusSelect, searchBox)}>上一頁</button>
                        <span className='span7'>{currentPage}</span>
                        <button className='btn-right' onClick={()=>nextPage(setCurrentPage, setPageNum, next, setInfoList, todosPerPage, companySelect, statusSelect, searchBox)}>下一頁</button>
                    </div>
            </div>
    	</div>
  	);
};

export default Content;