import React, { Component } from 'react';

/* global styles for app */
import './styles/app.scss';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <section>
        <Header 
          titleData={["DHAMUN", "/"]}
          leftLinks={[["Home", "/home"], ["Redux", "/list"]]} 
          rightLink={["Fork me", "https://github.com/DHAMUN/", false]} 
        />
        {this.props.children}
        <Footer text="This is DHAMUN Portal" />
      </section>
    );
  }
}
