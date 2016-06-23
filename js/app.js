
var UsersList = React.createClass({
    render: function(){
        return <ul className='list-group listUser'>
            {this.props.users.map((templeUser, userIndex) =>
                <li className='list-group-item' key={userIndex}>
                    <div>
                        <img src = {templeUser.photo} width = '70' height = '70' />
                        {templeUser.firstName}
                    </div>
                    <div>
                        <button onClick={this.props.deleteUser} value={userIndex}> Delete </button>
                        <button onClick={this.props.editUser} value={userIndex}> Edit</button>
                        <button onClick={this.props.makeFriends} value={userIndex}> List Friend</button>
                    </div>
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
        var divListFriend = {
            marginTop: '0'
        }
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
          indexUser: 0,
          friendsArr: [],
          divListFriend
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

        if(this.state.templeUser.firstName!='' || this.state.templeUser.lastName!=''){
            var userID = this.state.numberUser +1;
            var tUser = React.addons.update(this.state.templeUser,{
                id: {$set: ''},
                firstName : {$set: ''},
                lastName : {$set: ''},
                photo: {$set: 'https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}
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
    updateUser: function(e){
        if(this.state.templeUser.firstName=='' || this.state.templeUser.lastName==''){
            alert('Some field null!');
        }else {

            var tUser = React.addons.update(this.state.templeUser,{
                id: {$set: ''},
                firstName : {$set: ''},
                lastName : {$set: ''},
                photo: {$set: 'https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}
            });
            this.setState(state => {
                state.users.splice(this.state.indexUser, 1, this.state.templeUser);
                return {
                    users: state.users,
                    templeUser: tUser
                };
            });
        }

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
            var divStyle = React.addons.update(this.state.divListFriend,{
                marginTop:{$set: (e.target.value)*50}
            });
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
                friendsArr: friendCustomArr,
                divListFriend: divStyle
            });
    },
    render: function(){

        return(
             <div className='form'>
                  <div className='input-group'>
                        <span className='input-group-addon'>Last Name: </span>
                        <input className='form-control' placeholder="lastName" onChange={this.onChangeLastname} type="text" value={this.state.templeUser.lastName}/>
                  </div>
                  <div className='input-group'>
                        <span className='input-group-addon'>Firt Name: </span>
                        <input className='form-control' placeholder="firstName" onChange={this.onChangeFirtname} type="text" value={this.state.templeUser.firstName}/>
                  </div>
                  <div>
                      <button onClick={this.addUser}> Add User </button>
                      <button onClick={this.updateUser}> Update User</button>
                  </div>
                  <div className='leftStyle'>
                      <UsersList users={this.state.users} deleteUser={this.deleteUser} editUser={this.editUser} makeFriends={this.makeFriends}/>
                  </div>
                  <div className='rightStyle'>
                      <ListFriends friendsArr={this.state.friendsArr} deleteFriend={this.deleteFriend}/>
                 </div>
                 <div className='clear'></div>
            </div>
        );
    }
});
var ListFriends = React.createClass({
    render: function(){
        return <ul className='list-group'>
            {this.props.friendsArr.map((templeFriend, friendIndex) =>
                <li className='list-group-item' key={friendIndex}>
                    <span>{templeFriend.name}</span>
                    <button onClick={this.props.deleteFriend} value={friendIndex}>x</button>
                </li>
            )}
        </ul>;
    }
});
React.render(<AppMUser />, document.getElementById('appMUser'));
