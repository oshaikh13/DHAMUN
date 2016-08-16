import React, { Component } from 'react';

var BarChart = require("react-chartjs").Bar;
var RadarChart = require("react-chartjs").Radar;

import { schoolKeyColor } from 'utils/schoolKeyColor.js';

export class VoteChart extends Component {


  render() {
    const { votes } = this.props;


    const resName = decodeURIComponent(this.props.params.name);
    const resolutionVotes = votes[resName].votes;

    var indivSchoolVotes = [];

    // Bar chart data setup
    var barData = {
            labels: ["Pass", "Abstain", "Reject"],
            datasets: [
                {
                    label: "Votes",
                    fillColor: schoolKeyColor[0].fillColor,
                    strokeColor: schoolKeyColor[0].strokeColor,
                    pointColor: schoolKeyColor[0].pointColor,
                    data: [0, 0, 0]
                }
            ]
        }


    var createArray = function(length) {
        var myArray = [];
        for (var i = 0; i < length; i++) {
            myArray.push(0);
        }

        return myArray;
    }

    var schoolKeyMap = {

    }

    var compareChartLabels = [];


    for (var key in resolutionVotes) {

        const currentSelection = resolutionVotes[key];

        var schoolIdx = compareChartLabels.indexOf(currentSelection.school)

        if (schoolIdx === -1) {
            compareChartLabels.push(currentSelection.school);
            schoolKeyMap[currentSelection.school] = compareChartLabels.length - 1;
        }

        if (currentSelection.type === "reject") {
            barData.datasets[0].data[2]++;
     
        } else if (currentSelection.type === "pass") {
            barData.datasets[0].data[0]++;

        } else {
            barData.datasets[0].data[1]++;

        }

    }

    var compareSchoolData = {
        labels: compareChartLabels,
        datasets: [

            {
                label: "Pass",
                fillColor: schoolKeyColor[0].fillColor,
                strokeColor: schoolKeyColor[0].strokeColor,
                pointColor: schoolKeyColor[0].pointColor,
                data: createArray(compareChartLabels.length)
            },

            {
                label: "Abstain",
                fillColor: schoolKeyColor[1].fillColor,
                strokeColor: schoolKeyColor[1].strokeColor,
                pointColor: schoolKeyColor[1].pointColor,
                data: createArray(compareChartLabels.length)
            },

            {
                label: "Reject",
                fillColor: schoolKeyColor[2].fillColor,
                strokeColor: schoolKeyColor[2].strokeColor,
                pointColor: schoolKeyColor[2].pointColor,
                data: createArray(compareChartLabels.length)
            }
        ]
    }

    for (var key in resolutionVotes) {
        const currentSelection = resolutionVotes[key];

        const idx = schoolKeyMap[currentSelection.school];
        if (currentSelection.type === "reject") {
            compareSchoolData.datasets[2].data[idx]++;
     
        } else if (currentSelection.type === "pass") {
            compareSchoolData.datasets[0].data[idx]++;

        } else {
            compareSchoolData.datasets[1].data[idx]++;
        }     
    }

    debugger;

    const closed = votes[resName].closed;

    if (this.props.userLevel !== "Delegate" ) {
      return (
            <div>
                <h3>General Vote Chart</h3>
                <BarChart height="350" width="500" data={barData}/>
                <h3>School Chart</h3>
                <BarChart height="350" width="500" data={compareSchoolData}/>
      
            </div>
        )  
    }  else if (this.props.userLevel !== "Delegate") return (<h3>No one has voted yet</h3>);
    
    if (closed) return (
      <BarChart height="300" width="500" data={barData}/>
    );

    return (<h3>Wait till the session is closed to see stats</h3>)
  }
}