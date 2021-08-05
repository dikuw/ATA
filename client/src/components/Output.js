import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px auto;
  padding: 4px;
`;

const StyledDiv = styled.div`
  width: 30vw;
  height: 60vh;
  padding: 2px;
  border: 1px solid black;
  text-align: left;
`;

export default function Output() {
  return (
    <Container>
      <StyledDiv>
        Let's run a test...
      </StyledDiv>
    </Container>
  );
}