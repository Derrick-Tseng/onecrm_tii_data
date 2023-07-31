import '../css/Header.css';

function SearchBox({placeholder, dataList}){
	const listItem = dataList.map(item => 
		<option key={item} value={item}>{item}</option>
  	);
  	return (
    	<select className='header-select'>
      		<option value="" disabled selected>{placeholder}</option>
      		{listItem}
    	</select>
  	);
  
}

function Header() {
	// eslint-disable-next-line no-array-constructor
	const dataList = [
		'mathematician', 
		'chemist', 
		'physicist', 
		'geologist',
		'astrophysicist'
	];
  	return (
    	<div className="Header">
     		<div class="Rectangle-2763"></div>
      		<div class="Rectangle-2883">
				<img src="https://onecrm.tw/images/logo-v2-004.png" class="Group-69526"/>
        		<span className="h-span1">搜尋</span>
        		<SearchBox placeholder="壽險公司" dataList={dataList}/>
        		<SearchBox placeholder="停售" dataList={dataList}/>
				<input placeholder="輸入商品代碼或名稱" name="search-input" className='header-input'></input>
      		</div>
        
    	</div>
  	);
};

export default Header;