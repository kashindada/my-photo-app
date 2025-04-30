// App.js
import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState('doc');
  const [docSrc, setDocSrc] = useState(null);
  const [requisites, setRequisites] = useState({
    fio: '',
    iin: '',
    birthDate: '',
    docNumber: '',
    issueDate: '',
    expireDate: ''
  });
  const fileInputRef = useRef(null);

  const handleTabClick = (tab) => setActive(tab);
  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDocSrc(URL.createObjectURL(file));
  };

  const handleReqChange = (e) => {
    const { name, value } = e.target;
    setRequisites(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = (value) => navigator.clipboard.writeText(value);

  const allReqFilled = Object.values(requisites).every(val => val.trim());

  const sliderStyle = {
    transform: active === 'doc' ? 'translateX(0)' : 'translateX(100%)',
    borderRadius: active === 'doc'
      ? '10px'
      : '10px'
  };

  const labels = {
    fio: 'ФИО',
    iin: 'ИИН',
    birthDate: 'Дата рождения',
    docNumber: 'Номер документа',
    issueDate: 'Дата выдачи',
    expireDate: 'Срок действия'
  };

  return (
    <div className="wrapper">
      {/* Header */}
      <div className="top">
        <div className="back" onClick={() => window.history.back()}>
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        </div>
        <h1>Удостоверение личности</h1>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className="slider" style={sliderStyle} />
        <div className={`tab ${active==='doc'?'active':''}`} onClick={()=>handleTabClick('doc')}>Документ</div>
        <div className={`tab ${active==='req'?'active':''}`} onClick={()=>handleTabClick('req')}>Реквизиты</div>
      </div>

      {/* Content Card */}
      <div className="card">
        {active==='doc' ? (
          docSrc ? <img src={docSrc} alt="preview" />
                 : <div className="placeholder">Загрузите фото документа</div>
        ) : (
          <div className="req-form">
            {Object.keys(requisites).map(key => (
              <div className="req-row" key={key}>
                <label className="req-label">{labels[key]}</label>
                <div className="req-value">
                  <input
                    type="text"
                    name={key}
                    value={requisites[key]}
                    onChange={handleReqChange}
                    placeholder={labels[key]}
                  />
                  <img
                    src="https://www.svgrepo.com/show/505348/copy.svg"
                    alt="Copy"
                    className="icon copy-icon"
                    onClick={()=>handleCopy(requisites[key])}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {active==='doc' ? (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="file-input"
            onChange={handleFileChange}
          />
          <button className="btn primary" onClick={handleUploadClick}>
            <img className="icon" src="https://www.svgrepo.com/show/355991/qr-alt.svg" alt="QR" />
            Предъявить документ
          </button>
          <button className="btn secondary" disabled={!docSrc}>
            <img className="icon" src="https://www.svgrepo.com/show/311182/share-ios.svg" alt="Share" />
            Отправить документ
          </button>
        </>
      ) : (
        <button className="btn secondary" disabled={!allReqFilled}>
          <img className="icon" src="https://www.svgrepo.com/show/311182/share-ios.svg" alt="Share" />
          Отправить реквизиты
        </button>
      )}
    </div>
  );
}

export default App;

