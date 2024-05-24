import React, { useEffect, useState } from 'react';
import './Navbar.css';
import CodeArea from './CodeArea';
import axios from 'axios';

const Navbar = () => {
    const [selectedOption, setSelectedOption] = useState('Language');
    const [searchQuery, setSearchQuery] = useState('');
    const [problemName, setProblemName] = useState('Problem');
    const [solCode, setSolCode] = useState('');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/api/modify-string/', { input_string: searchQuery, input_lang: selectedOption});
        console.log(response.data.modified_string);
        setSolCode(response.data.answer_code);
        setProblemName(response.data.problem);
        
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Leetcode Solution</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <input className='radios'
                                        type="radio"
                                        value="Python"
                                        checked={selectedOption === 'Python'}
                                        onChange={handleRadioChange}
                                    />
                                    Python</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <input className='radios'
                                        type="radio"
                                        value="C++"
                                        checked={selectedOption === 'C++'}
                                        onChange={handleRadioChange}
                                    />
                                    C++</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <input className='radios'
                                        type="radio"
                                        value="Java"
                                        checked={selectedOption === 'Java'}
                                        onChange={handleRadioChange}
                                    />
                                    Java</a>
                            </li>
                            <div className="language-selected" aria-current="page" href="#">{problemName}</div>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Problem No." aria-label="Search" style={{ width: 200 }} value={searchQuery}
                                onChange={handleInputChange} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <CodeArea code_text={solCode} />
        </div>
    );
}

export default Navbar;
