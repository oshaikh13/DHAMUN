import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';

import { socket } from '../../utils/socket.js';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

/* material UI components */
import { Card } from 'react-toolbox/lib/card';

/* container styles */
import { styles } from '../Vote/styles/styles.scss';
import { isContext } from 'vm';

const metaData = {
  title: 'Attendance',
  description: 'Take Attendance',
};


@connect(
  (state) => ({
    token: state.auth.token,
    userLevel: state.auth.userLevel,
    country: state.auth.country
  }),
)
export class Attendance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countriesPresent: {},
      inputtedVerificationID: ''
    }
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  componentDidMount () {
    console.log("mounted af")
    
    socket.on("attendance update", function(data){
      console.log("updating attendance store");
      this.setState({countriesPresent: data});
    }.bind(this));

    socket.emit("attendance get", {token: this.props.token});
    
  }

  markPresent() {
    socket.emit("attendance present", {token: this.props.token, 
      inputtedVerificationID: this.state.inputtedVerificationID});
  }

  resetAttendance() {
    socket.emit("attendance reset", {token: this.props.token});
  }

  render() {
    const isCountryPresent = this.state.countriesPresent[this.props.country];
    const filterPresence = (elem) => {return this.state.countriesPresent[elem]};
    const filterUselessKeys = (elem) => {return elem !== "verificationID"};
    const attendanceCode = this.state.countriesPresent.verificationID;
    if (isCountryPresent) alert("You've been marked present");
    return (
      <section className={styles}>
        <DocumentMeta {...metaData} />
        <div className="container">


          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3">
              <h1>
                Attendance
              </h1>
            </div>

            { this.props.userLevel == "Delegate" && 
              <Card className="card">
                <Input type="text" value={this.state.inputtedVerificationID} 
                  onChange={this.handleChange.bind(this, 'inputtedVerificationID')} placeholder="Attendance Code (numbers only)"/>
                <Button disabled={isCountryPresent} onClick={() => { this.markPresent() }} style={{"marginBottom": "4%"}} raised primary>
                  Present
                </Button>
                <Button disabled={isCountryPresent} onClick={() => { this.markPresent() }} raised primary>
                  Present and Voting
                </Button>
              </Card>
            }

            { this.props.userLevel != "Delegate" && 
              <Card className="card">
                <h3>Attendance Code: {attendanceCode}</h3>
                <table className="table table-hover">
                  <h3>Present</h3>
                  <tbody>

                    {
                      Object.keys(this.state.countriesPresent).filter(filterUselessKeys).filter(filterPresence)
                        .map((item, index) => 
                        {
                          return <tr key={index}><td className="col-md-10">{item}</td></tr>
                        }

                      )
                    }

                  </tbody>
                </table>

                <table className="table table-hover">
                  <h3>Absent</h3>
                  <tbody>

                    {
                      Object.keys(this.state.countriesPresent).filter(filterUselessKeys).filter((elem) => {return !filterPresence(elem)})
                        .map((item, index) => 
                        {
                          return <tr key={index}><td className="col-md-10">{item}</td></tr>
                        }

                      )
                    }

                  </tbody>
                </table>

                <Button onClick={() => { this.resetAttendance() }} raised primary>
                  Reset Attendance
                </Button>

              </Card>
            }

          </div>
        </div>
      </section>
    );
  }

  componentWillUnmount() {
    socket.removeAllListeners("attendance update");    
  }
}