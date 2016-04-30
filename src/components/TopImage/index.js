import React, { Component } from 'react';
import LoadingOrderAnimation from 'react-loading-order-with-animation';

/* utils */
import { setParallax } from '../../utils/parallax';

/* component styles */
// Both these styles are the same, except for the image. 
// TODO: Find a better way to do this.
import { styles as outsideStyles } from './outsideStyles.scss';
import { styles as insideStyles } from './insideStyles.scss';


export class TopImage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    setParallax(this.refs.parallax, 10);
  };

  render() {
    var styles;
    if (this.props.imgType === "outsideun") {
      styles = outsideStyles;
    } else if (this.props.imgType === "generalassembly") {
      styles = insideStyles;
    }

    return (
      <section className={`${styles}`} ref="parallax">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
              <LoadingOrderAnimation animation="fade-in"
                move="from-bottom-to-top"
                distance={30}
                speed={700}
                wait={700}
              >
                <h1 className="title transparent">
                  {this.props.header}
                </h1>
              </LoadingOrderAnimation>
              <LoadingOrderAnimation animation="fade-in"
                move="from-bottom-to-top"
                distance={60}
                speed={700}
                wait={900}
              >
                <p>
                  {this.props.subtitle}
                </p>
              </LoadingOrderAnimation>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
