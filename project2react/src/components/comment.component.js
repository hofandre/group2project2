import React from 'react';

class Comment extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.comment)
        return(
            <tr>
                <td style={{width: '10%'}}>
                    { this.props.comment.user }
                </td>
                <td style={{width: '90%'}}>
                    { this.props.comment.comment }
                </td>
            </tr>
        )
    }
}

export default (Comment);