import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import Disk from './Disk'
import Destination from './Destination'
import { Navbar, Modal, Button} from 'react-bootstrap';
var shortid = require('shortid');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameOver: false  
    };
    this.destinationElementA = React.createRef();
    this.destinationElementB = React.createRef();
    this.destinationElementC = React.createRef();
  }

  youWon = () => {
    this.setState({gameOver: true})
  }


  resetGame = () => {
    this.setState({gameOver: false});
    this.destinationElementA.current.resetDisks();
    this.destinationElementB.current.resetDisks();
    this.destinationElementC.current.resetDisks();
  }

  callReturn = () => {
    this.destinationElementA.current.returnTopDisk();
    this.destinationElementB.current.returnTopDisk();
    this.destinationElementC.current.returnTopDisk();   
  }


  changeStack = () => {
    this.destinationElementA.current.changeStack();
    this.destinationElementB.current.changeStack();
    this.destinationElementC.current.changeStack();    
  }

  render() {
  return (
    <div className="App">
      <script src="https://unpkg.com/react/umd/react.production.js" crossorigin />
      <div>
        <Modal
          size="sm"
          show={this.state.gameOver}
          onHide={!this.state.gameOver}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <Modal.Header className = "ModalTitle">
            <Modal.Title  id="example-modal-sizes-title-sm">
              <div className="text-center"> You Won! </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Button className = "WinButton" onClick = {this.resetGame}> Play Again </Button>
          </Modal.Body>
        </Modal>  
    <Navbar className = "NavBar">
        <Navbar.Brand className = "Intro">Justin Barry</Navbar.Brand>
    </Navbar>
      </div>
      <header className="App-header">
      <div className = "home">
        <h1 className = "Title"> Welcome to Tower of Hanoi </h1>
          <div className = "Game">
          <div>
            <h2 className = "Header"> A </h2>
          <Destination className = "A" changeStack = {this.changeStack} returnDisk = {this.callReturn} triggerWin = {this.youWon} ref = {this.destinationElementA}> </Destination>
          </div>
          <div>
            <h2 className = "Header"> B </h2>
          <Destination className = "B" changeStack = {this.changeStack} returnDisk = {this.callReturn} triggerWin = {this.youWon} ref = {this.destinationElementB}> </Destination>
          </div>
          <div>
            <h2 className = "Header"> C </h2>
          <Destination className = "C" changeStack = {this.changeStack} returnDisk = {this.callReturn} triggerWin = {this.youWon} ref = {this.destinationElementC}> </Destination>
          </div>
        </div>

      </div>

      </header>


    </div>

  );
  }
}

export default App;
