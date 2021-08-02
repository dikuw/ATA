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
  if (props.itemTypes.length < 1) {
    return <div>{"Loading... please wait"}</div>
  }
  if (props.itemTypes) {
    return (
      <Container>
        <select name="list-box" multiple>
          {props.itemTypes.map( (itemType) => 
            <option value={itemType.srt1ID}>{itemType.itemPrefix} {itemType.title}</option>
          )}
        </select>
      </Container>
    );
  }
}