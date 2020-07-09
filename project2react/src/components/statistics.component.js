import React from 'react'
import { connect } from 'react-redux';
import StatService from '../services/statistics.service'


class StatTable extends React.Component{
    statService = new StatService;
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
                <div className='container'>
                    <h3>Overall Site Statistics</h3>
                    <div className='container border'>
                        <table className='table table-borderless'>
                            <thead>
                                <tr>
                                    <th>
                                        Aggregate User Statistics
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                      <table className='table table-striped'>
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
                                                    {(this.props.agg_stats.user_accuracy*100).toString() + '%'}
                                                </th>
                                                <th>
                                                    {(this.props.agg_stats.voter_accuracy*100).toString() + '%'}
                                                </th>
                                                <th>
                                                    {(this.props.agg_stats.moderator_accuracy*100).toString() + '%'}
                                                </th>
                                              </tr>
                                          </tbody>
                                      </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const {aggregateStats} = state;
    return {
        agg_stats: aggregateStats
    }
}

function mapDispatchToProps(dispatch) {
    return {
        queryAggregate: (stats) => dispatch({type: 'queryAggregate', stats: stats})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatTable);