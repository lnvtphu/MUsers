console.clear();

var UsersList = React.createClass({
    render: function(){
        return <ul>
            {this.props.users.map((templeUser, userIndex) =>
                <li key={userIndex}>
                    <img src = {templeUser.photo} width = '70' height = '70' />
                    {templeUser.firstName}
                    <button onClick={this.props.deleteUser} value={userIndex}> Delete </button>
                </li>
            )}
        </ul>;
    }
});

var AppMUser = React.createClass({
    getInitialState: function(){
        return {
          users : [{
              "id": "1",
              "firstName": "Tom",
              "lastName": "Cruise",
              "photo": "http://cdn2.gossipcenter.com/sites/default/files/imagecache/story_header/photos/tom-cruise-020514sp.jpg",
              "friends": [2, 3]
          }, {
              "id": "2",
              "firstName": "Maria",
              "lastName": "Sharapova",
              "photo": "http://thewallmachine.com/files/1363603040.jpg",
              "friends": [1]
          }, {
              "id": "3",
              "firstName": "James",
              "lastName": "Bond",
              "photo": "http://georgesjournal.files.wordpress.com/2012/02/007_at_50_ge_pierece_brosnan.jpg",
              "friends": [2],
              templeUser: ''
          }]
        }
    },

    deleteUser: function(e) {
        var userIndex = parseInt(e.target.value);
        this.setState(state => {
            state.users.splice(userIndex, 1);
            return {users: state.users};
        });
    },

    onChange: function(e) {
        this.setState({ user: e.target.value });
    },



    addUser:function (e){
        this.setState({
            users: this.state.users.concat([this.state.templeUser]),
            templeUser: ''
        })

        e.preventDefault();
    },

    render: function(){
        return(
            <div>
                <h1>LIST USER </h1>
                <UsersList users={this.state.users} deleteUser={this.deleteUser} />

                <form onSubmit={this.addUser}>
                    <input onChange={this.onChange} type="text" value={this.state.templeUser}/>
                    <button> Add Name User </button>
                </form>
            </div>
        );
    }
});

React.render(<AppMUser />, document.getElementById('appMUser'));
