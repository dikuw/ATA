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
  const [selectedItemTypes, setSelectedItemTypes] = useState([]);
  const [testFunctions, setTestFunctions] = useState([]);

  const getItemTypes = async () => {
    await apis.getItemTypes().then(res => {
      setitemTypes(res.data.itemTypes);
    })
  }
  
  const addSelectedItemType = (item) => {
    console.log(item);
    let newSelectedItemTypes = [ ...selectedItemTypes ];
    newSelectedItemTypes.push(item);
    setSelectedItemTypes(newSelectedItemTypes);
  }

  const removeSelectedItemType = (item) => {
    let newSelectedItemTypes = [ ...selectedItemTypes ];
    const itemToRemove = newSelectedItemTypes.findIndex((i) => i === item);
    newSelectedItemTypes.splice(itemToRemove, 1);
    setSelectedItemTypes(newSelectedItemTypes);
  }

  const addAllItemTypes = () => {
    let newSelectedItemTypes = [];
    itemTypes.forEach(item => {
      newSelectedItemTypes.push(item.itemPrefix);
    })
    setSelectedItemTypes(newSelectedItemTypes);
  }

  const removeAllItemTypes = () => {
    setSelectedItemTypes([]);
  }

  const getTestFunctions = async () => {
    await apis.getTestFunctions().then(res => {
      setTestFunctions(res.data.testFunctions);
    })
  }

  const testRunner = async () => {
    //  TODO: update to be an array of item prefixes checked in the UI
    //  i.e. it will be the selectedItemTypes state
    const payload = { "itemPrefix": selectedItemTypes };

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
          <ItemTypePicker 
            itemTypes={itemTypes} 
            addSelectedItemType={addSelectedItemType}
            removeSelectedItemType={removeSelectedItemType}
            addAllItemTypes={addAllItemTypes}
            removeAllItemTypes={removeAllItemTypes}
          />
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
