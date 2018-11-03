import React from 'react';

class ComposeForm extends React.Component {
  state = {
    subject: '',
    body: '',
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.composeMessage({ ...this.state });
  }

  updateSubject = e => {
    this.setState({ subject: e.target.value });
  }

  updateBody = e => {
    this.setState({ body: e.target.value });
  }

  render () {
    const header = (
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
    );

    const subjectField = (
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input
            autoFocus
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter a subject"
            name="subject"
            value={this.state.subject}
            onChange={this.updateSubject}
            required
          />
        </div>
      </div>
    );

    const bodyField = (
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea
            name="body"
            id="body"
            className="form-control"
            onChange={this.updateBody}
            value={this.state.body}
            required
          ></textarea>
        </div>
      </div>
    );

    const submitButton = (
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary" />
        </div>
      </div>
    );

    return (
      <form className="form-horizontal well" onSubmit={this.handleSubmit}>
        { header }
        { subjectField }
        { bodyField }
        { submitButton }
      </form>
    );
  }
}

export default ComposeForm;
