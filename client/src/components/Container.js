import React from 'react';
import { Link } from '@reach/router';

export class Container extends React.Component {
  render() {
    const { _id, title, description, image, ingredients, preparation } = this.props.container;
    return (
      <div>
        <img
          // src={`http://oit2.scps.nyu.edu/~devereld/intermediate/img/${image}`}
          src={`/img/${image}`}
          alt={title}
        />

        <Link to={`/container/${_id}`}>
          <h3>{title}</h3>
        </Link>

        <p>{description}</p>
      </div>
    );
  }
}

export default Container;
