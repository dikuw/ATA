import React, { useState, useEffect } from 'react';

import '../api/index';
import '../styles/App.css';

function App() {

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {

  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Automated Testing Tool
        </p>
      </header>
    </div>
  );
}

export default App;
