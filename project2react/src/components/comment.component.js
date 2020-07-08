import React from 'react';
import { connect } from 'react-redux';

class Comment extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <td>
                Hello There
            </td>
        )
    }
}
function mapStatetoProps(state) {
    
}
export default connect(mapStatetoProps)(Comment);