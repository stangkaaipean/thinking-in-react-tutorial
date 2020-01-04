import React from 'react';
import './App.css';

class FilterableProductTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnly = this.handleInStockOnly.bind(this);
  }

  handleFilterTextChange(value) {
    this.setState({ filterText: value });
  }

  handleInStockOnly(value) {
    this.setState({ inStockOnly: value });
  }

  render() {
    return (
      <div className="filterableProductTable border-box clearfix">
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleFilterTextChange={this.handleFilterTextChange}
          handleInStockOnly={this.handleInStockOnly}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div >
    )
  }
}

class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnly = this.handleInStockOnly.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.handleFilterTextChange(e.target.value);
  }

  handleInStockOnly(e) {
    this.props.handleInStockOnly(e.target.checked);
  }

  render() {
    return (
      <form className="inside-box searchBar border-box clearfix">
        <input
          type="text"
          className="searchInput"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockOnly}
          />
          <label>Only show products in stock</label>
        </p>
      </form>
    )
  }
}

function ProductTable(props) {
  const rows = [];
  let lastCategroy;
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;

  props.products.forEach(product => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (lastCategroy !== product.category) {
      lastCategroy = product.category;
      rows.push(
        <ProductCategoryRow
          product={product}
          key={product.category} />
      )
    }

    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    )
  });

  return (
    <div className="inside-box productTable border-box clearfix">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductCategoryRow(props) {
  return (
    <tr>
      <th colSpan="2">{props.product.category}</th>
    </tr>
  )
}



function App(props) {
  return (
    <div className="App">
      <FilterableProductTable products={props.products} />
    </div >
  );
}

export default App;
