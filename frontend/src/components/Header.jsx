import '../css/Header.css';

import React from "react";

function DropDownCompany({placeholder, companyList, setCompanySelect, companySelect}){
	const listItem = companyList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);

	const handleChange = (e) => {
		// var tmp = [...companySelect];
		var tmp = []
		tmp.push(e.target.value);
		setCompanySelect(tmp)
		// setCompanySelect(e.target.value)
    };

  	return (
    	<select className='header-select' onChange={handleChange}>
      		<option value="None" disabled>{placeholder}</option>
      		{listItem}
    	</select>
  	);
}

function DropDownStatus({placeholder, statusList, setSatusSelect}){
	const listItem = statusList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);

	const handleChange = (e) => {
		setSatusSelect(e.target.value)
    };

  	return (
    	<select className='header-select' onChange={handleChange}>
      		<option value="None" disabled>{placeholder}</option>
      		{listItem}
    	</select>
  	);
}

function GetFilterBtn({companyList, status, setCompanySelect, setStatusSelect}){
	// const tmpSet = new Set();
	const listItem = []

	const handleClickCompany = (e) => {
        setCompanySelect(companyList.filter(val => val !== e.target.value));
    };

	const handleClickStatus = (e) => {
        setStatusSelect(null);
    };

	if (status != null){
		listItem.push( <button className="btn-filter-status" value={status} key={status} onClick={handleClickStatus}>{status}</button>)
	}

	if(companyList.length){
		listItem.push( <button className="btn-filter-company" value={companyList[0]} key={companyList[0]} onClick={handleClickCompany}>{companyList[0]}</button>)
	}

	// for (let i=0; i<companyList.length; i++){
	// 	if(!tmpSet.has(companyList[i])){
	// 		listItem.push( <button className="btn-filter" value={companyList[i]} key={companyList[i]} onClick={handleClickCompany}>{companyList[i]}</button>)
	// 		tmpSet.add(companyList[i]);
	// 	}
	// }
  	return (
        <>
            {listItem}
        </>
  	);
}


function Header({companySelect, setCompanySelect, statusSelect, setStatusSelect, SetSearchBox}) {

	const companyList = [
		'all',
		'臺銀人壽保險股份有限公司', 
		'保誠人壽保險股份有限公司', 
		'國泰人壽保險股份有限公司', 
		'中國人壽保險股份有限公司',
		'南山人壽保險股份有限公司',
		'國華人壽保險股份有限公司',
		'新光人壽保險股份有限公司',
		'富邦人壽保險股份有限公司',
		'國寶人壽保險股份有限公司',
		'三商美邦人壽保險股份有限公司',
		'朝陽人壽保險股份有限公司',
		'遠雄人壽保險事業股份有限公司',
		'宏泰人壽保險股份有限公司',
		'安聯人壽保險股份有限公司',
		'中華郵政股份有限公司',
		'第一金人壽保險股份有限公司',
		'合作金庫人壽保險股份有限公司',
		'安泰人壽保險股份有限公司',
		'中國信託人壽保險股份有限公司',
		'台新人壽保險股份有限公司',
		'國際康健人壽保險股份有限公司',
		'英屬百慕達商友邦人壽保險股份有限公司台灣分公司',
		'元大人壽保險股份有限公司',
		'環球瑞泰人壽保險股份有限公司',
		'全球人壽保險股份有限公司',
		'法商法國巴黎人壽保險股份有限公司台灣分公司',
		'安達保險股份有限公司',
		'英屬百慕達商安達人壽保險股份有限公司台灣分公司',
		'英屬曼島商蘇黎世國際人壽保險股份有限公司台灣分公司',

	];

	const statusList = [
		'all',
		'在售',
		'停售'
	]

	const handleSearchBoxChange = (e) => {
		SetSearchBox(e.target.value)
    };

  	return (
    	<div className="Header">
     		<div className="Rectangle-2763"></div>
      		<div className="Rectangle-2883">
				<img src="https://onecrm.tw/images/logo-v2-004.png" className="Group-69526"/>
        		<span className="h-span1">搜尋</span>
        		<DropDownCompany placeholder="壽險公司" companyList={companyList} setCompanySelect={setCompanySelect} companySelect={companySelect} />
        		<DropDownStatus placeholder="販售狀態" statusList={statusList} setSatusSelect={setStatusSelect}/>
				<input placeholder="輸入商品代碼或名稱" name="search-input" className='header-input' onChange={handleSearchBoxChange}></input>
      		</div>
			
			  <div className="Rectangle-825">
                <GetFilterBtn companyList={companySelect} status={statusSelect} setCompanySelect={setCompanySelect} setStatusSelect={setStatusSelect} />

            </div>
    	</div>
  	);
};

export default Header;
