console.clear();

var TaskList = React.createClass({
    render: function(){

        var displayTask  = function(task, taskIndex){
            return <li>
                {task}
                <button> Delete </button>
            </li>;
        };

        return <ul>
            {this.props.users.map((task, taskIndex) =>
                <li key={taskIndex}>
                    <img src = {task.photo} alt = "alt" />
                    {task.firstName}
                    <button onClick={this.props.deleteTask} value={taskIndex}> Delete </button>
                </li>
            )}
        </ul>;
    }
 });

var TaskApp = React.createClass({
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
              "friends": [2]
          }],
             task: ''
        }
    },

    deleteTask: function(e) {
        var taskIndex = parseInt(e.target.value, 10);
        console.log('remove task: %d', taskIndex, this.state.users[taskIndex]);
        this.setState(state => {
            state.users.splice(taskIndex, 1);
            return {users: state.users};
        });
    },

    onChange: function(e) {
        this.setState({ task: e.target.value });
    },



    addTask:function (e){
        this.setState({
            users: this.state.users.concat([this.state.task]),

            task: ''
        })

        e.preventDefault();
    },

    render: function(){
        return(
            <div>
                <h1>My Task </h1>
                <TaskList users={this.state.users} deleteTask={this.deleteTask} />

                <form onSubmit={this.addTask}>
                    <input onChange={this.onChange} type="text" value={this.state.task}/>
                    <button> Add Task </button>
                </form>
            </div>
        );
    }
});

React.render(<TaskApp />, document.getElementById('appMUser'));
