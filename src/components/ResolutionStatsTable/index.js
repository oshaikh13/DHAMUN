import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';

import { socket } from '../../utils/socket.js';


export class ResolutionStatsTable extends Component {

  // TODO if admin allow removal.

  onlyCountry (countryName, resolution) {
    var mainsubKeys = Object.keys(resolution.mainsub).length;
    var cosubKeys = Object.keys(resolution.cosub).length;

    debugger;

    // No one cares about requests
    if (resolution.requests[countryName]) return false;

    // You are a mainsubmittor, the only one, and there is no cosubmittor
    if (resolution.mainsub[countryName] && mainsubKeys === 1 && cosubKeys === 0) return true;

    // You are a cosubmittor, the only one, and there is no mainsubmittor
    if (resolution.cosub[countryName] && cosubKeys === 1 && mainsubKeys === 0) return true;

    return false;
  }

  onSubmit (e, country, type) {
    e.preventDefault();

    if (this.onlyCountry(this.props.country, this.props.currentRes) && type === "Remove") {
      alert("You are the only submittor and cannot leave!");
    } else if (type === "Accept") {
      socket.emit('resolution sign accept', {token: this.props.token, name: this.props.name, country: country});
    } else if (type === "Remove") {
      socket.emit('resolution sign revoke', {token: this.props.token, name: this.props.name, country: country})
    }
  }

  render() {

    // Type is unused for now...
    // Just in case we need it later
    const { currentRes, type, hasAccess, country, approved } = this.props;

    const tableElements = currentRes[type];

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
            {(hasAccess && !approved) && 
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
                  { (hasAccess && !approved) && 
                    <td className="col-md-2">
                      <Button className="btn" onClick={(e) => this.onSubmit(e, item, (type === "requests" ? "Accept" : "Remove"))} raised primary>
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