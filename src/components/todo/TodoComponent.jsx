import React, { Component } from 'react';
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      description: '',
      targetDate: moment(new Date()).format('YYYY-MM-DD')
    }
  }

  validate = (values) => {
    let errors = {}
    if (!values.description) {
      errors.description = 'Enter a Description'
    } else if (values.description.length < 5) {
      errors.description = 'Enter at least 5 characters in Description'
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = 'Enter a valid Target date'
    }
    return errors

  }

  // onSubmit = (values) => {

  //   const username = AuthenticationService.getLoggedInUser();

  //   if (this.state.id === -1) {
  //     TodoDataService.createTodo(username, {
  //       id: this.state.id,
  //       description: values.description,
  //       targetDate: values.targetDate
  //     })
  //       .then(
  //         () => {
  //           this.props.history.push('/todos')
  //         }
  //       )
  //   } else {

  //     TodoDataService.updateTodo(username, {
  //       id: this.state.id,
  //       description: values.description,
  //       targetDate: values.targetDate
  //     })
  //       .then(
  //         () => {
  //           this.props.history.push('/todos')
  //         }
  //       )
  //   }

  // }
  onSubmit = (values) => {
    let username = AuthenticationService.getLoggedInUser()

    let todo = {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate
    }

    if (this.state.id === -1) {
      TodoDataService.createTodo(username, todo)
        .then(() => this.props.history.push('/todos'))
    } else {
      TodoDataService.updateTodo(username, this.state.id, todo)
        .then(() => this.props.history.push('/todos'))
    }
  }

  componentDidMount() {
    if (this.state.id === -1) {
      return
    }

    const username = AuthenticationService.getLoggedInUser();
    TodoDataService.retrieveTodo(username, this.state.id)
      .then(response => {
        this.setState({
          description: response.data.description,
          targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
        })
      })
  }

  render() {
    const description = this.state.description
    const targetDate = this.state.targetDate
    return (
      <div>
        <h1>Todo</h1>
        <div className="container">
          <Formik initialValues={{ description, targetDate }} onSubmit={this.onSubmit} validate={this.validate} validateOnChange={false} validateOnBlur={false} enableReinitialize={true}>
            {
              (props) => (
                <Form>
                  <ErrorMessage name="description" component="div"
                    className="alert alert-warning" />
                  <ErrorMessage name="targetDate" component="div"
                    className="alert alert-warning" />
                  <fieldset className="form-group">
                    <label>Description</label>
                    <Field className="form-control" type="text" name="description" />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Traget Date</label>
                    <Field className="form-control" tyep="date" name="targetDate" />
                  </fieldset>
                  <button className="btn btn-success" tyep="submit">Save</button>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    )
  }
}

export default TodoComponent