import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import apis from '../api/index';
import '../styles/App.css';

import Header from './Header';
import ItemTypePicker from './ItemTypePicker';
import TestPicker from './TestPicker';
import Output from './Output';

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
  const [selectedTestFunctions, setSelectedTestFunctions] = useState([]);
  const [output, setOutput] = useState([]);

  const getItemTypes = async () => {
    await apis.getItemTypes().then(res => {
      setitemTypes(res.data.itemTypes);
    })
  }
  
  const addSelectedItemType = (item) => {
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

  const addSelectedTestFunction = (test) => {
    let newSelectedTestFunctions = [];
    // let newSelectedTestFunctions = [ ...selectedTestFunctions ];
    newSelectedTestFunctions.push(test);
    setSelectedTestFunctions(newSelectedTestFunctions);
  }

  const removeSelectedTestFunction = (test) => {
    let newSelectedTestFunctions = [ ...selectedTestFunctions ];
    const testToRemove = newSelectedTestFunctions.findIndex((i) => i === test);
    newSelectedTestFunctions.splice(testToRemove, 1);
    setSelectedTestFunctions(newSelectedTestFunctions);
  }

  const testRunner = async () => {
    if (selectedTestFunctions.length === 0) {
      setOutput(["You must select at least one test to run."]);
      return;
    };

    setOutput(["Running tests..."]);

    for (const item of selectedItemTypes) {
      const payload = { 
        "itemPrefix": item,
        "testFunction": selectedTestFunctions,
        "output": output
      };
      await apis.testRunner(payload).then(res => {
        setOutput((prevOutput) => [...prevOutput, `${item}: ${res.data.result}`]);
      });
    }
  }

  useEffect(() => {
    document.title = "ATA by Nemedio";

    async function initialize() {
      await getItemTypes();
      await getTestFunctions();
      setOutput(["Let's run a test..."]);
    }

    initialize();

  }, []);

  const reset = () => {
    setSelectedItemTypes([]);
    setSelectedTestFunctions([]);
    setOutput(["Let's run a test..."]);
  };

  return (
    <div className="App">
      <Header 
        reset={reset}
        testRunner={testRunner}
      />
      <Container>
        <ChildContainer>
          <TitleDiv>Select Test Function(s)</TitleDiv>
          <TestPicker 
            testFunctions={testFunctions} 
            selectedTestFunctions={selectedTestFunctions}
            addSelectedTestFunction={addSelectedTestFunction}
            removeSelectedTestFunction={removeSelectedTestFunction}
          />
        </ChildContainer>
        <ChildContainer>
          <TitleDiv>Select Item Type(s)</TitleDiv>
          <SubtitleDiv>Generic Non-Singletons</SubtitleDiv>
          <ItemTypePicker 
            itemTypes={itemTypes} 
            selectedItemTypes={selectedItemTypes}
            addSelectedItemType={addSelectedItemType}
            removeSelectedItemType={removeSelectedItemType}
            addAllItemTypes={addAllItemTypes}
            removeAllItemTypes={removeAllItemTypes}
          />
        </ChildContainer>
        <ChildContainer>
          
        </ChildContainer>
        <ChildContainer>
          <TitleDiv>Output</TitleDiv>
          <Output
            output={output}
           />
        </ChildContainer>
      </Container>
    </div>
  );
}

export default App;
