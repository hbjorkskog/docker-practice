// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button } from './widgets';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

class SourceCode extends Component {
  input = '';
  exitStatus = null;
  stdout = '';
  stderr = '';

  render() {
    return (
      <>
      <Card title="Javascript online code editor">
        <Row>
          <Column width={12}>
            <Form.Label>Write your code here:</Form.Label>
          </Column>
          <Column width={12}>
            <Form.Textarea
              value={this.input}
              onChange={(event) => (this.input = event.currentTarget.value)}
              rows={10}
            />
          </Column>
        </Row>
        <Button.Success
          onClick={() => {
            axios
                .post<
                  { language: string, source: string },
                  { exitStatus: number, stdout: string, stderr: string }
                >('/run', { language: 'js', source: this.input })
                .then((response) => {
                  this.exitStatus = response.data.exitStatus;
                  this.stdout = response.data.stdout;
                  this.stderr = response.data.stderr;
                })
                .catch((error: Error) => Alert.danger('Could not run app.js: ' + error.message));
          }}
        >
          Submit
        </Button.Success>
      </Card>

      <Card title="Code output">
      <Row>
        <Column width={12}>
          <Form.Label>The output of your code will be shown here:</Form.Label>
        </Column>
      </Row>
      <Row>
        <Column width={12}>
        <div class="p-3 mb-2 bg-dark text-white" title="Standard error">{'Standard output: ' + (this.stdout ?? '')}</div>
          <div class="p-3 mb-2 bg-dark text-white" title="Standard error">{'Standard error: ' + (this.stderr ?? '')}</div>
          <div class="p-3 mb-2 bg-dark text-white" title="Exit status">{'Exit status: ' + (this.exitStatus ?? '')}</div>

        </Column>
      </Row>
      </Card>
      </>
    );
  }
}


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <>
      <Alert />
      <SourceCode />
    </>,
    root
  );
