
var AppMUser = React.createClass({
    propTypes: function() {
      indexUser: React.PropTypes.number.isRequired
    },
    getInitialState: function(){
        var templeUser = {
            "_id": "",
            "firstName": "",
            "lastName": "",
            "photo": "https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png",
            "friends": []
        }
        var users = [];
        return {
            url: 'http://127.0.0.1:8080/',
            users:[],
            templeUser,
            indexUser: 0,
            friendsArr: [],
            userArr: [],
            idFriendArr: []
        }
    },

  componentDidMount: function() {
    this.serverRequest = $.get(this.state.url+'listusers', function (result) {
        this.setState({
          users : result
        });
    }.bind(this));
  },
    //delete user on list users
    deleteUser: function(e) {
         var userIndex = parseInt(e.target.value);
         var idUser = this.state.users[userIndex]._id;
         console.log(idUser);
        $.ajax({
             url: this.state.url+'deleteuser',
             dataType: 'json',
             type: 'DELETE',
             data: {_id: idUser},
             success: function(data) {
                 console.log(data);
                     this.setState(function(state) {
                         state.users.splice(userIndex, 1);
                         return {
                             users: state.users
                         };
                     });
         }.bind(this)
       });
    },
    //view info of user select
    editUser: function(e){
        var userEdit = this.state.users[parseInt(e.target.value)];
        console.log(userEdit);
        this.setState({ templeUser: userEdit, indexUser: parseInt(e.target.value) });
    },
    onChangeIduser: function(e) {
        var tFirtname = React.addons.update(this.state.templeUser,{
            _id: {$set:  e.target.value}
        });
        this.setState({
            templeUser: tFirtname
        });
    },
    //event set state when change text field lastName
    onChangeFirstname: function(e) {
        var tFirtname = React.addons.update(this.state.templeUser,{
            firstName: {$set: e.target.value }
        });
        this.setState({
            templeUser: tFirtname
        });
    },
    //event set state when change text field lastName
    onChangeLastname: function(e){
            var tLastname = React.addons.update(this.state.templeUser,{
                lastName: {$set: e.target.value}
            });
            this.setState({ templeUser: tLastname });
    },
    //event add new user
    addUser:function (e){

        if(this.state.templeUser.firstName=='' || this.state.templeUser.lastName==''){
            alert('Some field null!');
            console.log(this.state.users);
        }else {
            console.log(this.state.templeUser);
            $.ajax({
                 url: this.state.url+'adduser',
                 dataType: 'json',
                 type: 'PUT',
                 data: this.state.templeUser,
                 success: function(data) {
                     console.log(data);
                     var tUser = React.addons.update(this.state.templeUser,{
                         id: {$set: ''},
                         firstName : {$set: ''},
                         lastName : {$set: ''},
                         photo: {$set: 'https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}
                     });
                     this.setState({
                         users: this.state.users.concat([this.state.templeUser]),
                         templeUser: tUser
                     });
                 }.bind(this),
                 error: function(err){
                     alert(err.responseJSON.Error);
                 }.bind(this)
             }
           );
        }
    },
    //event update info user
    updateUser: function(e){
        if(this.state.templeUser.firstName=='' || this.state.templeUser.lastName==''){
            alert('Some field null!');
        }else {
            $.ajax({
                 url: this.state.url+'updateuser',
                 dataType: 'json',
                 type: 'POST',
                 data: this.state.templeUser,
                 success: function(data) {
                     console.log(data);
                     var tUser = React.addons.update(this.state.templeUser,{
                         _id: {$set: ''},
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
                 }.bind(this),
                 error: function(err){
                     alert(err.responseJSON.Error);
                 }.bind(this)
             }
            );


        }

    },
    //delete friend on list
    deleteFriend: function(e){
        var idUser = this.state.users[this.state.indexUser]._id;
        var userIndex = e.target.value;
        console.log(userIndex);
        this.state.idFriendArr.splice(userIndex, 1);
        var friendsArrTemp = this.state.idFriendArr;
        console.log(friendsArrTemp.splice(userIndex, 1));
        $.ajax({
             url: this.state.url+'deletefriend',
             dataType: 'json',
             type: 'POST',
             data: {_id: idUser, friends: friendsArrTemp},
             success: function(data) {
                 this.setState(state => {
                     state.friendsArr.splice(userIndex, 1);
                     return {
                         friendsArr: state.friendsArr
                     };
                 });
             }.bind(this),
             error: function(err){
                 alert(err.responseJSON.Error);
             }.bind(this)
         }
        );

        console.log(this.state.friendsArr);
        // console.log(this.state.idFriendsArr);
    },
    //event click view list friend of user
    viewFriends: function(e){
            var friendCustomArr = [];
            var idFriendArr = this.state.users[e.target.value].friends;
            // console.log(idFriendArr);
            for(i = 0; i<this.state.users.length; i++ ){
                for(j = 0; j<idFriendArr.length; j++){
                    if(idFriendArr[j]==this.state.users[i]._id)
                    {
                        var friend = {
                            'id': idFriendArr[j],
                            'name': this.state.users[i].firstName
                        };

                        friendCustomArr.push(friend);
                    }
                }
            }

            this.setState({
                friendsArr: friendCustomArr,
                indexUser: e.target.value,
                idFriendArr: idFriendArr
            });
    },
    viewUser: function(e){
        var usersTemp = [];
        var idFrr = this.state.users[e.target.value].friends;
        var userFrr = [];
        for (x= 0; x< this.state.users.length; x++){
            if((this.state.users[x]._id)!= (this.state.users[e.target.value]._id)){
                userFrr.push(this.state.users[x]);
            }
        }
        for(i = 0; i< userFrr.length; i++){
            for(j = 0; j< idFrr.length; j++){
                if((userFrr[i]._id) ==(idFrr[j])){
                    userFrr.splice(i,1);
                }
            }
        }
        console.log(userFrr);
        this.setState({
            userArr: userFrr
        });
    },
    render: function(){

        return(
             <div className='form'>
                 <div className='input-group'>
                       <span className='input-group-addon spanId'>ID User: </span>
                       <input className='form-control' placeholder="Id user" onChange={this.onChangeIduser} type="text" value={this.state.templeUser._id}/>
                 </div>
                  <div className='input-group'>
                        <span className='input-group-addon'>First Name: </span>
                        <input className='form-control' placeholder="First name" onChange={this.onChangeFirstname} type="text" value={this.state.templeUser.firstName}/>
                  </div>
                  <div className='input-group'>
                        <span className='input-group-addon'>Last Name: </span>
                        <input className='form-control' placeholder="Last name" onChange={this.onChangeLastname} type="text" value={this.state.templeUser.lastName}/>
                  </div>
                  <div>
                      <button onClick={this.addUser}> Add User </button>
                      <button onClick={this.updateUser}> Update User</button>
                  </div>
                  <div className='leftStyle'>
                      <UsersList users={this.state.users} delete={this.deleteUser} edit={this.editUser} view={this.viewFriends} add={this.viewUser}/>
                  </div>
                  <div className='rightStyle'>
                      <FriendsList friendsArr={this.state.friendsArr} deleteFriend={this.deleteFriend}/>
                  </div>
                  <div className='rightStyle'>
                      <AddFriendList userArr={this.state.userArr} addFriend={this.addFriend}/>
                 </div>

                 <div className='clear'></div>
            </div>
        );
    }
});
//create class list user
var UsersList = React.createClass({
    render: function(){
        return <ul className='list-group listUser'>
            {this.props.users.map((templeUser, userIndex) =>
                <li className='list-group-item' key={userIndex}>
                    <div>
                        <img src = {templeUser.photo} width = '70' height = '70' />
                        <span>{templeUser.firstName}</span>
                    </div>
                    <div>
                        <button onClick={this.props.delete} value={userIndex}> Delete </button>
                        <button onClick={this.props.edit} value={userIndex}> Edit</button>
                        <button onClick={this.props.view} value={userIndex}>Friend</button>
                        <button onClick={this.props.add} value={userIndex}>Add Friend</button>
                    </div>
                </li>
            )}
        </ul>;
    }
 });
//create class list friend
var FriendsList = React.createClass({
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

var AddFriendList = React.createClass({
    render: function(){
        return <ul className='list-group'>
            {this.props.userArr.map((templeFriend, index) =>
                <li className='list-group-item' key={index}>
                    <span>{templeFriend.firstName}</span>
                    <button onClick={this.props.addFriend} value={index}>+</button>
                </li>
            )}
        </ul>;
    }
});
React.render(<AppMUser />, document.getElementById('appMUser'));
