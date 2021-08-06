import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px auto;
  padding: 4px;
`;

const StyledSelect = styled.select`
  width: 30vw;
  height: 60vh;
`;

export default function TestPicker(props) {

  const handleChange = (e) => {
    props.addSelectedTestFunction(e.target.value);
  }

  if (props.testFunctions.length < 1) {
    return <div>{"Loading... please wait"}</div>
  }

  if (props.testFunctions) {
    return (
      <Container>
        <StyledSelect name="list-box" defaultValue={props.selectedTestFunctions} multiple>
        {/* <option key={0} value={"All"}>{"All Tests"}</option> */}
          {props.testFunctions.map( (testFunction) => 
            <option key={testFunction.testID} value={testFunction.testID} onClick={handleChange}>{testFunction.testTitle}</option>
          )}
        </StyledSelect>
      </Container>
    );
  }
}