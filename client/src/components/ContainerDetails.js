import React from 'react';
import { Link } from '@reach/router';

class ContainerDetails extends React.Component {
  state = {
    container: [],
    ingredients: [],
    preparation: [],
  };

  componentDidMount() {
    fetch(`http://localhost:5000/api/containers/${this.props.containerId}`)
      .then(response => response.json())
      .then(container =>
        this.setState({
          container: container,
          ingredients: container.ingredients,
          preparation: container.preparation,
        }),
      );
  }

  render() {
    const { _id, title, description, image } = this.state.container;

    return (
      <div>
        <img
          //src={`http://oit2.scps.nyu.edu/~devereld/intermediate/img/${image}`}
          src={`/img/${image}`}
          //src={`http://localhost:5000/img/${image}`} alt={title} />
          alt={title}
        />
        <h3>
          <Link to={`/container/${_id}`}>{title}</Link>
        </h3>
        <p>{description}</p>
        <h4>Ingredients</h4>
        <ul>
          {this.state.ingredients.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>Preparation</h4>
        <ul>
          {this.state.preparation.map(prep => (
            <li key={prep.step}>{prep.step}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContainerDetails;
