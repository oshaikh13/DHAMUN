import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';

import { socket } from '../../utils/socket.js';


export class ResolutionStatsTable extends Component {

  // TODO if admin allow removal.

  onSubmit (e, country, type) {
    e.preventDefault();

    if (this.props.country === country && type === "Remove") {
      alert("You cannot remove yourself!");
    } else if (type === "Accept") {
      socket.emit('resolution sign accept', {token: this.props.token, name: this.props.name, country: country});
    } else if (type === "Remove") {
      socket.emit('resolution sign revoke', {token: this.props.token, name: this.props.name, country: country})
    }
  }

  render() {

    // Type is unused for now...
    // Just in case we need it later
    const { tableElements, type, isCreator, country } = this.props;


    if (!tableElements) {
      console.log("FAIL");
    }

    const TYPE_MAP = {
      'signat': 'Signator',
      'cosub': 'Co Submittor',
      'mainsub': 'Main Submittor'
    };

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Country</th>
            {isCreator && 
              <th>Action</th>
            }
          </tr>
        </thead>
        <tbody>

          {
            Object.keys(tableElements).map((item, index) => 
              {
                return <tr key={index}>
                  <td className="col-md-10">{item}</td>
                  { isCreator && 
                    <td className="col-md-2">
                      <Button className="larger-btn btn" onClick={(e) => this.onSubmit(e, item, (type === "requests" ? "Accept" : "Remove"))} raised primary>
                        {type === "requests" ? TYPE_MAP[this.props.tableElements[item].type] : "Remove"}
                      </Button>
                    </td>
                  }
                </tr>
              }

            )
          }

        </tbody>
      </table>
 
    );
  }
}