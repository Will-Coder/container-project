import React from 'react';
import Containers from './Containers';
import ContainerDetails from './ContainerDetails';
import ContainerMaintenance from './ContainerMaintenance';
import EditContainer from './EditContainer';
import FileUpload from './FileUpload';

import { Router, Link } from '@reach/router';

class App extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      containers: [],
      isLoading: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }


  componentDidMount() {
    fetch(`http://localhost:5000/api/containers`)
      .then(response => response.json())
      .then(containers =>
        this.setState({
          containers: containers,
        }),
      );
  }

  addContainer = container => {
    this.setState({ isLoading: true });
    fetch(`http://localhost:5000/api/containers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(container)
    })
      .then(response => response.json())
      .then(container => console.log(container));
    const containers = [...this.state.containers];
    containers.unshift(container);
    this.setState({ containers: containers, isLoading: false });
  };


  handleDelete(id) {
    // console.log(this.state);
    // console.log(id);

    fetch(`http://localhost:5000/api/containers/${id}`, {
      method: 'DELETE'
    });
    const containers = [...this.state.containers];
    containers.splice(id, 1);
    this.setState({ containers: containers });
  }

  render() {
    if(this.state.isLoading){
      return 'Loading...'
    }
    return (
      <div>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/maintenance'>Maintenance</Link>
        </nav>
        <Router>
          <Containers path="/" containers={this.state.containers} />
          <ContainerDetails path="/container/:containerId" />
          <ContainerMaintenance 
          path="/maintenance" 
          addContainer={this.addContainer}
          containers={this.state.containers}
          handleDelete={this.handleDelete}
          />
          <EditContainer 
          path="/editcontainer/:containerId" 

          />
          <FileUpload path="/container/:containerId" />
        
        </Router>
      </div>
    );
  }
}

export default App;
