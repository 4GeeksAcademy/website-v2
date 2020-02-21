import React from 'react';
import Layout from '../global/Layout';
const NotFoundPage = () => (
  <Layout
    seo={{
      slug: '404',
      title: '4Geeks Academy - Page not found',
      description: '4Geeks Academy - Page not found',
      image: "",
      keywords: []
    }}
    context={{
      lang: "us"
    }}
  >
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);
export default NotFoundPage;
