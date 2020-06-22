import React, {Component} from 'react';

export class ToDoBanner extends Component {
    render = () =>
    <h1 className="bg-primary text-white text-center p-2">
        {this.props.name}'s To Do List ({this.props.tasks.filter(t => !t.done).length} items to do)
    </h1>
}