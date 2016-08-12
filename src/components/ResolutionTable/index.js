import React, { Component } from 'react';
import { Link } from 'react-router';

/* material UI components */
import { Button } from 'react-toolbox/lib/button';

/* component styles */
import { styles } from './styles.scss';

export class ResolutionTable extends Component {

  render() {

    const { resolutions, pending } = this.props;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Opened by</th>   
          </tr>
        </thead>
        <tbody className={styles}>

          {
            Object.keys(resolutions).map((item, index) => 
              {
                return (pending ? !resolutions[item].approved : resolutions[item].approved) && 
                <tr key={index}>
                  <td className="col-md-4">{item}</td>
                  <td className="col-md-4">{resolutions[item].original}</td>
                  <td className="col-md-4">
                      <Button label="View" className="btn centerMe" href={'/#/dashboard/' + this.props.userLevel + '/resolutions/' + encodeURIComponent(item)} primary/>
                  </td>
                </tr>
              }
            )
          }

        </tbody>
      </table>
    );
  }
}