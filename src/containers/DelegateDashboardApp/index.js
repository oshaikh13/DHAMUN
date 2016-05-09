import React, { Component } from 'react';

/* global styles for app */
import '../HomeApp/styles/homeapp.scss';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export class DelegateDashboardApp extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  // React cloneElement allows us to pass props down to children
  // Is this an anti-pattern? React does use a "shallow copy" so it's not another "new" element...

  render() {
    return (
      <section>
        <Header 
          titleData={["Dashboard", "/dashboard/delegate"]}
          leftLinks={[
            ["Home", "/dashboard/delegate/"], 
            ["Resolutions", "/dashboard/delegate/resolutions"], 
            ["Vote", "/dashboard/delegate/vote"]
          ]} 
          rightLink={["Log out", "/dashboard/logout", true]} 
        />
        { this.props.children && React.cloneElement(this.props.children, 
          { 
            firstName: this.props.firstName, 
            lastName: this.props.lastName 
          }) 
        }
        <Footer text="This is DHAMUN Portal" />
      </section>
    );
  }
}
