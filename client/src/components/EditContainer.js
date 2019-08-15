import React from 'react';
import Container from './Container';
import { Link } from '@reach/router';

class EditContainer extends React.Component {
  state = {
    container: [],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`http://localhost:5000/api/containers/${this.props.containerid}`)
      .then(response => response.json())
      .then(container =>
        this.setState({
          container: container,
          isLoading: false
        })
      );
  }

  handleSubmit() {
    return false;
  }

  render() {
    //const { container } = this.props;
    //const {  title, description, image, ingredients, preparation } = this.props.container;
 
    return (
      <div>
        <h3>EDIT RECIPE</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Container Title'
            name='title'
            value={this.state.container.title}
          />
          <input
            type='text'
            placeholder='Image'
            name='image'
            value={this.state.container.image}
          />
          <textarea
            type='text'
            placeholder='Description'
            name='description'
            value={this.state.container.description}
          />
          <button>Update</button>
        </form>
      </div>
    );
  }
}

export default EditContainer;