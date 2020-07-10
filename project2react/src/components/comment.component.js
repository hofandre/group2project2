import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import SetService from '../services/set.service';

class Comment extends React.Component {
    setService = new SetService();
    constructor(props) {
        super(props);
        console.log(this.props.user.usertype);
        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment() {
        console.log('Deleting comment')
        console.log(this.props.comment);
        this.setService.deleteComment(this.props.comment.set_id, this.props.comment.comment_id).then(res => {
            console.log('Comment was deleted');
            this.props.queryComments(res.data);
        })}        

    render() {
        console.log(this.props.comment)
        return(
         <>
            <Card  bsstyle="default" 
                style={{
                borderRight: "none", 
                borderLeft: "none", 
                borderTop: "none",
                margin: "auto",
                marginTop: "40px",
                width: "60%"}}>
            <Card.Title bsstyle="default" 
                style={{
                textAlign: "left",
                marginBottom: "0"}}>
                { this.props.comment.user }
            </Card.Title>
            <Card.Body bsstyle="default" 
                style={{
                paddingLeft: "0"}}>
            <Card.Text bsstyle="default" 
                style={{
                textAlign: "left"}}>
                { this.props.comment.comment }
            </Card.Text>

            { this.props.user.usertype == 'voter' ?
                null
                : 
                <Button variant="outline-danger"
                    onClick={this.deleteComment}
                    >Delete Comment
                </Button>
            }

            </Card.Body>
            </Card>
        </>
        )
    }
}

function mapStateToProps(state) {
    const {user, comments} = state;
    return {user: user,
            comments: comments }
}
function mapDispatchToProps(dispatch) {
    return {
        queryComments: (comments) => dispatch({type: 'queryComments', comments: comments})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);