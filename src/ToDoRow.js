import React, {Component} from 'react';

export class ToDoRow extends Component {

    render = () =>
    //Below we define the value for the onChange event property as a callback().  This is how child components are able to communicate 
    //with parent components as they cannot update the value props passed to them from a parent component because React only supports
    //a one-way data flow (from parent to child).  However, the parent can provide a function property (prop) that children can call
    //upon whenever an important event happens.
    //There are two different types of properties
    //1. Data prop - allows the parent to pass data to the chile 
    //2. Function prop - allows the child to communicate with the parent
    <tr>
        <td>{this.props.item.action}</td>
        <td>
            <input type="checkbox" checked={this.props.item.done} onChange={() => this.props.callback(this.props.item)} />
        </td>
    </tr>
}