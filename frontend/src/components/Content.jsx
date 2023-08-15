import '../css/Content.css';
import Popup from './Popup';
import React, {useState } from "react";
import { apiGetInfoById } from "../api/agent.js"; 

function setModal(productNum, setModalContentId, setModalContent){
    setModalContentId(productNum);
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

function GetResultBoxs({info, setIsPopup, isPopup}){
    const [modalContentId, setModalContentId] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const itemList = info.map(item => 
        <div className="Group-69612" key={item.code}>
            <input type="checkbox" className="cb2" id="cb" name={item.code}></input>
            <span className='span1'>{item.compayName}</span>
            <span className='DCB'>{item.code}</span>
            <span className='span2'>{item.productName}</span>
            <span className='span3'>{item.status}</span>
            <button type="button" onClick={()=>setModal(item.code, setModalContentId, setModalContent)} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">查看</button>
            <Popup productNum={modalContentId} content={modalContent} setModalContent={setModalContent}/>
        </div>
    );
    
    return itemList;
}


function TitleBox(){
    return (
        <div class="Rectangle-2870">
            <input type="checkbox" className="cb1" id="cb_title"></input>
            <span className='titile_span1'>壽險公司</span>
            <span className='titile_DCB'>代碼</span>
            <span className='title_span2'>產品名稱</span>
            {/* <span className='titile_span3'></span> */}
            {/* <button className='titile_btn'>查看</button> */}
        </div>
    )
}


function FooterPageSelect({dataList}){
	const listItem = dataList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);
  	return (
    	<select className='foooter-select'>
      		<option value="1" disabled selected>1</option>
      		{listItem}
    	</select>
  	);
}


function GetFilterBtn({dataList}){
    const listItem = dataList.map(item => 
        <button className="btn-filter" value={item}>{item}</button>
  	);
  	return (
        <>
            {listItem}
        </>
  	);
}


function Content() {
    const info = [
        {
            "compayName": "aaa",
            "code": "123123",
            "productName" : "a1a1a1",
            "status": "selling",
            "href": "123.com"
        },
        {
            "compayName": "bbb",
            "code": "aa1234",
            "productName" : "b2b2b2",
            "status": "selling",
            "href": "456.com"
        },
        {
            "compayName": "ccc",
            "code": "333",
            "productName" : "c3c3c3",
            "status": "selling",
            "href": "789.com"
        },
        {
            "compayName": "ccc",
            "code": "444",
            "productName" : "c3c3c3",
            "status": "selling",
            "href": "789.com"
        },
        {
            "compayName": "ccc",
            "code": "555",
            "productName" : "c3c3c3",
            "status": "selling",
            "href": "789.com"
        },
    ]

    const pages = ["1", "2", "3"]
    const filter_btn_content = ["abc", "def", "ghi"]
    const [isPopup, setIsPopup] = useState(false);

  	return (
    	<div className="Content">
            
            <div className="Rectangle-825">
                <GetFilterBtn dataList={filter_btn_content} />    
            </div>
            <TitleBox/>
            <GetResultBoxs info={info} setIsPopup={setIsPopup} isPopup={isPopup}/>
            <div class="Rectangle-3019">
                <div class="Group-69595">
                    <div class="Group-69454">
                        <span className='span5'>一頁最多顯示</span>
                        <FooterPageSelect placeholder='123' dataList={pages}/>
                        <span className="span6">共 30 頁</span>
                    </div>
                    <div class="Group-69455">
                        <button className='btn-left'>上一頁</button>
                        <span className='span7'>18</span>
                        <button className='btn-right'>下一頁</button>
                    </div>
                </div>
            </div>
    	</div>
  	);
};

export default Content;