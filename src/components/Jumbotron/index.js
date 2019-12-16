import React from 'react';
import {H1, H2, Title, Separator, Paragraph} from '../Heading'

import styled from 'styled-components';

const Jumbotron = () => (
    <div className="d-lg-flex flex-lg-row flex-sm-column tt">
        <div className="align-self-center ">
            <div><H1>Miami Coding Bootcamp</H1></div>
            <Separator primary />
            <H2 primary>LEARN TO CODE AND GET CAREER SUPPORT FOR LIFE</H2>
            <Paragraph primary>Join more than 500 graduates already working as coders and become a part of one of the world's biggest coding community.</Paragraph>
        </div>
        <div className="flex-lg-fill  flex-sm-fill bg-info">
            <img src="https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" width="100%" height="500px" />
        </div>
    </div>
);

export default Jumbotron;


{/* <div class="container">
            <div className="row">
                <div className="col-md-6 px-0">
                    <div className="row jumbo-lead px-5">
                        <H1>Miami Coding Bootcamp</H1>
                    </div>
                    <div className="row px-5">
                        <Separator primary />
                    </div>
                    <div className="row px-5">
                        <H2 primary>LEARN TO CODE AND GET CAREER SUPPORT FOR LIFE</H2>
                    </div>
                    <div className="row px-5">
                        <Paragraph primary>Join more than 500 graduates already working as coders and become a part of one of the world's biggest coding community.</Paragraph>
                    </div>
                    <div className="row px-5 mt-3">
                        <Link to="/program">
                            <div className="btn text-white btn-md rounded-pill jumbo-button" role="button">CHOOSE YOUR PROGRAM </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5 img-top">
                    <img src="https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" width="100%" height="500px%" />
                </div>
            </div>
        </div> */}