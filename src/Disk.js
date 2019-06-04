import React from 'react';
import logo from './logo.svg';
import './Disk.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

class Disk extends React.Component {

  constructor(props) {
    super(props);
  }

  deleteMe = () => {
    this.props.kill(this.props.uid);
  };


  render() {
  return (
    <div>
      <DragDropContainer 
      targetKey="foo" 
      dragData={{className: this.props.className}}
      customDragElement={this.props.customDragElement}
      onDrop={this.deleteMe}
      noDragging = {!this.props.draggable}
      >
        <div className={this.props.className}>_</div>
      </DragDropContainer>
    </div>

  );
}
}

export default Disk;