import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 6vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px auto;
  padding: 4px;
`;

export default function TestPicker(props) {
  if (props.testFunctions.length < 1) {
    return <div>{"Loading... please wait"}</div>
  }
  if (props.testFunctions) {
    return (
      <Container>
        <select name="list-box" multiple>
          {props.testFunctions.map( (testFunction) => 
            <option key={testFunction.testID} value={testFunction.testID}>{testFunction.testTitle}</option>
          )}
        </select>
      </Container>
    );
  }
}