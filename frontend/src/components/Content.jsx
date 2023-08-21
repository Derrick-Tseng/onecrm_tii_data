import '../css/Content.css';
import Popup from './Popup';
import React, {useState, useMemo } from "react";
import { apiGetAllInfo, apiGetInfoById, apiGetInfoList } from "../api/agent.js";


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

async function getAll(setInfoList, limit, page){
    // await apiGetAllInfo()
    // console.log(limit," ", page)
    await apiGetInfoList(limit, page)
    .then(res=>{
        // console.log(res.data);
        setInfoList(res.data);
        return 
    })
    .catch(err=>{
        // setInfoList(null)
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


function FooterPageSelect({dataList, setTodosPerPage}){
	const listItem = dataList.map(item => 
		<option onClick={()=>setTodosPerPage(parseInt(listItem))} key={item} value={item}>{item}</option>
  	);
  	return (
    	<select className='foooter-select'>
      		<option value="1" disabled>1</option>
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




function Content() {
    // info = JSON.stringify(info)
    const [infoList, setInfoList] = useState([]);
    // getAll(setInfoList)

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(2);
    const lastTodoInView = currentPage * todosPerPage;
    const firstTodoInView = lastTodoInView - todosPerPage;
    const todosForDisplay = infoList.slice(firstTodoInView, lastTodoInView);

    const pageNumbers = [];
    
    for (let n = 1; n <= Math.ceil(infoList.length / todosPerPage); n++) {
        pageNumbers.push(n);
    }
    
    const renderPageNumbers = pageNumbers.map((number, index) => {
        // console.log(number, " ", index)
        return <button onClick={() => setCurrentPage(number)} key={index}>
            {number}
        </button>
    });
    
    const pages = ["1", "2", "3"]
    const filter_btn_content = ["abc", "def", "ghi"]

  	return (
    	<div className="Content">
            <button onClick={()=>getAll(setInfoList, todosPerPage, currentPage)}>查詢</button>
            <div className="Rectangle-825">
                <GetFilterBtn dataList={filter_btn_content} />    
            </div>
            <TitleBox/>
            <RenderItems info={todosForDisplay}/>
            <div className="numbers">{renderPageNumbers}</div>
            {/* <GetResultBoxs info={infoList}/> */}
            <div className="Rectangle-3019">
                <div className="Group-69595">
                    <div className="Group-69454">
                        <span className='span5'>一頁最多顯示</span>
                        <FooterPageSelect placeholder='123' dataList={pages} setTodosPerPage={setTodosPerPage}/>
                        <span className="span6">共 {pageNumbers.length} 頁</span>
                    </div>
                    <div className="Group-69455">
                        <button className='btn-left'>上一頁</button>
                        <span className='span7'>{currentPage}</span>
                        <button className='btn-right'>下一頁</button>
                    </div>
                </div>
            </div>
    	</div>
  	);
};

export default Content;