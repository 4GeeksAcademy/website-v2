import React, { useState } from 'react'
import { RoundImage, Colors } from './../../../new_components/Styling'
import LazyLoad from 'react-lazyload';
import { Grid, Div, Header } from './../../../new_components/Sections'
import Circles from '../Circles'

export default ({ yml }) => {

   return (

       <div>
       
         <Header
            seo_title={yml.seo_title}
            title={yml.header.title}
            paragraph={yml.header.paragraph}
            image={yml.header.image.childImageSharp.fluid}
            background="Colors.white"
            padding="0 0 0 175px;"            
         /> 

          {/*
            <Circles/>
          */}
       
       </div>
   )
}
