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
// const element = <h1>{title}</h1>;

// const element = (
//     <h1>
//         Hello, {getGreeting()}!
//     </h1>
// );
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
// setInterval(tick,100);

// class Welcome extends React.Component {
//     render() {
//         return <h1>Hello, {this.props.name}</h1>;
//     }
// }
// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>;
// }
//
// const element = <Welcome name="Sara" />;
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );
// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>;
// }
//
// function App() {
//     return (
//         <div>
//             <Welcome name="Sara" />
//             <Welcome name="Cahal" />
//             <Welcome name="Edite" />
//         </div>
//     );
// }
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );
//
// function Avatar(props) {
//     return (
//         <img className="Avatar"
//              src={props.user.avatarUrl}
//              alt={props.user.name}
//         />
//     );
// }
// function UserInfo(props) {
//     return (
//         <div className="UserInfo">
//             <Avatar user={props.user} />
//             <div className="UserInfo-name">
//                 {props.user.name}
//             </div>
//         </div>
//     );
// }
// function Comment(props) {
//     return (
//         <div className="Comment">
//             <UserInfo user={props.author} />
//             <div className="Comment-text">
//                 {props.text}
//             </div>
//             <div className="Comment-date">
//                 {formatDate(props.date)}
//             </div>
//         </div>
//     );
// }
// function formatDate(date) {
//     return date.toLocaleDateString();
// }
// const comment = {
//     date: new Date(),
//     text: 'I hope you enjoy learning React!',
//     author: {
//         name: 'Hello Kitty',
//         avatarUrl: 'http://placekitten.com/g/64/64'
//     }
// };
//
// ReactDOM.render(
//     <Comment
//         date={comment.date}
//         text={comment.text}
//         author={comment.author} />,
//     document.getElementById('root')
// );
class  Clock extends  React.Component{
    constructor(props){
        super(props);
        this.state={date:new Date()};
    };
    componentDidMount(){
        console.log("componentDidMount");
        this.timerID = setInterval(

            ()=>this.tick() ,
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
    render(){
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}


function tickgo() {
    ReactDOM.render(
        <Clock />,
        document.getElementById('root')
    );
}
tickgo();
//setInterval(tick, 1000);
