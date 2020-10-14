// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button } from './widgets';
import taskService, { type Task } from './task-service';

class SourceCode extends Component {
  input = '';

  render() {
    return (
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
            taskService.create(this.input).then(() => {
              // Reloads the tasks in the Tasks component
              TaskList.instance()?.mounted(); // .? meaning: call TaskList.instance().mounted() if TaskList.instance() does not return null
              this.input = '';
            });
          }}
        >
          Submit
        </Button.Success>
      </Card>
    );
  }
}

class CodeOutput extends Component {

  render() {
    return (
      <Card title="Code output">
        <Row>
          <Column width={12}>
            <Form.Label>The output of your code will be shown here:</Form.Label>
          </Column>
        </Row>
        <Row>
          <Column width={12}>
            <div class="p-3 mb-2 bg-dark text-white">Some code output</div>
          </Column>
        </Row>
      </Card>
    );
  }

  mounted() {
    taskService.getAll().then((tasks) => (this.tasks = tasks));
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <>
      <SourceCode />
      <CodeOutput />
    </>,
    root
  );
