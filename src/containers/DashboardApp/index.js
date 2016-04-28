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

  render() {
    return (
      <section>
        <Header 
          titleData={["Dashboard", "/dashboard"]}
          leftLinks={[["Resolutions", "/resolutions"], ["Vote", "/vote"], ["Profile", "/profile"]]} 
          rightLink={["Log out", "/logout", false]} 
        />
        {this.props.children}
        <Footer text="This is DHAMUN Portal" />
      </section>
    );
  }
}
