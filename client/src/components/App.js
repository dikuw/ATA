import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import apis from '../api/index';
import '../styles/App.css';

import ItemTypePicker from './ItemTypePicker';
import TestPicker from './TestPicker';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1vw;
`;

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleDiv = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;



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
      <Container>
        <ChildContainer>
          <TitleDiv>Item Types</TitleDiv>
          <ItemTypePicker itemTypes={itemTypes} />
        </ChildContainer>
        <ChildContainer>
          <TitleDiv>Test Functions</TitleDiv>
          <TestPicker itemTypes={itemTypes} />
        </ChildContainer>
        <ChildContainer>
          <TitleDiv>Outputs</TitleDiv>
        </ChildContainer>
      </Container>
    </div>
  );
}

export default App;
