import React, { Component } from 'react';

export class MyData extends Component {
    static displayName = MyData.name;

    constructor(props) {
      super(props);
      this.state = { forecasts: [], loading: true , products:[], id:0,price:0,name:""};
    }
    onIdChange(event) {
        this.setState({ id: event.target.value });
    }
    onPriceChange(event) {
        this.setState({ price: event.target.value });
    }
    onNameChange(event) {
        this.setState({ name: event.target.value });
    }
    componentDidMount() {
        this.populateProducts();
    }
    async postProducts() {
        const item = {
            id: this.state.id,
            price: this.state.price,
            name: this.state.name
        };
        const response = await fetch('products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        const data = await response.json();
        this.setState({ products: data });
    }
    async populateProducts() {
        const response = await fetch('products');
        const data = await response.json();
        
        this.setState({ products: data });
    }
 

  render() {
    return (
      <div>
            <h1 id="tabelLabel" >Product</h1>
            <div className="row"> <div className="col-sm-2">Name</div> <div><input type="text" maxLength="200" value={this.state.name} onChange={(event) => this.onNameChange(event)}></input></div> </div>
            <div className="row"> <div className="col-sm-2">Price</div> <div><input type="number" min="0" max="9999" value={this.state.price} onChange={(event) => this.onPriceChange(event)}></input></div> </div>
            
            <div></div>
            <div><button onClick={() => this.postProducts()}>Add</button></div>
            {this.state.products.length > 0 &&
                <div>
                <div className="row">
                    <div className="col-sm-3">
                    ID
                    </div>
                    <div className="col-sm-3">
                    Name
                    </div>
                    <div className="col-sm-3">
                    Price
                    </div>
                </div>
                {
                    this.state.products.map(data =>
                        <div className="row" key={data.id}>
                            <div className="col-sm-3">
                                {data.id}
                            </div>
                            <div className="col-sm-3">
                                {data.name}
                            </div>
                            <div className="col-sm-3">
                                ${data.price}
                            </div>

                        </div>
                    )
                }
                </div>
            }
        
      </div>
    );
  }

}
