import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      age: 0,
      count: 0,
      result: false,
      isLoaded: false,
      items: {
        age: null,
        count: null,
        name: null
      }
    }
  }
  handleInput = (name, value) => {
    if (name === "name") {
      let result = /^[a-zA-Z ]+$/.test(value);
      this.setState({
        [name]: value,
        result: result
      })
    }

    this.setState({
      [name]: value
    })
  }
  handleSubmit = () => {
    const { name, result } = this.state
    if (result) {
      fetch(`https://api.agify.io/?name=${name}`)
        .then(res => res.json())
        .then(
          (res2) => {
            this.setState({
              isLoaded: true,
              items: res2
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }


  }
  render() {
    console.log(this.state);
    const { result, items } = this.state
    return (
      <div className="App">

        <header className="App-header">
          <div className="container">

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="card" >
                      <img src="https://img.icons8.com/dusk/452/change-user-male.png" class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{items.name ? String(items.name).toUpperCase() : ""}</h5>
                        <p class="card-text">Description</p>
                        <button type="button" class="btn btn-primary">
                          Age {items.age ? items.age : ""} <span class="badge bg-secondary">{items.count ? items.count : ""}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); this.handleSubmit() }}>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Enter Your Name" aria-label="Enter Your Name" name="name" onChange={(e) => this.handleInput(e.target.name, e.target.value)} aria-describedby="button-addon2" autoFocus />
                <button disabled={!result} class={result ? "btn btn-outline-success" : "btn btn-outline-danger"} data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit" id="button-addon2">Submit</button>
              </div>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
