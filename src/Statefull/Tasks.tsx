import React, {Component, MouseEvent} from 'react';
import Task from './Task';
import FormUpdate from './FormUpdate';
import Form from './FormTask';
import FormTask from './FormTask';


class Tasks extends Component {

  state = {
    tasks : [{
      id:1 ,
      text: '', 
      description: '', 
      assignedTo: '', 
      priority: '', 
      completed: false 
    }],
    lastIdTask: 1,
    idTaskToUpdate: null,
    isAdded : false,
  }
  
  toggleComplete :ToggleComplete = (id) => {
    this.state.tasks.map(task => {
      if (task.id === id) {
        console.log(task.text + 'completed !');
        return {...task, completed: !task.completed}
      }
    })
  }

  
  handleShowForm = () => this.setState(
    { isAdded: !this.state.isAdded }
  );


  handleCreateTask = (id: number, text :string, description :string, assignedTo :string, priority :string,  completed :boolean) => {
    
    const newTask = {
      id          : this.state.lastIdTask + 1,
      text        : text, 
      description : description, 
      assignedTo  : assignedTo, 
      priority    : priority, 
      completed   : completed,
    };

    //Principe d'immutabilité
    const newTasksList = [...this.state.tasks];
    newTasksList.push(newTask);
    this.setState(
      {
        tasks      : newTasksList,
        lastIdTask : this.state.lastIdTask + 1,
      }
    )

    this.handleShowForm();
  }


  handleUpdate = (id :number, text :string, description :string, assignedTo :string, priority :string) => {

    const index = this.state.tasks.findIndex(
      task => {
      return task.id === id;
      }
    );

    const newUpdatedTask :Task = {id, text, description, assignedTo, priority, completed: this.state.tasks[index].completed}

    const newTasks  = [...this.state.tasks];
    newTasks[index] = newUpdatedTask;

    this.setState({
      tasks           : newTasks,
      idTaskToUpdate  : 0,
    })
  }


  handleDeleteTask = (id :number) => {
    const tasksIndexTab = this.state.tasks.findIndex(index => {
      return index.id === id;            //retourne l'index du tableau
    });
    //Principe d'immutabilité :
    const newTasks = [...this.state.tasks]; //copie du tableau
    newTasks.splice(tasksIndexTab, 1);      //découpe la ligne souhaité dans le tableau copié
    
    this.setState({tasks:newTasks});        //fusion du nouveau tableau avec l'ancien
    console.log('deleted'+id);
  }

  
  render() {
    return (
      <>
        <div className="row d-flex flex-column">
          {this.state.isAdded ? <FormTask send={this.handleCreateTask} /> : null}
          <button className='btn btn-primary w-100' type="submit" onClick={this.handleShowForm}>{ this.state.isAdded ? "Fermer l'ajout" : "Ajouter"}</button>
        </div>
        
        {this.state.tasks.map(
          task => {
            if(task.id !== this.state.idTaskToUpdate) {
              return (
                <ul key={task.id}>
                  <Task
                    id              = {task.id} 
                    text            = {task.text} 
                    description     = {task.description} 
                    assignedTo      = {task.assignedTo} 
                    priority        = {task.priority}
                    completed       = {task.completed}
                    toggleComplete  = {this.toggleComplete.bind(this)}
                    delete          = {this.handleDeleteTask.bind(this)}
                    update          = {this.handleUpdate.bind(this)}
                  />
                </ul>
              );
            } else {
              return (
              <ul key={task.id}>
                <FormUpdate
                  id            = {task.id} 
                  text          = {task.text} 
                  description   = {task.description} 
                  assignedTo    = {task.assignedTo} 
                  priority      = {task.priority} 
                  confirmUpdate = {this.handleUpdate.bind(this)} />;
              </ul>
              );
            }
          }
        )}
      </>
    );
  }
}

export default Tasks;