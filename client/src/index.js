// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Form, Button } from './widgets';
import taskService, { type Task } from './task-service';

class TaskList extends Component {
  tasks: Task[] = [];

  render() {
    return (
      <Card title="Tasks">
        <Row>
          <Column width={4}>
            <b>Title</b>
          </Column>
          <Column width={1}>
            <b>Done</b>
          </Column>
        </Row>
        {this.tasks.map((task) => (
          <Row key={task.id}>
            <Column width={4}>{task.title}</Column>
            <Column width={1}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {
                  taskService
                    .update({ id: task.id, title: task.title, done: !task.done })
                    .then(() => this.mounted()); // Update tasks if success
                }}
              ></input>
            </Column>
            <Column width={1}>
              <Button.Danger
                small
                onClick={() => taskService.delete(task.id).then(() => this.mounted())} // Update tasks if success
              >
                ×
              </Button.Danger>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    taskService.getAll().then((tasks) => (this.tasks = tasks));
  }
}

class TaskNew extends Component {
  title = '';

  render() {
    return (
      <Card title="New task">
        <Row>
          <Column width={1}>
            <Form.Label>Title:</Form.Label>
          </Column>
          <Column width={4}>
            <Form.Input
              type="text"
              value={this.title}
              onChange={(event) => (this.title = event.currentTarget.value)}
            />
          </Column>
        </Row>
        <Button.Success
          onClick={() => {
            taskService.create(this.title).then(() => {
              // Reloads the tasks in the Tasks component
              TaskList.instance()?.mounted(); // .? meaning: call TaskList.instance().mounted() if TaskList.instance() does not return null
              this.title = '';
            });
          }}
        >
          Create
        </Button.Success>
      </Card>
    );
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <>
      <TaskList />
      <TaskNew />
    </>,
    root
  );
