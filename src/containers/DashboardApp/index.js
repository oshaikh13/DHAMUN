import React, { Component } from 'react';

/* global styles for app */
import './styles/dashboardapp.scss';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export class DashboardApp extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  // React cloneElement allows us to pass props down to childrem/
  // Is this an anti-pattern? React does use a "shallow copy" so it's not another "new" element...

  render() {
    console.log(this.props);
    return (
      <section>
        <Header 
          titleData={["Dashboard", "/dashboard"]}
          leftLinks={[["Resolutions", "/resolutions"], ["Vote", "/vote"], ["Profile", "/profile"]]} 
          rightLink={["Log out", "/logout", false]} 
        />
        {React.cloneElement(this.props.children, { userName: this.props.userName })}
        <Footer text="This is DHAMUN Portal" />
      </section>
    );
  }
}
