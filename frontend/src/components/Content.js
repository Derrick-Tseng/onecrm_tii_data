import '../css/Content.css';


function GetResultBoxs({info}){
    const itemList = info.map(item => 
        // <ResultBox info={item}/>
        
        <div className="Group-69612" key={item.code}>
            <input type="checkbox" className="cb2" id="cb" name={item.code}></input>
            <span className='span1'>{item.compayName}</span>
            <span className='DCB'>{item.code}</span>
            <span className='span2'>{item.productName}</span>
            <span className='span3'>{item.status}</span>
            <button className='btn'>查看</button>
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
            "code": "111",
            "productName" : "a1a1a1",
            "status": "selling",
            "href": "123.com"
        },
        {
            "compayName": "bbb",
            "code": "222",
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
            "code": "333",
            "productName" : "c3c3c3",
            "status": "selling",
            "href": "789.com"
        },
        {
            "compayName": "ccc",
            "code": "333",
            "productName" : "c3c3c3",
            "status": "selling",
            "href": "789.com"
        },
    ]

    const pages = ["1", "2", "3"]
    const filter_btn_content = ["abc", "def", "ghi"]
    
  	return (
    	<div className="Content">
            
            <div className="Rectangle-825">
                <GetFilterBtn dataList={filter_btn_content} />    
            </div>
            <TitleBox/>
            <GetResultBoxs info={info}/>
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