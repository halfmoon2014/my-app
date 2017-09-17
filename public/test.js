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

var ContentView=React.createClass({
    getInitialState: function() {
        return {
            loading: true,
            error: null,
            data: null
        };
    },
    componentDidMount() {

        this.props.promise.then(

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
        this.serverRequest.abort();
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
                <TopView callbackParent={this.changPageSize} pageSize={this.state.pageSize} />
                <ContentView source={this.props.source} promise={$.getJSON(this.props.url)} pageSize={this.state.pageSize}  />
            </div>
        );
    }
});

ReactDOM.render(
    <View source="https://api.github.com/users/octocat/gists" url="https://api.github.com/search/repositories?q=javascript&sort=stars"   />,
    document.getElementById('example')
);