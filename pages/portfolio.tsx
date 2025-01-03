import React from 'react';
import Head from 'next/head'

import Header from '../components/header/Header';

class Home extends React.Component<{}> {   

  render(){
    return (
      <>
        <Head>
          <title>My Portfolio</title>
          <meta name="description" content="Artem Kolodiazhnyi's portfolio created by next.js" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <iframe src='assets/pages/portfolio-slide/index.html' className='w-full h-[100vh]'/>    
        <Header/>
      </>
    );
  }
}

export default Home;