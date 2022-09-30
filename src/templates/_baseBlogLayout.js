import React from "react";
import BlogLayout from "../global/BlogLayout";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const BaseBlogRender = (Page) => (props) => {
  // console.log("Rending: ", props);
  const { data, pageContext } = props;
  let yml = null;
  try {
    yml = data[`all${cap(pageContext.type)}Yaml`].edges[0].node;
  } catch (err) {
    // console.error("Props: ", props);
    console.error(
      "There was a problem loading the data for " + pageContext.type,
      data
    );
    console.error(err);
    return (
      <div className="alert alert-danger">
        There was a problem loading the data
      </div>
    );
  }

  return (
    <BlogLayout type="page" seo={yml.meta_info} context={pageContext}>
      {/* <StickyBar /> */}
      <Page {...props} yml={yml} />
    </BlogLayout>
  );
};
export default BaseBlogRender;
