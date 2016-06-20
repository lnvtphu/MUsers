//Main
var App = React.createClass({
    render() {
        return (
            <div>
              <Content/>
            </div>
        );
    }
});

// Header
var Header = React.createClass({
    render() {

    }
});
//content
var Content = React.createClass({
    render() {
      return(
        <div>
          <h4>List User</h4>
          <ListUser/>
        </div>
      );
    }
});

var User = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    render() {
        return (
            <li>
                <img src = {this.props.src} alt = "alt" />
                <span>{this.props.name} </span>
                <button onClick = {this.onRemove}> Remove </button>
                <button onClick = {this.onView}> View </button>
            </li>
        );
    }
});

var ListUser = React.createClass({
    getInitialState() {
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
    render() {
        var list = this.state.users.map(function(user,index){
            var userRender = <User key = {index} value = {user.id} name = {user.firstName} src = {user.photo} />
            return userRender;
        });
        return(
          <ul>{list}</ul>
        );
    }
});

var AppComponent = React.render( <App /> , document.getElementById("appMUser"));
