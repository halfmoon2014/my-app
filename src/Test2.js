import React, { Component } from 'react';
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};
//const  title = response.potentiallyMaliciousInput;
// // 直接使用是安全的：
//const element = <h1>{title}</h1>;

const element = (
    <h1>
         {getGreeting()}
    </h1>
);
// const element = React.createElement(
//     'h1',
//     {className: 'greeting'},
//     'Hello, world!'
// );
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

// function tick() {
//     const element=(
//         <div>
//             <h1>hello world</h1>
//             <h2>it is {new Date().toLocaleTimeString()}</h2>
//         </div>
//     );
//     ReactDOM.render(
//         element,
//         document.getElementById("root")
//     )
// }
//  setInterval(tick,100);

// class Welcome extends React.Component {
//     render() {
//         return <h1>Hello, {this.props.name}</h1>;
//     }
// }
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element2 = <Welcome name="Sara" />;
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );


function App() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );
//
function Avatar(props) {
    return (
        <img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name}
        />
    );
}
function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}
function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
function formatDate(date) {
    return date.toLocaleDateString();
}
const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'http://placekitten.com/g/64/64'
    }
};
//
// ReactDOM.render(
//     <Comment
//         date={comment.date}
//         text={comment.text}
//         author={comment.author} />,
//     document.getElementById('root')
// );
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    };

    componentDidMount() {
        console.log("componentDidMount");
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    };

    componentWillUnmount() {
        console.log("componentWillUnmount")
        clearInterval(this.timerID);
    };

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}




//tickgo();
//setInterval(tick, 1000);
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        //this.state = {temperature: ''};
    }

    handleChange(e) {
        //this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                       onChange={this.handleChange}/>
            </fieldset>
        );
    }
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水会开</p>
    } else {
        return <p>水不会开</p>
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        // this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        // this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '0', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange.bind(this)}/>
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange.bind(this)}/>
                <BoilingVerdict
                    celsius={parseFloat(celsius)}/>
            </div>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({filterText: filterText});
    }

    handleInStockOnlyChange(inStockOnly) {
        this.setState({inStockOnly: inStockOnly});
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockOnlyChange={this.handleInStockOnlyChange}

                />
                <ProductTable products={this.props.products}
                              filterText={this.state.filterText}
                              inStockOnly={this.state.inStockOnly}
                />
            </div>
        )
    }
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockOnlyChange(e) {
        this.props.onInStockOnlyChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <input type="text" value={this.props.filterText} placeholder="Search..."
                       onChange={this.handleFilterTextChange}/>
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockOnlyChange}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function (product) {
            if (product.name.indexOf(this.props.filterText) === -1 ||  (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            }
            rows.push(<ProductRow product={product} key={product.name}/>);
            lastCategory = product.category;
        }.bind(this));
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return <tr>
            <th colSpan="2">{this.props.category}</th>
        </tr>;
    }
}

class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}
class PApp2 extends  Component{
    render(){
        return(
            <div>
                <Clock/>
                {element}
                {element2}
                <App/>
                <Comment
                    date={comment.date}
                    text={comment.text}
                    author={comment.author} />
                <Clock/>
                <Calculator/>
                <FilterableProductTable products={PRODUCTS}/>
            </div>
        );
    }
};




export default PApp2;

// ReactDOM.render(
//     <div>
//         {element}
//         {element2}
//         <App/>
//              <Comment
//                  date={comment.date}
//                  text={comment.text}
//                  author={comment.author} />
//         <Clock/>
//         <Calculator/>
//         <FilterableProductTable products={PRODUCTS}/>
//     </div>,
//     document.getElementById('root')
// );