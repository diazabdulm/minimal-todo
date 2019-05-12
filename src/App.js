import React, { Component } from 'react';
import M from 'materialize-css';
import './App.css';

class Input extends Component {
    state = {
        taskName: ''
    }
    handleName = (e) => {
        // update task in state
        let userInput = e.target.value;
        this.setState({
            taskName: userInput
        })
    }
    handleSubmitTask = (e) => {
        // if user pressed enter, add task and clear input
        // also checks if taskName isn't blank
        if (e.key === 'Enter' && this.state.taskName.trim()) {
            this.props.addTask(this.state.taskName)
            this.setState({
                taskName: ''
            })
        }
    }
    render() {
        return (
            <div>
              <input value={this.state.taskName} onChange={ this.handleName } onKeyDown={ this.handleSubmitTask } />
            </div>
        );
    }
}

class TaskItem extends Component {
    delete = () => {
        this.props.delete(this.props.index)
    }
    render() {
        return <li onClick={this.delete}>{this.props.name}</li>
    }
}

class TaskList extends Component {
    deleteTask = (index) => {
        this.props.removeTask(index);
    }
    render() {
        return (
            <div>
              {this.props.tasks.map((name, index) => {
                return <TaskItem key={index} index={index} name={name} delete={() => this.deleteTask(index)} />
              })}
            </div>
        );
    }
}

class ToDoApp extends Component {
    state = {
        tasks: []
    }
    handleTaskDelete = (index) => {
        // array copy made, to avoid manipulating immutable state
        const tasks = [...this.state.tasks];
        tasks.splice(index, 1);
        this.setState({
            tasks: tasks
        });
    }
    pushNewTask = (taskName) => {
        this.setState({
            tasks: [...this.state.tasks, taskName]
        })
    }
    render() {
        return (
            <div>
              <Input addTask={this.pushNewTask} /> 
              <TaskList tasks={this.state.tasks} removeTask={(index) => this.handleTaskDelete(index)} /> 
            </div>
        );
    }
}

export default ToDoApp;