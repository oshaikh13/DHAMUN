import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export class Tools extends Component {
  render() {
    return (
      <section className={`${styles}`}>
        <div className="container">
        <hr />
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <h2>
                What is this?
              </h2>
            </div>
          </div>

          <div className="row">

            <div className="col-xs-6 col-sm-4">
              <h3 className="centerAlign">
                Hello!
              </h3>

              <p>
                You're probably here because you need something. 
              </p>
              <p>
                Click "Login" in the Header, and log in with your email and password. 
                You might remember registering through an email we sent.
              </p>
              <p>
                Remember: if something goes wrong, refresh. If that doesn't fix the problem, 
                call someone for help!
              </p>
            </div>
            <div className="col-xs-6 col-sm-4"></div>

            <div className="col-xs-6 col-sm-4">
              <h3 className="centerAlign">
                This is where
              </h3>
              <div className="row">
                <div className="col-md-2">
                  <div className="numberCircle">1</div>
                </div>
                <div className="col-md-10 numberText">
                  <p>You make a DHAMUN account. This is your key to the conference.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="numberCircle">2</div>
                </div>
                <div className="col-md-10 numberText">
                  <p>You create your resolutions. Share them. Send them to the chairs.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <div className="numberCircle">3</div>
                </div>
                <div className="col-md-10 numberText">
                  <p>You vote. Watch your resolution gain support realtime.</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </section>
    );
  }
}
