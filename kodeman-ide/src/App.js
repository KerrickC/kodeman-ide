import React, { useState } from "react";
import "./App.css";
const axios = require("axios");

function App() {
  const [lang, setLang] = useState("c");
  const [result, setResult] = useState("Submit code to see result.");
  const [code, setCode] = useState(""); //maybe add conditional hello world
  const [input, setInput] = useState("");

  const onSubmitCode = (e) => {
    e.preventDefault();
    alert("Submitted!");
    axios
      .post(`http://localhost:8000/code/submit/`, {
        code: code,
        input: input,
        lang: lang,
      })
      .then((res) => {
        console.log(res);
        if (res.data.stderr) {
          setResult(res.data.stderr);
        } else if (res.data.shortMessage) {
          setResult(res.data.shortMessage);
        } else {
          setResult(res.data);
        }
      });
  };

  const defaultCode = {
    c: `#include<stdio.h>
int main(int argc, char* argv[]) {
  //prints input string!
  printf("%s\\n", argv[1]);
  return 0;
}`,
    cpp: "",
    python: "",
    java: "",
  };

  const onCodeChange = (e) => {
    setCode(e.target.value);
  };

  const onLangChange = (e) => {
    setLang(e.target.value);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <select id="lang" value={lang} onChange={onLangChange}>
              <option value="c">C</option>
              <option value="c++">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
            <p className="lead d-block my-0">Code here</p>
            <textarea
              type="text"
              id="code"
              defaultValue={defaultCode.c}
              placeholder="CODE"
              onChange={onCodeChange}
              spellCheck="false"
            ></textarea>
          </div>
          <div className="col-12 mt-3">
            <p className="lead d-block my-0">Input</p>
            <textarea
              type="text"
              id="input"
              placeholder="Ex: cat"
              onChange={onInputChange}
            ></textarea>
          </div>
        </div>
        <button className="btn btn-success" onClick={onSubmitCode}>
          Submit Code
        </button>
        <div className="row">
          <div className="col-12 my-5">
            <p className="lead d-block my-0">Output</p>
            <textarea
              type="text"
              id="result"
              disabled={true}
              value={result}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
