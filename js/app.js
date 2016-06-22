
var UsersList = React.createClass({
    render: function(){
        return <ul>
            {this.props.users.map((templeUser, userIndex) =>
                <li key={userIndex}>
                    <img src = {templeUser.photo} width = '70' height = '70' />
                    {templeUser.firstName} {templeUser.lastName}{templeUser.id}
                    <button onClick={this.props.deleteUser} value={userIndex}> Delete </button>
                    <button onClick={this.props.editUser} value={userIndex}> Edit</button>
                    <button onClick={this.props.makeFriends} value={userIndex}> List Friend</button>
                </li>
            )}
        </ul>;
    }
 });

var AppMUser = React.createClass({
    propTypes: function() {
      numberUser: React.PropTypes.number.isRequired
      indexUser: React.PropTypes.number.isRequired
    },
    getInitialState: function(){
        var templeUser = {
            "id": "",
            "firstName": "",
            "lastName": "",
            "photo": "https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
            "friends": []
        }
        var users = [{
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
        }];
        return {

          users,
          templeUser,
          numberUser: users.length,
          indexUser:' ',
          friendsArr: []
        }
    },

    deleteUser: function(e) {
        var userIndex = parseInt(e.target.value);
        var userID = this.state.numberUser - 1;
        this.setState(state => {
            state.users.splice(userIndex, 1);
            return {
                users: state.users,
                numberUser: userID
            };
        });
    },
    editUser: function(e){
        var userEdit = this.state.users[parseInt(e.target.value)];
        console.log(userEdit);
        this.setState({ templeUser: userEdit, indexUser: parseInt(e.target.value) });
    },
    onChangeFirtname: function(e) {
            var tFirtname = React.addons.update(this.state.templeUser,{
                firstName: {$set: e.target.value },
                id: {$set: this.state.numberUser +1}
              });
        this.setState({
            templeUser: tFirtname
        });
    },
    onChangeLastname: function(e){
            var tLastname = React.addons.update(this.state.templeUser,{
                lastName: {$set: e.target.value}
            });
            this.setState({ templeUser: tLastname });
    },

    addUser:function (e){

        if(this.state.templeUser.firstName!='' && this.state.templeUser.lastName!=''){
            var userID = this.state.numberUser +1;
            var tUser = React.addons.update(this.state.templeUser,{
                id: {$set: ''},
                firstName : {$set: ''},
                lastName : {$set: ''}
            });
            this.setState({
                numberUser: userID,
                users: this.state.users.concat([this.state.templeUser]),
                templeUser: tUser
            });
            console.log(this.state.users);
        }else {
            alert('Some field null!');
        }
        e.preventDefault();
    },
    updateUser: function(){
        if(this.state.templeUser.firstName!='' && this.state.templeUser.lastName!=''){
            var tUser = React.addons.update(this.state.templeUser,{
                id: {$set: ''},
                firstName : {$set: ''},
                lastName : {$set: ''}
            });
            this.setState(state => {
                state.users.splice(this.state.indexUser, 1, this.state.templeUser);
                return {
                    users: state.users,
                    templeUser: tUser
                };
            });
        }else {
            alert('Some field null!');
        }
        e.preventDefault();


    },
    deleteFriend: function(e){
        var userIndex = parseInt(e.target.value);
        this.setState(state => {
            state.friendsArr.splice(userIndex, 1);
            return {
                friendsArr: state.friendsArr

            };
        });
    },
    makeFriends: function(e){
            var friendCustomArr = [];
            var idFriendArr = this.state.users[e.target.value].friends;
            for(i = 0; i<this.state.numberUser; i++ ){
                for(j = 0; j<idFriendArr.length; j++){
                    if(idFriendArr[j]==this.state.users[i].id)
                    {
                        var friend = {
                            'id': idFriendArr[j],
                            'name': this.state.users[i].firstName
                        }
                        friendCustomArr.push(friend);
                    }
                }
            }
            this.setState({
                friendsArr: friendCustomArr
            });
    },
    render: function(){
        return(
            <div>
              <div>
                <input  placeholder="firstName" onChange={this.onChangeFirtname} type="text" value={this.state.templeUser.firstName}/>
                <input  placeholder="lastName" onChange={this.onChangeLastname} type="text" value={this.state.templeUser.lastName}/>
                <button onClick={this.addUser}> Add User </button>
                <button onClick={this.updateUser}> Update User</button>
              </div>
                <h1>LIST USER </h1>
                <UsersList users={this.state.users} deleteUser={this.deleteUser} editUser={this.editUser} makeFriends={this.makeFriends}/>
                <ListFriends friendsArr={this.state.friendsArr} deleteFriend={this.deleteFriend}/>
            </div>
        );
    }
});
var ListFriends = React.createClass({
    render: function(){
        return <ul>
            {this.props.friendsArr.map((templeFriend, friendIndex) =>
                <li key={friendIndex}>
                {templeFriend.name}
                <button onClick={this.props.deleteFriend} value={friendIndex}>x</button>
                </li>
            )}
        </ul>;
    }
});
React.render(<AppMUser />, document.getElementById('appMUser'));
