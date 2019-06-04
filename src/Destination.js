import React from 'react';
import logo from './logo.svg';
import './Disk.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import Disk from './Disk'
var shortid = require('shortid');


class Destination extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        gameOver: false,
        topItem: null,
      };

      this.initialDisks = [
        {className: "Long", uid: shortid.generate()},
        {className: "Medium", uid: shortid.generate()},
        {className: "Short", uid: shortid.generate()},
      ]
    }

    checWin = () => {
      console.log('win')
      this.setState({topItem: this.state.items[this.state.items.length-1]})
      if (this.state.items.length == 3 && this.props.className == "C") {
        this.setState({gameOver: true})
        this.props.triggerWin()
      }
    }

    resetDisks = () => {
      if(this.props.className == "A"){
        this.setState({items: this.initialDisks, topItem: this.initialDisks[1]})
      } else {
        this.setState({items: [], topItem: null, gameOver: false})
      } 
    }


  componentWillMount() {
    if(this.props.className == "A") {
      this.setState({items: this.initialDisks, topItem: this.initialDisks[1]})
    }
  }


  dropItem = (e, items) => {
      items.push({className: e.dragData.className, uid: shortid.generate()});
      console.log(items[items.length-1])
      this.setState({items: items, draggableDisk: e.dragData.className, topItem: items[items.length-1]});
      // e.containerElem.style.visibility="hidden";
      this.props.changeStack()     
      this.checWin()
    }


  handleDrop = (e) => {
      let items = this.state.items.slice();
      var DragDiskType = e.dragData.className
      var noItems = items.length == 0
      if(noItems) {
        this.dropItem(e, items)
      } else {
        var onlyLarge = items[items.length-1].className == "Long"
        var dropShortonMed = items[items.length-1].className == "Medium" && DragDiskType == "Short"
        if (onlyLarge || dropShortonMed ) {
          this.dropItem(e, items)
        }  else {
           this.props.returnDisk();
        }
      }
     

  };


  changeStack = () => {
    this.setState({topItem: this.state.items[this.state.items.length-1]})
  }

  kill = (uid) => {
      let items = this.state.items.slice();
      const index = items.findIndex((item) => {
        return item.uid == uid
      });
      if (index !== -1) {
        items.splice(index, 1);
      }
      this.setState({items: items});
  };



  returnTopDisk = () => {
    var items = this.state.items
    if(!items.includes(this.state.topItem) && this.state.topItem != null) {
      console.log('hello!')
      items.push(this.state.topItem)
      this.setState({items: items})
    } 
  }


render() {
      return (
        <div className="component_box">
            <DropTarget 
            targetKey="foo" 
            onHit={this.handleDrop}
            >
            <div className="box">
                  {[...this.state.items].reverse().map((item, index) => {
                    return (
                      <Disk 
                      key={item.uid} 
                      uid={item.uid} 
                      kill={this.kill}
                      destClass = {this.className} 
                      index={index} 
                      className ={item.className}
                      draggable = {index == 0 && !this.state.gameOver}
                      >
                      </Disk>
                    )
                  })}
             </div>
        </DropTarget>
        </div>
      );
    }            
}


export default Destination;