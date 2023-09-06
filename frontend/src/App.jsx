import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import { useState } from 'react';

function App() {
  const [companySelect, setCompanySelect] = useState([]);
  // const [companySelect, setCompanySelect] = useState(null);
	const [statusSelect, setStatusSelect] = useState();
  const [searchBox, SetSearchBox] = useState(null);
  const [infoList, setInfoList] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [pageNum, setPageNum] = useState(0);
  return (
    <div className="App">
        <Header companySelect={companySelect} setCompanySelect={setCompanySelect} statusSelect={statusSelect} setStatusSelect={setStatusSelect} searchBox={searchBox} SetSearchBox={SetSearchBox} infoList={infoList} setInfoList={setInfoList} todosPerPage={todosPerPage} setTodosPerPage={setTodosPerPage} pageNum={pageNum} setPageNum={setPageNum}/>
        <Content companySelect={companySelect} statusSelect={statusSelect} searchBox={searchBox} infoList={infoList} setInfoList={setInfoList} todosPerPage={todosPerPage} setTodosPerPage={setTodosPerPage} pageNum={pageNum} setPageNum={setPageNum}/>
    </div>
  );
}

export default App;
