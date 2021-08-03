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

const SubtitleDiv = styled.div`
  font-size: 1.0em;
  font-style: italic;
`;

function App() {

  const [itemTypes, setitemTypes] = useState([]);
  const [testFunctions, setTestFunctions] = useState([]);

  const getItemTypes = async () => {
    await apis.getItemTypes().then(res => {
      setitemTypes(res.data.itemTypes);
    })
  }

  const getTestFunctions = async () => {
    await apis.getTestFunctions().then(res => {
      setTestFunctions(res.data.testFunctions);
    })
  }

  const testRunner = async () => {
    const payload = { "itemPrefix": "DRV" };

    await apis.testRunner(payload).then(res => {

    })
  }

  useEffect(() => {
    document.title = "ATA by Nemedio";

    async function initialize() {
      await getItemTypes();
      await getTestFunctions();
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
          <TitleDiv>Select Test Function(s)</TitleDiv>
          <TestPicker testFunctions={testFunctions} />
        </ChildContainer>
        <ChildContainer>
          <TitleDiv>Select Item Type(s)</TitleDiv>
          <SubtitleDiv>Generic Non-Singletons</SubtitleDiv>
          <ItemTypePicker itemTypes={itemTypes} />
        </ChildContainer>
        <ChildContainer>
          <button onClick={testRunner}>Run Test(s)</button>
        </ChildContainer>
        <ChildContainer>
          <TitleDiv>Output</TitleDiv>
        </ChildContainer>
      </Container>
    </div>
  );
}

export default App;
