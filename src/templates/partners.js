import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {Column, Row, Container, Divider, Wrapper} from "../components/Sections"
import {Title, H4, Paragraph} from '../components/Heading'
import {Button, Colors} from '../components/Styling'
import Credentials from '../components/Credentials'
import WhoIsHiring from '../components/WhoIsHiring'
import BaseRender from './_baseRender'
import {beHiringPartner} from "../actions";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
const Partners = (props) => {
    const {data, pageContext, yml} = props;
    const [formMessage, setFormMessage] = useState("Fill the form to submit")
    const [showModal, setShowModal] = useState(false)
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
    return (
        <>
            <Wrapper
                style="default"
                image="yes"
                url={yml.image}
                border="bottom"
                height="500px"
            >
                <Divider height="100px" />
                <Title
                    size="5"
                    title={yml.tagline}
                    paragraph={yml.sub_heading}
                    main
                    color={Colors.white}
                    fontSize="46px"
                    textAlign="center"
                    paragraphColor={Colors.white}
                />
                <Row align="center">
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={open}
                        onClose={handleClose}
                    ><div style={modalStyle} className={classes.paper}>
                            <Row height="20%" align="center">
                                <Column size="12" align="center"><H4>REVIEW GUIDEBOOK</H4></Column>
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
                                    {formData.first_name &&
                                        formData.last_name &&
                                        formData.email ?
                                        <Button width="100%" padding=".2rem .45rem" color={Colors.blue} textColor={Colors.white}
                                            onClick={() => {
                                                beHiringPartner(formData)
                                                setFormMessage("")
                                            }}>Submit</Button>
                                        : null}
                                </Column>
                                <Column size="3" customRespSize respSize="3" align="right">
                                    <Button outline width="100%" padding=".2rem .45rem" color={Colors.red} textColor={handleClose}>Close</Button>
                                </Column>
                            </Row>


                        </div>
                    </Modal>
                    <Button width="300px" margin="15px 0px" onClick={handleOpen} color="red" textColor="white">{yml.button}</Button>
                </Row>
            </Wrapper>
            <Wrapper
                style="default">
                <Credentials move="up" up="100" />
            </Wrapper>
            <Divider height="50px" />
            <Wrapper
                style="default"
                image="no"
                color={Colors.lightGray}
                border="top"
            >

                <Divider height="20px" />
                <WhoIsHiring source="partners" />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default"
            >
                <Divider height="50px" />


                <WhoIsHiring source="coding" />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default"
            >
                <Divider height="50px" />


                <WhoIsHiring source="influencers" />
                {/* <Row align="center">
                    <Button width="300px" color={Colors.blue} onClick={() => setShowModal(!showModal)} textColor={Colors.white} margin="2rem 0" padding=".85rem">{yml.button_section.button_text}</Button>
                </Row> */}
            </Wrapper>

        </>
    )
};
export const query = graphql`
  query PartnersQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            sub_heading
            button
            image
            meta_info{
                slug
                title
                description
                image
                keywords
            }
            button_section{
                button_text
            }
        }
      }
    }
  }
`;
export default BaseRender(Partners);