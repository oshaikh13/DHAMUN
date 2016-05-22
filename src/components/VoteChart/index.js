import React, { Component } from 'react';
var PieChart = require("react-chartjs").Bar;
export class VoteChart extends Component {

  render() {
    const { votes } = this.props;


    const resName = decodeURIComponent(this.props.params.name);
    const resolutionVotes = votes[resName].votes;


    var moreData = {
            labels: ["Pass", "Abstain", "Reject"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(255,100,100,.7)",
                    strokeColor: "rgba(255,220,220,1)",
                    pointColor: "rgba(255,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [0, 0, 0]
                }
            ]
        }


    for (var key in resolutionVotes) {

        if (resolutionVotes[key].type === "reject") {
            moreData.datasets[0].data[2]++;
        } else if (resolutionVotes[key].type === "pass") {
            moreData.datasets[0].data[0]++;
        } else {
            moreData.datasets[0].data[1]++;
        }
    }

    const closed = votes[resName].closed;

    if (closed) return (
      <PieChart height="300" width="500" data={moreData}/>
    );

    if (this.props.userLevel !== "Delegate") return (
        <div>
            <h3>Pie Chart</h3>
            <PieChart height="300" width="500" data={moreData}/>
            <h3>Polar Chart</h3>
            
        </div>
    );
    

    return (<h3>Wait till the session is closed to see stats</h3>)
  }
}