import React from 'react'
import { connect } from 'react-redux';
import StatService from '../services/statistics.service'

class StatTable extends React.Component{
    statService = new StatService();
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('setTable mounted')
        this.statService.getAggregate().then((res) => {
            this.props.queryAggregate(res.data)
        })
    }
    render() {
        return (
            <>
                {
                    this.props.user.usertype === 'admin' || this.props.user.usertype === 'moderator' ?
                    <div className='container'>
                        <h3>Overall Site Statistics</h3>
                        <div className='container border'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>
                                            Aggregate User Statistics
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>
                                            User Accuracy by User Type
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        User Accuracy
                                                    </th>
                                                    <th>
                                                        Voter Accuracy
                                                    </th>
                                                    <th>
                                                        Moderator Accuracy
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        {(this.props.agg_stats.user_accuracy*100).toFixed(1).toString() + '%'}
                                                    </th>
                                                    <th>
                                                        {(this.props.agg_stats.voter_accuracy*100).toFixed(1).toString() + '%'}
                                                    </th>
                                                    <th>
                                                        {(this.props.agg_stats.moderator_accuracy*100).toFixed(1).toString() + '%'}
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            User Accuracy by Age
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            13-17
                                                        </th>
                                                        <th>
                                                            18-34
                                                        </th>
                                                        <th>
                                                            35-55
                                                        </th>
                                                        <th>
                                                            56+
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>
                                                            {(this.props.agg_stats.teen_accuracy*100).toFixed(1).toString() + '%'}
                                                        </th>
                                                        <th>
                                                            {(this.props.agg_stats.adult_accuracy*100).toFixed(1).toString() + '%'}
                                                        </th>
                                                        <th>
                                                            {(this.props.agg_stats.middle_aged_accuracy*100).toFixed(1).toString() + '%'}
                                                        </th>
                                                        <th>
                                                            {(this.props.agg_stats.elder_accuracy*100).toFixed(1).toString() + '%'}
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div> :
                    <></>
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    const {aggregateStats, user} = state;
    return {
        user: user,
        agg_stats: aggregateStats
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryAggregate: (stats) => dispatch({type: 'queryAggregate', stats: stats})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatTable);