//Main
var App = React.createClass({
    render : function() {
        return (
            <div>
              <Content/>
            </div>
        );
    }
});

// Header
var Header = React.createClass({
    render : function() {

    }
});
//content
var Content = React.createClass({
  getInitialState :function () {
      return{
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
            "friends": [2]
        }]
      }
    },
    deleteUser : function(e){
      var userIndex = parseInt(e.target.value,10);
      console.log("remove : " +userIndex);
      this.setState(state => {
            state.items.splice(userIndex, 1);
            return {users: state.users};
        });
    },

    render : function() {
      return(
        <div>
          <h4>List User</h4>
          <ListUser users={this.state.users} deleteUser={this.deleteUser}/>
        </div>
      );
    }
});

var User = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    render : function() {
        return (
            <li>
                <img src = {this.props.src} alt = "alt" />
                <span>{this.props.name} </span>
                <button onClick = {this.props.deleteUser}> Remove </button>
                <button onClick = {this.props.viewUSer}> View </button>
            </li>
        );
    }
});

var ListUser = React.createClass({
    render : function() {
        var list = this.props.users.map(function(user,index){

            var userRender =   <li>
                  <img src = {user.photo} alt = "alt" />
                  <span>{user.firstName} </span>
                  <button onClick = {this.props.deleteUser} value = {index}> Remove </button>
                  <button onClick = {this.props.viewUSer} value = {index}> View </button>
              </li>;
            return userRender;
        });
        return(
          <ul>{list}</ul>
        );
    }
});

var AppComponent = React.render( <App /> , document.getElementById("appMUser"));
