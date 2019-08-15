import React from 'react';
import Container from './Container';

class Containers extends React.Component {
  render() {
    const { containers } = this.props;
    return (
      <div>
        {containers.map(container => (
          <Container key={container._id} container={container} />
        ))}
      </div>
    );
  }
}

export default Containers;
