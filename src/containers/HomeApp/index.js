import React, { Component } from 'react';

/* global styles for app */
import './styles/homeapp.scss';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export class HomeApp extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <section>
        <Header 
          titleData={["DHAMUN", "/"]}
          leftLinks={[["Home", "/home/"], ["Log In", "/home/login/"]]} 
          rightLink={["Dashboard", "/home/login/", true]} 
        />
        {this.props.children}
        <Footer>Powered by <a href="https://github.com/Referendum">Referendum</a></Footer>
      </section>
    );
  }
}
