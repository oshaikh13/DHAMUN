import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export class Footer extends Component {

  render() {
    return (
      <footer className={`${styles}`}>
        <div className="container">
          Just a concept. For now. Hopefully
        </div>
      </footer>
    );
  }
}
