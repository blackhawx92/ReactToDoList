import React, {Component} from 'react';
//Above, we have imported 2 things:
//1. The default functionality (export) from the React package and assigned that functionality the name React.
//2. The component class from the React package.
//These import statements are similar to adding a using statement in C#.
import logo from './logo.svg';
import './App.css';
import {ToDoBanner} from './ToDoBanner';
import {ToDoRow} from './ToDoRow';
import {ToDoCreator} from './ToDoCreator';
import {VisibilityControl} from './VisibilityControl'


export default class App extends Component {
  //Above, we have created a class called App that extends the functionality of the Component class in the React package.
  //The export keyword makes the class available for use outside of the JS file where it is created (like the public access
  //modifier in C#),

  //We are going to create state data for our component.  To do that, we need to create a constructor method.  This method 
  //will get called when an object is created using this class.  Said another way, this method will be called when the 
  //component is initialized.

  //To ensure we have all of the necessary features from React to create a stateful component, we need to call the super ()
  //calls the constructor for the Component class in React.
  constructor(props){
    super(props);

    //React components have a special property called state which is what we will use to define state data.
    this.state = {
      userName: "Breanna",
      todoItems: [
        {
          action: "Paint the bedroom",
          done: false
        },
        {
          action: "Do the laundry",
          done: false
        },
        {
          action: "Clean the dishes",
          done: true
        },
        {
          action: "Sleep",
          done: false
        },
        {
          action: "Take the dog for a walk",
          done: false
        }      
      ],
      showCommpleted: true
    }
  } 

  todoTableRows = (doneValue) => this.state.todoItems.filter(item => item.done == doneValue).map(item =>
    <ToDoRow key={item.action} item={item} callback={this.toggleTodo} />
  );


  updateNewTextValue = (event) => {
    this.setState(
      {
        newItemText: event.target.value
      }
    );

  }

  //We use setState() above because state data should not be updated directly.  When setState() is called, the component data
  //is updated with new values and the render() is invoked so that the UI will be updated.


    //Map() is mapping each item in the todoItems collection to a frabment of HTML
    //When JSX gets traspiled into a backwards compatible JS, this will just be a collection of props in an object.  We do not
    //want to utilize the default key for each item in the object.  Therefore, we define what the key will be with the key 
    //attribute on each <tr>.

    //The setState() below recreates the todoItems property on our state data object/  It uses the spread operator (...) to
    //ensure all previous items that were already in the todoItems colletion are added back in.  Then, a new item is added
    //to the collection.

  toggleTodo = (todo) => this.setState(
    {
      todoItems: this.state.todoItems.map(
        item => item.action === todo.action ? {...item, done: !item.done} : item 
      )
    }
  );

  createNewToDo = (task) => {
    if(!this.state.todoItems.find(x => x.action === task))
    {
      this.setState(
        {
          todoItems: [...this.state.todoItems, {action: task, done: false}]
        },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );
    }
  }


  //componentDidMount() is invoked immediately after a component is mount (inserted into the DOM tree)
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null ? JSON.parse(data) : {
      userName: "Breanna",
      todoItems: [
        {action: "Paint the bedroom", done: false},
        {action: "Do the laundry", done: false},
        {action: "Mow the lawn", done: false},
        {action: "Wash dishesc", done: true},
        {action: "Take the dog for a walk", done: false}
        ],
      showCompleted: true
    });
  }


    //Render method below compares the actual DOM with the virtual DOM allowing only the differences to be shown.  In the case below,
  //each todo item is displayed with a checkbox that the user toggles to indicate a task is complete.  Each row in the table will
  //be generated from a todoTableRows function.
  //When we use the fat arrow syntax, you do not have to use the return keyword or put curly braces around the body of the function.
  render = () =>
  <div>
    <ToDoBanner name={this.state.userName} tasks={this.state.todoItems} />
    <div className="container-fluid">
      <ToDoCreator callback={this.createNewToDo} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>       
          </tr>
        </thead>
        <tbody>
          {this.todoTableRows(false)}
        </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks"
          isChecked={this.state.showCommpleted} callback={(checked) => this.setState({showCommpleted: checked})}/>
        </div>
        { this.state.showCommpleted &&
        <table className="table table-striped table bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(true)}</tbody>
        </table>
        }
    </div>
  </div>

}//end App class
