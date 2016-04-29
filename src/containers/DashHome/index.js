import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { TopImage } from 'components/TopImage';
import { Tools } from 'components/Tools';

const metaData = {
  title: 'Dashboard',
  description: 'Welcome to the Dashboard',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class DashHome extends Component {
  render() {
    return (
      <section>
        <DocumentMeta {...metaData} />
        <TopImage header={"Hi " + this.props.userName} subtitle="Welcome to your Dashboard"/>
        <Tools />
      </section>
    );
  }
}
