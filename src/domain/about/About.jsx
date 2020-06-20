import React, { Component } from 'react';

import Head from '../../components/Head';

import { imagePath } from '../../utils/assetUtils';
import styles from './about.module.scss';

class About extends Component {
  render() {
    return (
      <div>
        <Head title="About" />
        <h1 className={styles.title}>About pages</h1>
        <img className={styles.reactLogo} src={imagePath('react.svg')} alt="" />
      </div>
    );
  }
}

export default About;
