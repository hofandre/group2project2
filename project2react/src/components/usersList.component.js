import React from 'react'
import { connect } from 'react-redux'
import UserService from '../services/user.service'
import UserRow from '../components/userRow.component'

class UserTable extends React.Component{
    userService = new UserService();
    userTable(users){
        //console.log("rendering user table")

        return (
            <>
            <div className='container'>
                <h3>Manage Users</h3>
                <table className='table' id="user-table">
                    <thead>
                        <th>Username</th>
                        <th>User Type</th>
                        <th>Manage</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {
                            this.props.users.map ?
                            this.props.users.map((user) => {
                                return <UserRow key={user._id} user={user}/>
                            })
                            : <tr></tr>
                        }
                    </tbody>
                </table>
            </div>
            </>)
    }

    render() {

        return this.userTable(this.props.users)
    }

    componentDidMount() {
        this.userService.get_users().then(res => {
            this.props.queryUsers(res.data)
        })
    }
    componentDidUpdate() {

    }


}
function mapStateToProps(state) {
    const { displayUsers } = state;
    return {users : displayUsers}
}
function mapDispatchToProps(dispatch) {
    return {
        queryUsers: (users) => dispatch({type: 'queryUsers', users: users})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
