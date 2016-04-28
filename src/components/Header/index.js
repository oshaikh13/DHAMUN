import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

// The rightLink prop value at indx 3 asks if the link is local
export class Header extends Component {
  render() {

    const { titleData, leftLinks, rightLink} = this.props;

    return (
      <header className={`${styles}`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-5 col-sm-3 col-md-3 col-lg-3 logo">
              <Link to={titleData[1]}>
                {titleData[0]}
              </Link>
            </div>

            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <nav>
                {
                  leftLinks.map((link, indx) => 
                    <Link to={link[1]} activeClassName="active" key={indx}>
                      {link[0]}
                    </Link>
                  )
                }
              </nav>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 hidden-xs text-right">

              {!rightLink[2] && <a href={rightLink[1]}>{rightLink[0]}</a>}
              {rightLink[2] &&
                <Link to={rightLink[1]} activeClassName="active">
                  {rightLink[0]}
                </Link>        
              }
            </div>
          </div>
        </div>
      </header>
    );
  }
}
