import React, { useState, useEffect } from 'react';

import apis from '../api/index';
import '../styles/App.css';

import ItemTypePicker from './ItemTypePicker';

function App() {

  const [itemTypes, setitemTypes] = useState([]);

  const getItemTypes = async () => {
    await apis.getItemTypes().then(res => {
      setitemTypes(res.data.itemTypes);
    })
  }

  useEffect(() => {
    document.title = "ATA by Nemedio";

    async function initialize() {
      await getItemTypes();
    }
    initialize();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Automated Testing Tool
        </p>
      </header>
      <ItemTypePicker itemTypes={itemTypes} />
    </div>
  );
}

export default App;
