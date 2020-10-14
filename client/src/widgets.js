// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

/**
 * Renders an information card using Bootstrap classes.
 */
export class Card extends Component<{ title?: React.Node, children?: React.Node }> {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <div className="card-text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

/**
 * Renders a row using Bootstrap classes.
 */
export class Row extends Component<{ children?: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes.
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
  render() {
    return (
      <div
        className={
          'col' +
          (this.props.width ? '-' + this.props.width : '') +
          (this.props.right ? ' text-right' : '')
        }
      >
        {this.props.children}
      </div>
    );
  }
}

/**
 * Renders a success button using Bootstrap styles.
 */
class ButtonSuccess extends Component<{
  onClick: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-success' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a danger button using Bootstrap styles.
 */
class ButtonDanger extends Component<{
  onClick: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-danger' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a light button using Bootstrap styles.
 */
class ButtonLight extends Component<{
  onClick: () => mixed,
  small?: boolean,
  children?: React.Node,
}> {
  render() {
    return (
      <button
        type="button"
        className={'btn btn-light' + (this.props.small ? ' btn-sm py-0' : '')}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

/**
 * Renders a button using Bootstrap styles.
 */
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

/**
 * Renders a NavBar link using Bootstrap styles.
 */
class NavBarLink extends Component<{ to: string, children?: React.Node }> {
  render() {
    return (
      <NavLink className="nav-link" activeClassName="active" to={this.props.to}>
        {this.props.children}
      </NavLink>
    );
  }
}

/**
 * Renders a NavBar using Bootstrap classes.
 */
export class NavBar extends Component<{ brand?: React.Node, children?: React.Node }> {
  static Link = NavBarLink;

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        {
          <NavLink className="navbar-brand" activeClassName="active" exact to="/">
            {this.props.brand}
          </NavLink>
        }
        <ul className="navbar-nav">{this.props.children}</ul>
      </nav>
    );
  }
}

/**
 * Renders a form label using Bootstrap styles.
 */
class FormLabel extends Component<{ children?: React.Node }> {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

/**
 * Renders a form input using Bootstrap styles.
 */
class FormInput extends Component<{
  type: string,
  value: React.Node,
  onChange: (SyntheticEvent<HTMLInputElement>) => mixed,
  required?: boolean,
}> {
  render() {
    return (
      <input
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        required={this.props.required}
      />
    );
  }
}

/**
 * Renders a form selection using Bootstrap styles.
 */
class FormSelect extends Component<{
  value: React.Node,
  onChange: (SyntheticEvent<HTMLSelectElement>) => mixed,
  children?: React.Node,
  required?: boolean,
}> {
  render() {
    return (
      <select
        className="custom-select"
        value={this.props.value}
        onChange={this.props.onChange}
        required={this.props.required}
      >
        {this.props.children}
      </select>
    );
  }
}

/**
 * Renders a form textarea using Bootstrap styles.
 */
class FormTextarea extends React.Component<{
  value: React.Node,
  onChange: (SyntheticEvent<HTMLTextAreaElement>) => mixed,
}> {
  render() {
    // ...rest will contain extra passed attributes such as disabled, required, rows, cols
    // For further information, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const { value, onChange, ...rest } = this.props;
    return <textarea {...rest} className="form-control" value={value} onChange={onChange} />;
  }
}

/**
 * Renders form components using Bootstrap styles.
 */
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
  static Select = FormSelect;
  static Textarea = FormTextarea;
}
