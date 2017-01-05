import React, { Component } from 'react';

import { BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend } from 'recharts';

import { schoolKeyColor } from 'utils/schoolKeyColor.js';

// TODO: School distribution chart

export class VoteChart extends Component {

  render() {
    const { votes } = this.props;


    const resName = decodeURIComponent(this.props.params.name);
    const resolutionVotes = votes[resName].votes;

    const voteTypeMap = {
        pass: 0,
        abstain: 1,
        reject: 2
    }

    var generalVoteData = [
        {
            name: 'pass',
            value: 0
        },
        {
            name: 'abstain',
            value: 0
        },
        {
            name: 'reject',
            value: 0
        }
    ];


    for (var key in resolutionVotes) {
        generalVoteData[voteTypeMap[resolutionVotes[key].type]].value++;
    }


    const closed = votes[resName].closed;

    var chart = (
            <div>
                <h3>General Vote Chart</h3>
                <BarChart width={600} height={400} data={generalVoteData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <XAxis dataKey="name"/>
                   <YAxis allowDecimals={false} />
                   <Bar dataKey="value" fill="#8884d8" />
                   <CartesianGrid strokeDasharray="3 3"/>
                   <Tooltip/>
                </BarChart>      
            </div>
        )

    if (this.props.userLevel !== "Delegate" ) {
      return chart;
    }  else if (this.props.userLevel !== "Delegate") return (<h3>No one has voted yet</h3>);
    
    if (closed) return chart;

    return (<h3>Wait till the session is closed to see stats</h3>)
  }
}