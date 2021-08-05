import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: white;
  padding-left: 1vw;
`;

const ButtonContainer = styled.div`
  display: flex:
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const Button = styled.button`
  height: 100%;
  width: 12vw;
  margin-right: 10px;
`;

export default function Header(props) {
  return (
    <StyledHeader>
      <p>
        Automated Testing Tool
      </p>
      <ButtonContainer>
        <Button onClick={props.reset}>Reset</Button>
        <Button onClick={props.testRunner}>Run Test(s)</Button>
      </ButtonContainer>
    </StyledHeader>
  );
}