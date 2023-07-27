import '../css/Content.css';


function GetResultBoxs({info}){
    const itemList = info.map(item => 
        // <ResultBox info={item}/>
        
        <div className="Group-69612" key={item.code}>
            <input type="checkbox" className="cb" id="cb" name={item.code}></input>
            <span className='span1'>{item.compayName}</span>
            <span className='DCB'>{item.code}</span>
            <span className='span2'>{item.productName}</span>
            <span className='span3'>{item.status}</span>
            <span className='span4'>查看</span>
    </div>
    );
    return itemList;
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
    ]
  	return (
    	<div className="Content">
            <div className="Rectangle-825"></div>
            <GetResultBoxs info={info}/>
    	</div>
  	);
};

export default Content;