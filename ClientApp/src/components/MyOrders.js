import React, { Component } from 'react';

export class MyOrders extends Component {
    static displayName = MyOrders.name;

    constructor(props) {
      super(props);
      this.state = { orders: [], products:[], selectProducts:[],total:0};
    }
   
    componentDidMount() {
        this.populateProducts();
        this.populateOrders();
    }
    handleChange(id, event) {
        console.log(id);
        console.log(event);
        const selectProducts = this.state.selectProducts;
        let product = selectProducts.find(p => p.id == id);
    
        product.selected = !product.selected;
        product.productId = id;
        let index = selectProducts.findIndex(p => p.id == id);
     
         selectProducts.splice(index, 1, product);
        this.setState({ selectProducts: selectProducts });
 
    }
    handleQuantityChange(id, event) {
        console.log(id);
        console.log(event.target.value);
        const selectProducts = this.state.selectProducts;
        let product = selectProducts.find(p => p.id == id);

        product.quantity = event.target.value;

        let index = selectProducts.findIndex(p => p.id == id);
        console.log(index);
        selectProducts.splice(index, 1, product);
        this.setState({ selectProducts: selectProducts });

    }
    async postOrders() {
        const items = this.state.selectProducts.filter(p => p.selected == true && p.quantity > 0);
        console.log(items);
        const response = await fetch('orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        })
        const data = await response.json();
        console.log(data);
        this.setState({ orders: data });
        this.calculateTotal(data);
    }
    async populateProducts() {
        const response = await fetch('products');
        
        const data = await response.json();
        console.log(data);
        this.setState({ products: data, selectProducts: data });
    }
    async populateOrders() {
        const response = await fetch('orders');

        const data = await response.json();
        console.log(data);
        this.setState({ orders: data });
        this.calculateTotal(data);
    }
    calculateTotal(orders) {
        let total = 0;
        console.log(orders);
        for (let order of orders) {
            console.log(order);
            if (!isNaN(order.subtotal))
                total += order.subtotal;
        }
        this.setState({ total });
    }
 

  render() {
    return (
      <div>
            <h1 id="tabelLabel" >Products</h1>
            
            {this.state.products.length > 0 &&
                <div>
                <div className="row">
                    <div className="col-sm-1">
                        
                    </div>
                    <div className="col-sm-2">
                    ID
                    </div>
                    <div className="col-sm-3">
                    Name
                    </div>
                    <div className="col-sm-3">
                        Price
                    </div>
                    <div className="col-sm-3">
                        Quantity
                    </div>
                </div>
                {
                    this.state.products.map(data =>
                        <div className="row" key={data.id}>
                            <div className="col-sm-1">
                                <input type="checkbox" onChange={this.handleChange.bind(this, data.id)}></input>
                            </div>
                            <div className="col-sm-2">
                                {data.id}
                            </div>
                            <div className="col-sm-3">
                                {data.name}
                            </div>
                            <div className="col-sm-3">
                                ${data.price}
                            </div>
                            <div className="col-sm-3">
                                <input type="number" min="0" onChange={this.handleQuantityChange.bind(this, data.id)}></input>
                            </div>
                        </div>
                    )
                }
                <div><button onClick={() => this.postOrders()}>Submit</button></div>
                </div>
            }
            {this.state.orders.length > 0 &&
                <div>
                    <div className="row">
                        
                    <div className="col-sm-2">
                        Product ID
                    </div>
                        <div className="col-sm-2">
                           Product Name
                    </div>
                      <div className="col-sm-2">
                           Uint Price
                    </div>
                        <div className="col-sm-3">
                        Quantity
                    </div>
                    <div className="col-sm-3">
                        Subtotal
                    </div>
                    </div>
                    {
                    this.state.orders.map(data =>
                            <div className="row" key={data.productId}>
                                
                                <div className="col-sm-2">
                                    {data.productId}
                                </div>
                                <div className="col-sm-2">
                                    {data.productName}
                                </div>
                                <div className="col-sm-2">
                                    ${data.unitPrice}
                                </div>
                                <div className="col-sm-3">
                                    {data.quantity}
                                </div>
                                <div className="col-sm-3">
                                    ${data.subtotal}
                                </div>
                            </div>
                        )
                }
                <div className="row">
                    <div className="col-sm-12">
                        Total
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        ${isNaN(this.state.total) ? "" : this.state.total}
                    </div>
                </div>
                </div>
            }
      </div>
    );
  }

}
