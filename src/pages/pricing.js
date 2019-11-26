import React from 'react';
import styled from 'styled-components';
import PricesAndPayment from '../components/PricesAndPayment';
import Layout from '../global/Layout';
import Image from '../components/Image';

const Page = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #555;
  margin-top: 60px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-top: 12px;
  letter-spacing: 10px;
  text-transform: uppercase;
`;

const Pricing = () => (
  <Layout>
    <Page>

      <PricesAndPayment />
    </Page>
  </Layout>
);

export default Pricing;