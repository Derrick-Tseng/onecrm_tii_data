import '../css/Header.css';

import React, {useState} from "react";

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
		listItem.push( <button className="btn-filter" value={status} key={status} onClick={handleClickStatus}>{status}</button>)
	}

	if(companyList.length){
		listItem.push( <button className="btn-filter" value={companyList[0]} key={companyList[0]} onClick={handleClickCompany}>{companyList[0]}</button>)
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
		'mathematician', 
		'chemist', 
		'physicist', 
		'geologist',
		'astrophysicist'
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
