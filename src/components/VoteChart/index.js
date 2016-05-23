import React, { Component } from 'react';
var PieChart = require("react-chartjs").Bar;

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


    var doesContainSchool = function (arr, name) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].school === "name") {
                return true;
            }
        }

        return false;
    }

    var schoolKeyMapping = {

    }

    var idx = 0;

    for (var key in resolutionVotes) {
        const currentSelection = resolutionVotes[key];

        if (!schoolKeyMapping[currentSelection.school]) {
            schoolKeyMapping[currentSelection.school] = idx;

            indivSchoolVotes.push([]);
            
            
            indivSchoolVotes[schoolKeyMapping[currentSelection.school]] = {
                label: currentSelection.school,
                fillColor: schoolKeyColor[idx].fillColor,
                strokeColor: schoolKeyColor[idx].strokeColor,
                pointColor: schoolKeyColor[idx].pointColor,
                pointStrokeColor: schoolKeyColor[idx].pointStrokeColor,
                pointHighlightFill: schoolKeyColor[idx].pointHighlightFill,
                pointHighlightStroke: schoolKeyColor[idx].pointHighlightStroke,
                data: [0, 0, 0]
            };

            idx++;
        }

        var currentSchoolData = indivSchoolVotes[schoolKeyMapping[currentSelection.school]].data;

        if (currentSelection.type === "reject") {
            barData.datasets[0].data[2]++;
            currentSchoolData[2]++;
        } else if (currentSelection.type === "pass") {
            barData.datasets[0].data[0]++;
            currentSchoolData[0]++;
        } else {
            barData.datasets[0].data[1]++;
            currentSchoolData[1]++;
        }


    }

    debugger;

    // Polar chart data setup.

    const closed = votes[resName].closed;

    if (closed) return (
      <PieChart height="300" width="500" data={barData}/>
    );

    if (this.props.userLevel !== "Delegate") return (
        <div>
            <h3>Pie Chart</h3>
            <PieChart height="300" width="500" data={barData}/>
            <h3>Polar Chart</h3>
            
        </div>
    );
    

    return (<h3>Wait till the session is closed to see stats</h3>)
  }
}