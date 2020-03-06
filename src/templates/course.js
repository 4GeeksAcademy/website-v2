import React, {useState, useEffect, useContext, useRef} from 'react';
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider, Sidebar} from '../components/Sections'
import {Title, H2, H3, H4, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, RoundImage} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import PricesAndPayment from '../components/PricesAndPayment'
import Alumni from '../components/Alumni'
import Credentials from '../components/Credentials'
import Scrollspy from 'react-scrollspy'
import BaseRender from './_baseRender'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProgramSelector from '../components/ProgramSelector'
import ToggleButton from '../components/ToggleButton'
import {requestSyllabus} from "../actions";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

// import Modal from '../components/Modal';
// import SimpleModal from '../components/SimpleModal';

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`
function rand () {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle () {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1.25rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Program = ({data, pageContext, yml}) => {
  const scrollRef = useRef();
  const [test, setTest] = useState("")
  const [oldScrollPos, setOldScrollPos] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const geek = data.allCourseYaml.edges[0].node;
  const [showModal, setShowModal] = useState(false);
  const [formMessage, setFormMessage] = useState("Fill the form to submit");
  const details = data.allCourseYaml.edges[0].node.details[0];
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [formData, setVal] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let week = "";
  {
    pageContext.slug === "full-stack-web-development-bootcamp-full-time"
      ? week = 9
      : pageContext.slug === "full-stack-web-development-bootcamp-part-time"
        ? week = 16
        : pageContext.slug === "coding-introduction"
        && null
  }

  return (<>
    <div className={test}
    >
      <Wrapper
        style="default"
        image="yes"
        url={yml.meta_info.image}
        border="bottom"
        height="600px"
        backgroundSize="cover"
      >
        <Divider height="20%" />
        <ProgramSelector week={week} />
        <Divider height="20px" />
        <Title
          size="5"
          title={yml.tagline}
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"

        />
        <Row align="center">
          <Column align="right" size="6"><Button width="200px" color="red" margin="15px 0" textColor=" white">{yml.button.apply_button_text}</Button></Column>
          <Column align="left" size="6">
            <Button width="200px" onClick={handleOpen} color={Colors.blue} margin="15px 0" textColor=" white">{yml.button.syllabus_button_text}</Button>
          </Column>
        </Row>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        ><div style={modalStyle} className={classes.paper}>
            <Row height="20%" align="center">
              <Column size="12" align="center"><H4>REQUEST SYLLABUS</H4></Column>
            </Row>
            <Row height="70%">
              <Column size="12">
                <Row height="30%" align="center">
                  <Column size="11" >
                    <Input
                      type="text" className="form-control" placeholder="First name *"
                      onChange={(e) => setVal({...formData, first_name: e.target.value})}
                      value={formData.firstName}
                    />
                  </Column>
                </Row>
                <Row height="30%" align="center">
                  <Column size="11">
                    <Input type="text" className="form-control" placeholder="Last Name *"
                      onChange={(e) => setVal({...formData, last_name: e.target.value})}
                      value={formData.lastName}
                    />
                  </Column>
                </Row>
                <Row height="30%" align="center">
                  <Column size="11">
                    <Input type="email" className="form-control" placeholder="Email *"
                      onChange={(e) => setVal({...formData, email: e.target.value})}
                      value={formData.email}
                    />
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="10%" padding="5px 0 0 0" borderTop={`1px solid ${Colors.blue}`}>

              <Column size="6" customRespSize respSize="6">
                <Paragraph>{formMessage}</Paragraph>
              </Column>
              <Column size="3" customRespSize respSize="3" align="right">
                {
                  formData.first_name &&
                    formData.last_name &&
                    formData.email ?
                    <Button width="100%" padding=".2rem .45rem" color={Colors.blue} textColor={Colors.white}
                      onClick={() => {
                        requestSyllabus(formData)
                        setFormMessage("")
                      }}>Submit</Button>
                    : null
                }
              </Column>
              <Column size="3" customRespSize respSize="3" align="right">
                <Button outline width="100%" padding=".2rem .45rem" color={Colors.red} textColor={Colors.white} onClick={handleClose}>Close</Button>
              </Column>
            </Row></div>
        </Modal>
      </Wrapper>
      <Wrapper
        style="default">
        <Credentials up="60" />
      </Wrapper>
      <Sidebar
        shadow
        borders="1.25rem"
        display_xs="none"
        display_sm="none"
        display_md="none"
      >
        <Scrollspy style={{fontSize: "12px", position: "sticky", top: "10%", fontFamily: "Lato-Bold, sans-serif", color: Colors.blue}} items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6',]} currentClassName="nav__item--active">
          <li><a className="nav-item nav-link side" href="#section-1" >{yml.sidebar.membership}</a></li>
          <li><a className="nav-item nav-link side" href="#section-2">{yml.sidebar.program}</a></li>
          <li><a className="nav-item nav-link side" href="#section-3">{yml.sidebar.geeks_vs_other}</a></li>
          <li><a className="nav-item nav-link side" href="#section-4">{yml.sidebar.pricing}</a></li>
          <li><a className="nav-item nav-link side" href="#section-5">{yml.sidebar.alumni}</a></li>
        </Scrollspy>
      </Sidebar>
      <section className="section" id="section-1"></section>
      <Container fluid>
        <Row>
          <Column size="2">
          </Column>
          <Column size="8">
            <Row >
              <Column size="6" >
                <Card
                  h_xs="400px"
                  h_sm="370px"
                  h_md="470px"
                  h_lg="470px"
                  h_xl="470px"
                  padding="20px"
                  shadow height="400px"
                  width="100%"
                  margin="10px 0px"
                  move="up"
                  up="100px">
                  <Row height="100%">
                    <Column size="10" customRespSize respSize="10">
                      <Row marginLeft="0px" marginBottom="15px" height="15%">
                        <RoundImage url="/images/geekpal.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          <Paragraph
                            fs_xs="10px"
                            fs_sm="10px"
                            fs_md="11px"
                            fs_lg="12px"
                            fs_xl="16px"
                            color={Colors.black}
                            customTextAlignSmall
                            alignXs="left">{geek.geek_data.geek_pal_heading}</Paragraph>
                        </Column>
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          {geek.geek_data.geek_pal.map((pal, index) => {
                            return (
                              <Row key={1} marginBottom="4px">
                                <Column size="1" customRespSize respSize="1" alignSelf="center">
                                  <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                                </Column>
                                <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                  <Paragraph
                                    fs_xs="10px"
                                    fs_sm="10px"
                                    fs_md="12px"
                                    fs_lg="12px"
                                    fs_xl="14px"
                                    color={Colors.gray}>{pal}</Paragraph>
                                </Column>
                              </Row>
                            )
                          })}
                        </Column>
                      </Row>
                    </Column>
                    <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} /></Column>
                  </Row>
                </Card>
              </Column>
              <Column size="6">
                <Card
                  h_xs="400px"
                  h_sm="400px"
                  h_md="470px"
                  h_lg="470px"
                  h_xl="470px"
                  padding="20px"
                  shadow
                  height="400px"
                  width="100%"
                  margin="10px 0px"
                  move="up"
                  up="100px">
                  <Row height="100%">
                    <Column size="10" customRespSize respSize="10">
                      <Row marginLeft="0px" marginBottom="15px" height="15%">
                        <RoundImage url="/images/geekforce.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row >
                        <Column size="12">
                          <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                            alignXs="left">{geek.geek_data.geek_force_heading}</Paragraph>
                        </Column>
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          {geek.geek_data.geek_force.map((pal, index) => {
                            return (
                              <Row key={1} marginBottom="2px" >
                                <Column size="1" customRespSize respSize="1" alignSelf="center">
                                  <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                                </Column>
                                <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                  <Paragraph fs_xs="10px"
                                    fs_sm="10px"
                                    fs_md="11px"
                                    fs_lg="12px"
                                    fs_xl="14px" color={Colors.gray}>{pal}</Paragraph>
                                </Column>
                              </Row>
                            )
                          })}
                        </Column>
                      </Row>
                    </Column>
                    <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} /></Column>
                  </Row>
                </Card>
              </Column>
            </Row>
          </Column>
        </Row>
      </Container>
      {/* </Wrapper> */}
      <Divider height="100px" />

      {/* PROGRAM DETAILS */}
      <Wrapper
        style="default"

      >
        <Title
          size="10"
          title={yml.details.heading}
          paragraph={yml.details.sub_heading}
          primary
        />
        <Divider height="50px" />
        <Row>
          <Column size="12" customRespSize respSize="12">
            <Row>
              <Column size="12" customRespSize respSize="11">

                <Card width="100%" height="450px" color="white" shadow >
                  <Tabs >
                    <Header height="8%">
                      <TabList >
                        {yml.details.details_modules.map((item, index) => {
                          return (<Tab key={item.module_name} onClick={() => setCurrentIndex(index)}>
                            <Paragraph
                              color={Colors.white}
                              fs_xs="8px"
                              fs_sm="12px"
                              fs_md="12px"
                              fs_lg="14px"
                              fs_xl="16px"
                            >
                              {item.module_name}
                            </Paragraph>
                          </Tab>)
                        })
                        }
                      </TabList>
                    </Header>
                    <Body height="92%">
                      {yml.details.details_modules.map((item, i) => {
                        return (
                          <TabPanel key={item.title} onChange={() => setInd(i)}>
                            <Container width="fluid" p_xs="0" height="100%">
                              <Row height="20%">
                                <Column size="6" paddingLeft="20px" padding="15px 0" alignXs="left">
                                  <Paragraph color={Colors.black} fontSize="20px">{item.title}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" alignResp="left">
                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" >
                                  <Paragraph color={Colors.gray} fontSize="14px">{yml.details.left_labels.description}</Paragraph>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                  <Paragraph
                                    color={Colors.gray}
                                    fs_xs="10px"
                                    fs_sm="12px"
                                    fs_md="10px"
                                    fs_lg="12px"
                                    fs_xl="16px"
                                  >{item.description}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" alignResp="left">
                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                  <Paragraph color={Colors.gray} fontSize="14px">{yml.details.left_labels.projects}</Paragraph>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                  <Paragraph
                                    color={Colors.gray}
                                    fs_xs="10px"
                                    fs_sm="12px"
                                    fs_md="10px"
                                    fs_lg="12px"
                                    fs_xl="16px"
                                  >{item.projects}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" alignResp="left">
                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                  <Paragraph color={Colors.gray} fontSize="14px">{yml.details.left_labels.duration}</Paragraph>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                  <Paragraph
                                    color={Colors.gray}
                                    fs_xs="10px"
                                    fs_sm="12px"
                                    fs_md="10px"
                                    fs_lg="12px"
                                    fs_xl="16px"
                                  >{item.duration}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" >
                                <Column size="3" customRespSize respSize="2" padding="15px 0" image="no" color={Colors.lightGray} border="custom" customBorderRadius="0 0 0 1.25rem">
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph
                                        align="center"
                                        color={Colors.gray}
                                        fs_xs="10px"
                                        fs_sm="12px"
                                        fs_md="10px"
                                        fs_lg="12px"
                                        fs_xl="16px">{yml.details.left_labels.skills}</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1" >
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >1</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1">
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >2</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >3</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >4</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >5</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >6</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%" align="center">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >7</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >8</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined} border="custom" customBorderRadius="0 0 1.25rem 0">
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >9</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                              </Row>
                            </Container>
                          </TabPanel>
                        )
                      })
                      }
                    </Body>
                  </Tabs>
                </Card >
              </Column>
            </Row>
          </Column>
        </Row>

        <section className="section" id="section-2"></section>
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default"
      >
        <section className="section" id="section-3"></section>
        <Title
          size="10"
          title={yml.geeksVsOthers.heading}
          paragraph={yml.geeksVsOthers.sub_heading}
          primary
        />
        <Divider height="50px" />
        <GeeksVsOthers />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title={yml.prices.heading}
          paragraph={yml.prices.sub_heading}
          primary
        />
        <section className="section" id="section-4"></section>
        <PricesAndPayment type={pageContext.slug} lang={pageContext.lang} />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title={yml.alumni.heading}
          paragraph={yml.alumni.sub_heading}
          customParagraphSize="8"
          primary
        />
        <Divider height="50px" />
        <section className="section" id="section-5"></section>
        <Alumni hasTitle />
        <Divider height="100px" />
      </Wrapper>
      <Divider height="100px" />
    </div>
  </>
  )
};

export const query = graphql`
  query CourseQuery($file_name: String!, $lang: String!) {
    allCourseYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            button{
              syllabus_button_text
              syllabus_submit_text
              apply_button_text
            }
            meta_info{
                title
                description
                image
                keywords
            }
            geek_data {
              geek_force
              geek_pal
              geek_pal_heading
              geek_force_heading
            }
            details {
              heading
              sub_heading
              left_labels{
                description
                projects
                duration
                skills
              }
              details_modules {
                title
                projects
                slug
                module_name
                duration
                description
              }
            }
            geeksVsOthers{
              heading
              sub_heading
            }
            prices{
              heading
              sub_heading
            }
            alumni{
              heading
              sub_heading
            }
            sidebar{
              membership
              program
              geeks_vs_other
              pricing
              alumni
            }
        }
      }
    }
  }
`;

export default BaseRender(Program);

const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: ${props => props.height};
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;
const Body = styled.div`
    background: white;
    height: ${props => props.height};
    border-radius: 0 0 1.25rem 1.25rem;`