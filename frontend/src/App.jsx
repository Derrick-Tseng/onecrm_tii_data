import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import { useState } from 'react';

function App() {
  const [companySelect, setCompanySelect] = useState(['all']);
  // const [companySelect, setCompanySelect] = useState(null);
	const [statusSelect, setStatusSelect] = useState("all");
  const [searchBox, SetSearchBox] = useState(null);
  return (
    <div className="App">
        <Header companySelect={companySelect} setCompanySelect={setCompanySelect} statusSelect={statusSelect} setStatusSelect={setStatusSelect} SetSearchBox={SetSearchBox}/>
        <Content companySelect={companySelect[0]} statusSelect={statusSelect} searchBox={searchBox}/>
    </div>
  );
}

export default App;
