import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../global/Layout';
import Why4Geeks from '../components/Why4Geeks';
import GeeksVsOthers from '../components/GeeksVsOthers'
import ChooseProgram from '../components/ChooseProgram'
import Jobs from '../components/Jobs';
import Link from 'gatsby-link'
import {H1, H2, H3, Title, Separator, Paragraph, Span} from '../components/Heading'
import {Container, Row, Column, Divider, Wrapper} from '../components/Sections'
import {RoundImage, Colors, Check, ArrowRight} from '../components/Styling'
import {Card} from '../components/Card'
import WhoIsHiring from '../components/WhoIsHiring';
import Alumni from '../components/Alumni'
import Credentials from '../components/Credentials'

const Home = ({data}) => {
  return (
    <Layout>
        <p>Hello</p>

    </Layout>
  )
};
export default Home;