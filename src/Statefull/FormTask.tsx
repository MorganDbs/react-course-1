import React, {Component, FormEvent, MouseEventHandler} from 'react';
import Button from '../Stateless/Button';


interface Props {
  send :Function,
}

class FormTask extends Component <Props> {   

  state = {
    text : '',
    description: '',
    assignedTo: '',
    priority: '0',
  }
  
  onSubmit = (e :FormEvent) => {
    e.preventDefault();
    this.props.send(this.state.text, this.state.description, this.state.assignedTo, this.state.priority);
    this.setState({
      newTask : '',
      description: '',
      assignedTo: '',
      priority: '0',
    })
  }

  
  render() {
  
    return (

      <>
        <form>
          <div className="col-5 m-1">
            <label htmlFor="task">new task</label>
            <input type="text" id="task" className="form-control" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} />
          </div>
          <div className="col-4 m-1">
            <label htmlFor="description">description</label>
            <input type="text" id="description" className="form-control" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
          </div>
          <div className="col-4 m-1">
            <label htmlFor="assignedTo">assigned to</label>
            <input type="text" id="assignedTo" className="form-control" value={this.state.assignedTo} onChange={(e) => this.setState({assignedTo: e.target.value})} />
          </div>
          <div className="col-3 m-1">
            <label htmlFor="task">priority</label>
            <select className="mb-3" name="task" id="task" value={this.state.priority} onChange={(e) => this.setState({priority: e.target.value})}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </form>
        <Button type="submit" color="success" clic={this.onSubmit}>Envoyer</Button>
        {/* <button className='btn btn-success' type="submit" onClick={this.onSubmit}>Envoyer</button> */}
      </>

      );

  }
}

export default FormTask;