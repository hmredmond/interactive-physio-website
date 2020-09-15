import React, { Component } from "react";

export default class breadcrumbs extends Component {
  render() {
    const { page, homepage, parent } = this.props;
    return (
      <ul className="breadcrumbs">
        {homepage && (
          <li>
            <a href="/">Home</a>/
          </li>
        )}
        <li>
          <a href={parent.link}>{parent.title}</a>/
        </li>
        <li>{page}</li>
      </ul>
    );
  }
}
