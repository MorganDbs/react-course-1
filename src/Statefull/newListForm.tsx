import React, { ChangeEvent, Component, FormEvent, useState } from "react";
import List from "../Stateless/List";
import { v4 as uuid } from "uuid";

class NewListForm extends Component<NewListFormType, { listTitle: string }> {
  state = {
    listTitle: "",
  };

  handleTitleChange = (e: any) => {
    this.setState({
      ...this.state,
      listTitle: e.target.value,
    });
  };

  handleClick = (e: any) => {
    this.props.onCreate(uuid(), uuid(), this.state.listTitle);
    this.setState({
      listTitle: "",
    });
    e.preventDefault();
  };

  //Pour l'instant cela ne change que le titre, voir comment ajouter une bloc "list" complet (instancier la class ? new List() ?)
  render() {
    const { onCreate, filterText, onhandleFilterTextChange } = this.props;

    return (
      <div className="row">
        <form className="form-group">
          <div className="col-4 p-1">
            <label htmlFor="new_title" style={{ color: "white" }}>
              Créez une nouvelle liste :
            </label>
            <input
              type="text"
              id="new_title"
              className="form-control"
              value={this.state.listTitle}
              onChange={this.handleTitleChange}
            />
            <button className="btn btn-primary" onClick={this.handleClick}>
              Créer
            </button>
            {/* <input type="hidden" id="new_list" />  */}
          </div>
          <div className="col-4 p-1">
            <label htmlFor="filter" style={{ color: "white" }}>
              filter :
            </label>
            <input
              type="text"
              id="filter"
              className="form-control"
              value={filterText}
              onChange={() => {
                onhandleFilterTextChange();
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default NewListForm;
