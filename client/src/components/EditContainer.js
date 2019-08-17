import React from 'react';

class EditContainer extends React.Component {
  state = {
    container: [],
    title:'',
    image: '',
    description:'',
    ingredients:[],
    preparation:[],
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`http://localhost:5000/api/containers/${this.props.containerId}`)
      .then(response => response.json())
      .then(container =>
        this.setState({
          container: container,
          isLoading: false
        })
      );
  }

  handleChange = event => {
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    //this.setState({ title: event.target.value });
    this.setState({ [name]: value });

  };

  handleSubmit = e => {
    
    e.preventDefault();
    //console.log(this.state.title);
    alert('submitted: ');

    // dynamically create update dictionary payload
    const map = new Map();
    (this.state.title) && map.set("title", (this.state.title));
    (this.state.image) && map.set("image", (this.state.image));
    (this.state.description) && map.set("description", (this.state.description));
    
    //TODO:   ['ingredient', 'ingredient', 'ingredient', '...']"
    //(this.state.ingredients) && map.set("ingredients", (this.state.ingredients));
   
    //TODO: [{ step: 'task'}, {step: 'task'}, {...}]"
    //(this.state.preparation) && map.set("preparation", (this.state.preparation));

    // key: value pair dictionary  {key:value, key:value, ...}
    let objPayload = Object.fromEntries(map.entries());
    console.log("**** objPayload is*****");
    console.log(objPayload);

    // const updatedContainer = {     
    //   title: this.state.title
    // };
    const updatedContainer = objPayload;

    const options = {
      method: 'PUT',
      body: JSON.stringify(updatedContainer),
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(
      `http://localhost:5000/api/containers/${this.props.containerId}`,
      options
    ).then(response => console.log(response));

    //Note: Workaround - the page data is not automatically refreshing
    //TODO: find a solution ; figure out the problem 
    //window.location.reload(); 
    //this.setState(this.state);
    //this.setState({ nonUsedKey: Date.now() } );
    
  };

  render() {

    return (
      <div>
        
        <form onSubmit={e =>this.handleSubmit(e)}>
        <h3>Edit Container Form</h3>
        <p>Current title: {this.state.container.title}</p>      
          <input
            type='text'
            placeholder='New Title'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
          <p>Current Image: {this.state.container.image}</p>  
          <input
            type='text'
            placeholder='New Image'
            name='image'
            value={this.state.image}
            onChange={this.handleChange}
          />
          <p>Current Description: {this.state.container.description}</p>  
          <textarea
            type='text'
            placeholder='New Description'
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
          />
          {/* <p>Current ingredients: {this.state.container.ingredients}</p>      
          <input
            type='text'
            placeholder="['ingredient', 'ingredient', 'ingredient', '...']"
            name='ingredients'
            value={this.state.ingredients}
            onChange={this.handleChange}
            disabled
          />
          <p>Current preparation: {this.state.container.preparation}</p>      
          <input
            type='text'
            placeholder=" [{ step: 'task'}, {step: 'task'}, {...}]"
            name='preparation'
            value={this.state.preparation}
            onChange={this.handleChange}
            disabled
          /> */}
          <div className="mainBtn">
            <button type="submit" className="mButton">Submit</button>
          </div>
          <p>Note:This page does not automatically refresh after an update.
             For best results, please refresh the page after submitting.
             This issue shall be corrected in future releases.</p>
        </form>
      </div>
    );
  }
}

export default EditContainer;