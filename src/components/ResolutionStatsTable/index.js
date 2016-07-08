import React, { Component } from 'react';

export class ResolutionStatsTable extends Component {

  // TODO if admin allow removal.

  render() {

    // Type is unused for now...
    // Just in case we need it later
    const { tableElements, type } = this.props;

    if (!tableElements) {
      console.log("FAIL");
    }

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>

          {
            Object.keys(tableElements).map((item, index) => 

              {
                return <tr key={index}>
                  <td className="col-md-4">{item}</td>
                </tr>
              }

            )
          }

        </tbody>
      </table>
 
    );
  }
}