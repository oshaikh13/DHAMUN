import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Socket } from 'components/Socket';
import { ResolutionPicker } from 'components/ResolutionPicker';
import { ResolutionApprover } from 'components/ResolutionApprover';
import { ResolutionAmender } from 'components/ResolutionAmender';
import { ResolutionTextEditor } from 'components/ResolutionTextEditor';

import { AmendmentTable } from 'components/AmendmentTable';

import { ResolutionStats } from 'components/ResolutionStats';

/* material UI components */
import { Card } from 'react-toolbox/lib/card';

/* container styles */
import { styles } from './styles/styles.scss';

import * as actionCreators from 'actions/resolutions';

const metaData = {
  title: 'DHAMUN',
  description: 'Get started here',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

@connect(
  (state) => ({
    token: state.auth.token,
    resolutions: state.resolutions.items,
    country: state.auth.country,
    userLevel: state.auth.userLevel,
    committee: state.auth.committee
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)
export class ResolutionsAction extends Component {

  render() {
    const { resolutions } = this.props;
    const currentRes = resolutions[decodeURIComponent(this.props.params.name)];

    // this is currently unused
    const amendmentJSX = (
      <div>
        {
          currentRes.approved && (this.props.userLevel === "Delegate") && 
          <div>
            <div>

                <div className="col-md-12 bottom-pad">
                  <h2 className="text-center">
                    Submit an amendment to {this.props.params.name}
                  </h2>

                  <ResolutionAmender {...this.props} currentRes={currentRes} />  
                </div>
            </div>
          </div>
        } 

        { currentRes.approved &&

          <div style={{'padding-left': 30, 'padding-right': 30}}>
              <h2 className="text-center">
                View amendments for {this.props.params.name}
              </h2>

              <AmendmentTable currentRes={currentRes} />
          </div>
        }
      </div>
    );

    return (

      <section className={styles}>

        <Socket {...this.props} />
        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <h1 className="title" >
                Stats for {this.props.params.name}
              </h1>

            </div>

            <Card className="card">   
            <ResolutionStats {...this.props} currentRes={currentRes} name={decodeURIComponent(this.props.params.name)} token={this.props.token} />

            <div>
              <div>

                  <div className="col-md-12">
                    <h2 className="text-center">
                      View {this.props.params.name}
                    </h2>

                  </div>
              </div>
              <ResolutionTextEditor {...this.props} currentRes={currentRes} />
            </div>


            { this.props.userLevel === "Delegate" &&
              <div>
                <div>

                    <div className="col-md-12">
                      <h2 className="text-center">
                        Sign {this.props.params.name}
                      </h2>

                    </div>
                </div>
                <ResolutionPicker {...this.props} currentRes={currentRes} />  
              </div>
            }

            {
              this.props.userLevel != "Delegate" && 
              <div>
                <div>

                    <div className="col-md-12">
                      <h2 className="text-center">
                        Approve {this.props.params.name}
                      </h2>

                      <ResolutionApprover {...this.props} currentRes={currentRes} />  
                    </div>
                </div>
              </div>
            } 

          </Card>    

          </div>
        </div>
      </section>
    );
  }
}