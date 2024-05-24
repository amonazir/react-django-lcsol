import React, { useEffect, useState } from 'react'
import Highlight from 'react-highlight';
import 'highlight.js/styles/default.css';
import './CodeArea.css'


const CodeArea = (props) => {
    const [code, setCode] = useState('');

    useEffect(() => {
      setCode(props.code_text);
  }, [props.code_text]);

  return (
    <div className="code-display">
      <Highlight className= 'python' >
        {code}
      </Highlight>
    </div>
  )
}

export default CodeArea
