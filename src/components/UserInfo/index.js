import React, { Component } from 'react';

/* component styles */
import { styles } from '../Tools/styles.scss';

export class UserInfo extends Component {
  render() {
    return (
      <section className={`${styles}`}>
        <div className="container">
        <hr />
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h2>
                General Information
              </h2>
            </div>
          </div>

          <div className="row">

            <div className="col-xs-6 col-sm-4">
              <h3 className="centerAlign">
                Personal
              </h3>

                <p>
                  <b>First Name</b>: {this.props.personal.firstName}
                </p>
                <p>
                  <b>Last Name</b>: {this.props.personal.lastName}
                </p>
                <p>
                  <b>Email</b>: {this.props.personal.email}
                </p>
                <p>
                  <b>Country</b>: {this.props.personal.country}
                </p>
                <p>
                  <b>Committee</b>: {this.props.personal.committee}
                </p>
                <p>
                  <b>Position</b>: {this.props.personal.userLevel}
                </p>
            </div>
            <div className="col-xs-6 col-sm-4"></div>

            <div className="col-xs-6 col-sm-4">
              <h3 className="centerAlign">
                Partner
              </h3>
              { this.props.partner ? <span><p>
                  <b>First Name</b>: {this.props.partner.firstName}
                </p>
                <p>
                  <b>Last Name</b>: {this.props.partner.lastName}
                </p>
                <p>
                  <b>Email</b>: {this.props.partner.email}
                </p>
                <p>
                  <b>Country</b>: {this.props.partner.country}
                </p>
                <p>
                  <b>Committee</b>: {this.props.partner.committee}
                </p>
                <p>
                  <b>Position</b>: {this.props.partner.userLevel}
                </p>
                </span> : <span><p>You don't have a partner!</p></span>
              }
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h5>
                Talk to staff or send an email to admins@dhamun.com if you think any information is wrong
              </h5>
            </div>
          </div>
          <hr />
        </div>
      </section>
    );
  }
}