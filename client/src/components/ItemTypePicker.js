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

const Item = styled.div`

`;

export default function ItemTypePicker(props) {
  if (props.itemTypes.length < 1) {
    return <div>{"Loading... please wait"}</div>
  }
  if (props.itemTypes) {
    return (
      <Container>
        {props.itemTypes.map( (itemType) => 
          <Item>
            <label>
              <input type="checkbox" id={itemType.srt1ID} name={itemType.title} value={itemType.itemPrefix} />
              <span>{itemType.itemPrefix}</span>
            </label>
          </Item>
        )}
      </Container>
    );
  }
}