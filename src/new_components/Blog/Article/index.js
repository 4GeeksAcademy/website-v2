import React, { Component, useState } from 'react'
import Link from 'gatsby-link'
import { H1, H2, H3, H4, Title, Separator, Paragraph, Span } from '../../Heading'
import { Grid, Div, Header, Container, Row, Column, Divider, Wrapper, WrapperImage } from '../../Sections'
import { RoundImage, Colors } from '../../Styling'
import LazyLoad from 'react-lazyload';
//import BaseBlogRender from './_baseBlogLayout'
import Icon from '../../Icon'
import twitterUser from '../../../utils/twitter'
import Image from 'gatsby-image'

class Article extends React.Component {

  constructor(props) {
    super(props)

    this.columns = props.columns
    this.data = props.data
    this.lang = props.pageContext.lang
    
    this.jsonData = this.setupData()
    
    console.log("articlesdata", this.jsonData)
  }

  setupData() {

    let json = [];

    this.props.data.map((master, i) => {

      //FALTA BLOQUE DE CODIGO, REVISAR ORIGINAL

      master.map((item, j) => {

        let data = item.node.frontmatter;

        json.push({ data: data })

      })

    })

    return json;

  }
  
  render() {
   
    return (
       <>
        
        <Grid columns={this.columns} justifyContent="center" padding="0 175px 0px 175px" >
          {
            this.jsonData.map(({data=nodo.data}, i) => {
              
              console.log()
              console.log(data.title)

              return <Div
                    key={i}
                    flexDirection="column"
                    background={Colors.white}
                    width="100%"
                    height="auto"
                    alignItems="left"
                    lineHeight="0px"
                    fontSize="0px"
                    padding="0 0 0 0px"
                    style={{ margin: "0 7px 87px 8px" }}>
                                                                 
                      <Grid rows="1" margin="25px 0 0 0" padding="0 0 0 0px">

                          {
                            data.image &&
                            <Link to={`/${this.lang}/post/${data.slug}`}>
                              <LazyLoad height={10} scroll={true} once={true}>
                                <RoundImage
                                  display="flex"
                                  url={data.image}
                                  bsize="cover"
                                  mb="0px"
                                  border="0px"
                                  position="left"
                                  width="100%"
                                  height="500px"                                  
                                />
                              </LazyLoad>
                            </Link>
                          }

                          <Link to={`/${this.lang}/post/${data.slug}`}>
                            (*) FULL STACK
                          </Link>
                                                
                          <Link to={`/${this.lang}/post/${data.slug}`}>
                            <H3
                              textAlign="left"
                              align_sm="left"
                              fs_xs="20px"
                              fs_sm="24px"
                              fs_md="16px"
                              fs_lg="20px"
                              fonSize="22px"
                            >
                              {
                                data.title
                              }
                            </H3>
                          </Link>
                        
                          <Paragraph fontFamily="Lato" fontSize="15px" fontWeight="300" color="gray" textAlign="left" margin="0 0 0 0">
                            {
                              data.excerpt                          
                            }                                                    
                          </Paragraph>
                        
                          <Paragraph color="blue" margin="0 0 0 0" textAlign="left">
                            <Link to={`/${this.lang}/post/${data.slug}`}>
                              Leer artículo &nbsp;
                              <Icon icon="arrowright" width="24" color={Colors.blue} />
                            </Link>
                          </Paragraph>

                          <Image source={require(data.image)}/>
                        
                      </Grid>
                
                  </Div>

            })
          }
        </Grid>
       
       </>
    )
  }

}

export default Article