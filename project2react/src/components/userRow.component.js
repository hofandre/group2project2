import React from 'react'
import PropTypes from 'prop-types'
import UserService from '../services/user.service'
import { connect } from 'react-redux';

class UserRow extends React.Component {

    userService = new UserService()

    /** Props are instantiated to create a controlled object. */
    PropTypes = {
        username: PropTypes.string.isRequired,
        usertype: PropTypes.string.isRequired,
    }

    constructor(props) {
        //console.log("mounting user row")
        super(props)
        this.promoteModerator = this.promoteModerator.bind(this)
        this.demoteModerator = this.demoteModerator.bind(this)
    }

    promoteModerator() {
//        console.log("promote moderator button pressed")
        this.userService.change_usertype(this.props.user.username, "moderator").then(() => {
            this.userService.get_users().then(res => {
                this.props.queryUsers(res.data)
            })})  
    }

    demoteModerator() {
//        console.log("demote moderator button pressed")
        this.userService.change_usertype(this.props.user.username, "voter").then(() => {
            this.userService.get_users().then(res => {
                this.props.queryUsers(res.data)
            })})  
    }


    /** componentDidMount records when construction occurs. */
    componentDidMount() {
        //console.log('Mounting User')
    }

    /** componentDidUpdate records when update occurs. */
    componentDidUpdate() {

    }

    decorateRow() {
        if (this.props.user.usertype === 'admin'){
            return 'table-danger'
        } else if (this.props.user.usertype === 'moderator') {
            return 'table-primary'
        } else {
            return 'table-default'
        }
    }

    render() {
        console.log('User Render: '+ this.props.user.username)
        console.log(this.props.active_user.usertype)
        return (
            <>
                <tr className={this.decorateRow()}>
                    <td>{this.props.user.username}</td>
                    <td>{this.props.user.usertype}</td>
                    <td>
                        {   
                        this.props.active_user.usertype ==='admin'?
                            this.props.user.usertype !== "admin"?
                                this.props.user.usertype !== 'moderator'?
                                <button  className='btn btn-primary' onClick={this.promoteModerator}>Promote Moderator</button>
                                :
                                <button className='btn btn-warning' onClick={this.demoteModerator}>Demote Moderator</button>
                            :
                            null
                        :
                        null
                        }
                    </td>
                    <td></td>

                </tr>
            </>
        )
    }
}

function mapStateToProps(state) {
    const {user, displayUsers} = state;
    return {active_user: user , users: displayUsers}
}

function mapDispatchToProps(dispatch) {
    return {
        queryUsers: (users) => dispatch({type: 'queryUsers', users: users})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRow);
