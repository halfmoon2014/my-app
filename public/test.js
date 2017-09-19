var TopView = React.createClass({
    getInitialState: function () {
        return {
            pageSize: this.props.pageSize
        };
    },
    txt_billnoChange:function () {
        console.log("txt_billno.onChang");
        this.setState({
            pageSize: this.refs.txt_billno.value
        });
    },
    btn_searchClick:function () {
        console.log("btn_search");
        // var newState = !this.state.checked;
        // this.setState({
        //     checked: newState
        // });
        this.props.callbackParent(this.refs.txt_billno.value);
    },
    render: function() {
        var pageSize=this.state.pageSize;
        return (
            <div>
                <div>
                    <input type="text"  ref ="txt_billno"    value={pageSize}  onChange={this.txt_billnoChange} />
                    <input type="button" value="search"  data-id="btn_search" onClick={this.btn_searchClick} />
                </div>
            </div>
        );
    }
});

var Clock=React.createClass({
    getInitialState: function() {
        return {
            date: new Date()
        };
    },
    componentDidMount:function () {
        this.timerID=setInterval(this.setTime,100);
    },
    componentWillUnmount:function () {
        clearInterval(this.timerID);
    },
    setTime:function () {
        this.setState({date:new Date()});
    },
    render:function () {
        return(
            <div>
                {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
})

var ContentView=React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null
        };
    },
    componentDidMount() {

        var promise=$.getJSON(this.props.url)

        // var promise=fetch(this.props.url,{
        //     method: 'GET',
        //     mode: 'cors',
        //     //credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }).then(function(response) {
        //      return response.json();
        //  })
        promise.then(
            value => this.setState({loading: false, data: value}),

            error => this.setState({loading: false, error: error}));

    },
    // componentDidMount: function() {
    //
    //     this.serverRequest = $.get(this.props.source, function (result) {
    //         if (this.isMounted()) {
    //             //var lastGist = result[0];
    //             // this.setState({
    //             //      login: lastGist.owner.login,
    //             //      id:lastGist.owner.id,
    //             //      type: lastGist.owner.type,
    //             //      repos_url:lastGist.owner.repos_url
    //             // });
    //             this.setState(function (state) {
    //                 var arr = new Array();
    //                 for (var i = 0; i < result.length; i++) {
    //                     var o = {};
    //                     o.comments = result[i].comments;
    //                     o.comments_url = result[i].comments_url;
    //                     o.created_at = result[i].created_at;
    //                     o.description = result[i].description;
    //                     arr.push(o);
    //                 };
    //                 return {dataList: arr}
    //             });
    //         }
    //     }.bind(this));
    // },
    componentWillUnmount: function() {
        //this.serverRequest.abort();
    },
    render: function() {
        if (this.state.loading) {

            return <span>Loading...</span>;

        }

        else if (this.state.error !== null) {

            return <span>Error: {this.state.error.message}</span>;

        }
        else {
            var pageSize=this.props.pageSize;
            console.log(this.state.data)
            var repoList = this.state.data.items.map(function (repo, index) {
                if(index>=pageSize){

                }else {
                    return (
                        <tr data-index={index}>
                            <td>{repo.id}</td>
                            <td>{repo.name}</td>
                            <td>{repo.full_name}</td>
                            <td>{repo.description}</td>
                        </tr>
                    );
                }
            });
            return (
                <div>
                    <p>count:{this.state.data.items.length}/total:{this.state.data.total_count}</p>
                    <table>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                            <td>full_name</td>
                            <td>description</td>
                        </tr>
                        {repoList}
                    </table>
                </div>
            );
        }
    }
});

var View = React.createClass({
    getDefaultProps : function () {
        return {
            title : 'Hello World'
        };
    },
    propTypes: {
        source: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
    },
    getInitialState: function() {
        return {
            pageSize: 10
        };
    },
    changPageSize:function(p){
        this.setState({
            pageSize: p
        });
    },
    render: function() {
        return (
            <div>
                <span>{this.props.title}</span>
                <NotesList>
                    <span>hello</span>
                    <span>world</span>
                </NotesList>
                <TopView callbackParent={this.changPageSize} pageSize={this.state.pageSize} />
                <ContentView  url={this.props.url}  pageSize={this.state.pageSize}  />
            </div>
        );
    }
});


var url="https://api.github.com/search/repositories?q=javascript&sort=stars"
const element=<h1>Hello, world!</h1>;
ReactDOM.render(
    <div>
    {element}
    <Clock/>
        <View  url={url}   />
    </div>,
    document.getElementById('example')
);