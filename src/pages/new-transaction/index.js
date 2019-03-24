import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from 'aws-amplify';
import LoaderButton from '../../components/loader-button';
import config from '../../config';
import { s3Upload } from '../../libs/awsLib';

import "./index.css";

export default class NewTransactionPage extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      const attachment = this.file
        ? await s3Upload(this.file)
        : null;

      await this.createNote({
        attachment,
        content: this.state.content
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  render() {
    return (
      <div className="new-expense">
        <h2>
          Add Income/Expense
        </h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="property" className="control-label">Property</label>
            <select id="property" className="form-control">
              <option></option>
              <option>123 Main St.</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="transactionType" className="control-label">
              Transaction Type
            </label>
            <select id="transactionType" className="form-control">
              <option>Expense</option>
              <option>Income</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date" className="control-label">
              Date
            </label>
            <input id="date" type="date" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="category" className="control-label">
              Category
            </label>
            <select id="category" className="form-control">
              <option></option>
              <option>Miscellaneous</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="vendor" className="control-label">
              Vendor
            </label>
            <input id="vendor" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="amount" className="control-label">
              Amount
            </label>
            <input id="amount" type="text" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="control-label">
              Description
            </label>
            <input id="description" type="textarea" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="receiptFile" className="control-label">
              Receipt
            </label>
            <input id="receiptFile" type="file" className="form-control"/>
          </div>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
          <LoaderButton
            block
            bsStyle="secondary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Clear"
            loadingText="Clearing…"
          />
        </form>
      </div>
    );
  }
}
