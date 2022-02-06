import React, {Component, FormEvent, ReactElement} from 'react';
import './App.css';
import NewListForm from './Statefull/newListForm';
import List from './Stateless/List';


class App extends Component{

  state = {
    // lists : Array(),
    lists: [{
      key: 1, 
      id: 1, 
      title: 'To do'}],
    newTitle   : '',
    lastIdList : 1,
    filterText :'',
  }
  
  handleDeleteList = (id :number) => {
    const listsIndexTab = this.state.lists.findIndex(index => {
      return index.id === id;            //retourne l'index du tableau
    });
    //Principe d'immutabilité :
    const newLists = [...this.state.lists]; //copie du tableau
    newLists.splice(listsIndexTab, 1);      //découpe la ligne souhaité dans le tableau copié
    this.setState({ lists : newLists });    //fusion du nouveau tableau avec l'ancien
    console.log('deleted'+id);
  }

  handleOnCreate = (key:number, id :number, title :string) => {
    
    const listIndexTab = this.state.lists.findIndex(index => {
      return index.id === id;
    });

    const newList = {
      key : this.state.lastIdList + 1,
      id  : this.state.lastIdList + 1,
      title : title,
    };

    const newArrayLists = [...this.state.lists];
    newArrayLists.push(newList);
  
    // const newList = <List key={this.state.lastIdList + 1} id={this.state.lastIdList + 1} title={this.state.newTitle} delete={this.handleDeleteList}/>
    // this.state.lists.push(newList);
    
    this.setState({ 
      lists: newArrayLists,
      lastIdList: this.state.lastIdList + 1,
    });
    
    console.log('Liste créée !');
  }
  
  handleFilterTextChange (filterText :string) {
    this.setState({filterText});
  }

  render() {
    
    return (
    
      <div className="container-fluid p-3 h-100">
        <NewListForm 
          filterText={this.state.filterText} 
          onCreate={this.handleOnCreate.bind(this)} 
          onhandleFilterTextChange={this.handleFilterTextChange.bind(this) }/>
        <div className="lists row p-3">
          
          {this.state.lists.map(list => { 
            return ( 
              <ul key={list.id}>
                <List 
                  key={this.state.lastIdList + 1} 
                  id={this.state.lastIdList + 1} 
                  title={this.state.newTitle} 
                  delete={this.handleDeleteList.bind(this)}
                />    
              </ul>
            );
          })}
          
          {/* {this.state.lists} */}
        </div>
      </div>

    )
  }
}

export default App;