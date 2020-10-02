import React from "react";
import Layout from '../global/Layout';
import LandingLayout from '../global/LandingLayout';

const Layouts = {
    "default": Layout,
    "landing": LandingLayout,
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const BaseRender = (Page, layout="default") => (props) => {
    // console.log("Rending: ", props);
    const Layout = Layouts[layout]
    const {data, pageContext} = props;
    let yml = null;
    try {
        yml = data[`all${cap(pageContext.type)}Yaml`].edges[0].node;
    }
    catch (err) {
        // console.error("Props: ", props);
        console.error("There was a problem loading the data", data);
        console.error(err);
        return <div className="alert alert-danger">There was a problem loading the data</div>
    }

    return <Layout type="page" seo={yml.meta_info} context={pageContext}>
        {/* <StickyBar /> */}
        <Page {...props} yml={yml} />
    </Layout>
};
export default BaseRender;