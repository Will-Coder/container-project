import React, { Component, createRef } from 'react';
import { Link } from '@reach/router';
import { FaTimesCircle } from 'react-icons/fa';
//import {styled} from styled-components

class ListContainers extends Component {
 handleDelete(id) {
    fetch(`http://localhost:5000/api/containers/${id}`, {
      method: 'DELETE'
    }).then(response => console.log(response));
  }
    render() {
      return (
        <ul>
          {this.props.containers.map(container => (
            <li key={container._id}>
              {/* {container.title}{' '} */}

              <Link to={`/editcontainer/${container._id}`}>{container.title}{' '}</Link>
              <button 
                style={{ backgroundColor: 'transparent', border:'none' }}
                onClick={() => this.handleDelete(container._id)}>
                <FaTimesCircle color='rgb(194, 57, 42)' size={20} />
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }



class ContainerMaintenance extends Component {
    titleRef = createRef();
    imageRef = createRef();
    descriptionRef = createRef()

    createContainer(e) {
        e.preventDefault();
        const container = {
          title: this.titleRef.current.value,
          image: this.imageRef.current.value,
          description: this.descriptionRef.current.value
        };
        this.props.addContainer(container);
      }
    render() {
        return (
          <div>
              <h3>Add Container Form</h3> 
              <form onSubmit={e => this.createContainer(e)}>
                <input type="text" placeholder="Container Title" name="title"  ref={this.titleRef} />
                <input type="text" placeholder="Image" name="image" ref={this.imageRef} />
                <textarea
                type="text"
                placeholder="Description"
                name="description"
                ref={this.descriptionRef}
                ></textarea>
                <button type="submit">Submit</button>
                <button type="button">Import All</button>
                <button type="button">Purge All</button>
              </form>
              <ListContainers 
                containers={this.props.containers}
                handleDelete={this.handleDelete} 
              />
            </div>
        );
    }
}

export default ContainerMaintenance