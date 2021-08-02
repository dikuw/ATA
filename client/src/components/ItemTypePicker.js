import React from 'react';

export default function ItemTypePicker(props) {
  if (props.itemTypes.length < 1) {
    return <div>{"Loading... please wait"}</div>
  }
  if (props.itemTypes) {
    return (
      <ul>
        {props.itemTypes.map( (itemType) => 
          <li key={itemType.srt1ID} >{itemType.itemPrefix}</li> 
        )}
      </ul>
    );
  }
}