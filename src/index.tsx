import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  /*
    React.StrictMode 
    안전하지 않은 생명주기를 사용하는 컴포넌트 발견
    레거시 문자열 ref 사용에 대한 경고
    권장되지 않는 findDOMNode 사용에 대한 경고
    예상치 못한 부작용 검사
    레거시 context API 검사
    */
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById('root'),
);
