import '../css/Content.css';
import Popup from './Popup';
import React, {useState} from "react";
import { apiGetInfoById, apiGetInfoList } from "../api/agent.js";


function setModal(productNum, setModalContentId, setModalContent){
    setModalContentId(productNum);
    apiGetInfoById(productNum)
    .then(res =>{
        const item = res.data[0];
        setModalContent(
            <>
                <div>產品編號：{item.productNum}</div>
                <div>產品名稱：{item.productName}</div>
                <div>產品狀態：{item.status}</div>
                <div>發行公司：{item.company}</div>
                <div>核准編號：{item.approvalNum}</div>
                <div>核准日期：{item.approvalDate}</div>
                <div>起售日：{item.startDate}</div>
                <div>停售日：{item.endDate}</div>
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

async function getList(setInfoList, limit, page, setPageNum){
    await apiGetInfoList(limit, page)
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


function RenderItems({info}){
    // const itemList = todosForDisplay.map(x => 
    //     <li key={x.productNum}>{x.productName}</li>
    // );
    // return itemList;
    const [modalContentId, setModalContentId] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const itemList = info.map(item => 
        <div className="Group-69612" key={item.productNum}>
            <input type="checkbox" className="cb2" id="cb" name={item.productNum}></input>
            <span className='span1'>{item.company}</span>
            <span className='DCB'>{item.productNum}</span>
            <span className='span2'>{item.productName}</span>
            <span className='span3'>{item.status}</span>
            <button type="button" onClick={()=>setModal(item.productNum, setModalContentId, setModalContent)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">查看</button>
            <Popup productNum={modalContentId} content={modalContent} setModalContent={setModalContent}/>
        </div>
    );
    
    return itemList;
}


function TitleBox(){
    return (
        <div className="Rectangle-2870">
            <input type="checkbox" className="cb1" id="cb_title"></input>
            <span className='titile_span1'>壽險公司</span>
            <span className='titile_DCB'>代碼</span>
            <span className='title_span2'>產品名稱</span>
            {/* <span className='titile_span3'></span> */}
            {/* <button className='titile_btn'>查看</button> */}
        </div>
    )
}


function FooterPageSelect({dataList, setCurrentPage, setInfoList, limit, setPageNum, currentPage}){
	const listItem = dataList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);

    const handleChange = (e) => {
        setCurrentPage(e.target.value);
        getList(setInfoList, limit, e.target.value, setPageNum);
    };

  	return (
    	<select value={currentPage} id="footer-select" className='footer-select' onChange={handleChange}>
      		<option value="" disabled hidden>Page</option>
            {listItem}
    	</select>
    );
}

function FooterPageLimitSelect({dataList, setTodosPerPage, setInfoList, setPageNum, todosPerPage, setCurrentPage}){
	const listItem = dataList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);

    const handleChange = (e) => {
        setTodosPerPage(parseInt(e.target.value));
        setCurrentPage(1)
        getList(setInfoList, parseInt(e.target.value), 1, setPageNum);
    };

  	return (
    	<select value={todosPerPage} id="footer-select" className='footer-select' onChange={handleChange}>
      		<option value="" disabled hidden>Page</option>
            {listItem}
    	</select>
    );
}


function GetFilterBtn({dataList}){
    const listItem = dataList.map(item => 
        <button className="btn-filter" value={item} key={item}>{item}</button>
  	);
  	return (
        <>
            {listItem}
        </>
  	);
}

function prevPage(setCurrentPage, setPageNum, prev, setInfoList, limit){
    console.log("prev", prev)
    setCurrentPage(prev);
    getList(setInfoList, limit, prev, setPageNum);
}

function nextPage(setCurrentPage, setPageNum, next, setInfoList, limit){
    console.log("next", next)
    setCurrentPage(next);
    getList(setInfoList, limit, next, setPageNum);
}


function Content() {
    const [infoList, setInfoList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(2);
    const [pageNum, setPageNum] = useState(0);

    // const pageNumbers = [];
    
    // for (let n = 1; n <= Math.ceil(infoList.length / todosPerPage); n++) {
    //     pageNumbers.push(n);
    // }
    
    // const renderPageNumbers = pageNumbers.map((number, index) => {
    //     // console.log(number, " ", index)
    //     return <button onClick={() => setCurrentPage(number)} key={index}>
    //         {number}
    //     </button>
    // });

    var prev = currentPage - 1 <= 0 ? 1 : currentPage-1;
    var next = currentPage + 1 > pageNum ? currentPage : currentPage+1;

    const pagesSelect = []
    const filter_btn_content = ["abc", "def", "ghi"]
    const pagesLimitSelect = [1, 2, 3, 4]

    for(let i=1; i<=pageNum; i++){
        pagesSelect.push(i);
    }

    return (
    	<div className="Content">
            <button onClick={()=>getList(setInfoList, todosPerPage, 1, setPageNum)}>查詢</button>
            <div className="Rectangle-825">
                <GetFilterBtn dataList={filter_btn_content} />    
            </div>
            <TitleBox/>
            <RenderItems info={infoList}/>
            {/* <div className="numbers">{FooterPageSelect}</div>  */}
            <div className="Rectangle-3019">
                <div className="Group-69595">
                    <div className="Group-69454">
                        <span className='span5'>一頁最多顯示</span>
                        <FooterPageLimitSelect dataList={pagesLimitSelect} setTodosPerPage={setTodosPerPage} setInfoList={setInfoList} setPageNum={setPageNum} todosPerPage={todosPerPage} setCurrentPage={setCurrentPage} />
                        <span className='span5'>Page Select</span>
                        <FooterPageSelect dataList={pagesSelect} setCurrentPage={setCurrentPage} setInfoList={setInfoList} limit={todosPerPage}  setPageNum={setPageNum} currentPage={currentPage} />
                        
                        <span className="span6">共 {pageNum} 頁</span>
                    </div>
                    <div className="Group-69455">
                        <button className='btn-left' onClick={()=>prevPage(setCurrentPage, setPageNum, prev, setInfoList, todosPerPage)}>上一頁</button>
                        <span className='span7'>{currentPage}</span>
                        <button className='btn-right' onClick={()=>nextPage(setCurrentPage, setPageNum, next, setInfoList, todosPerPage)}>下一頁</button>
                    </div>
                </div>
            </div>
    	</div>
  	);
};

export default Content;