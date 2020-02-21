import React, {useState} from 'react';
import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import {Colors, Button} from '../Styling';
import StickyBar from "./StickyBar";

const CallToAction = ({ menuLinks}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (<>
        <StickyBar />
    </>)
}
CallToAction.propTypes = {
    // siteTitle: PropTypes.string,
}
CallToAction.defaultProps = {
    // siteTitle: ``,
}
export default CallToAction