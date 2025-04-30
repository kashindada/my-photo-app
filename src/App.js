// App.js
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState('doc');
  const [docSrc, setDocSrc] = useState(null);
  const [reqSrc, setReqSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleTabClick = (tab) => {
    setActive(tab);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (active === 'doc') {
      setDocSrc(url);
    } else {
      setReqSrc(url);
    }
    // Revoke URL after image loads
  };

  const bothPresent = docSrc && reqSrc;

  return (
    <div className="wrapper">
      <div className="top">
        <div className="back" onClick={() => window.history.back()}>
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        </div>
        <h1>Удостоверение личности</h1>
      </div>

      <div className="tabs">
        <div
          className="slider"
          style={{ transform: active === 'doc' ? 'translateX(0)' : 'translateX(100%)' }}
        />
        <div className={`tab ${active === 'doc' ? 'active' : ''}`} onClick={() => handleTabClick('doc')}>
          Документ
        </div>
        <div className={`tab ${active === 'req' ? 'active' : ''}`} onClick={() => handleTabClick('req')}>
          Реквизиты
        </div>
      </div>

      <div className="card">
        {active === 'doc' && docSrc && <img id="preview-doc" src={docSrc} onLoad={() => URL.revokeObjectURL(docSrc)} />}
        {active === 'req' && reqSrc && <img id="preview-req" src={reqSrc} onLoad={() => URL.revokeObjectURL(reqSrc)} />}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="file-input"
        onChange={handleFileChange}
      />

      <button className="btn primary" onClick={handleUploadClick}>
        <img
          className="icon"
          src="https://www.svgrepo.com/show/355991/qr-alt.svg"
          alt=""
        />
        Предъявить документ
      </button>
      <button className="btn secondary" disabled={!bothPresent}>
        <img
          className="icon"
          src="https://www.svgrepo.com/show/311182/share-ios.svg"
          alt=""
        />
        Отправить документ
      </button>
    </div>
  );
}

export default App;
