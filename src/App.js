import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './actions/contactAction';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ''
    }
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let contact = {
      name: this.state.name
    }
    this.props.createContact(contact);
    console.log(this.state.name);
  }
  listView(data, index) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <li key={index} className="list-group-item clearfix">
              {data.name}
            </li>
          </div>
          <div className="col-md-2">
            <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
              Remove
          </button>
          </div>
        </div>
      </div>
    )
  }

  deleteContact(e, index) {
    e.preventDefault();
    this.props.deleteContact(index);
  }


  render() {
    return (
      <div>
        <h1 className="header"><i>Clientside Contacts Application</i></h1>
        <hr />
        <div className="col-md-10">
          <h3>Add Contact Form</h3>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="Name" hidden>firstName</Label>
              <Input type="text" name="Name" value={this.state.name} placeholder="Name" onChange={this.handleChange} />
            </FormGroup>
            <Button className="secondary-btn">Submit</Button>
          </Form>
        </div>
        <hr />
        {<ul className="list-group">
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index => dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
