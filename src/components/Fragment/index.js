
import React from "react"
import PropTypes from "prop-types"
import { useLocation } from '@reach/router';
import { parseQueryString } from "../../utils/utils"
import styled from 'styled-components';
import { checkPropTypes } from "prop-types";

export const An = styled.a`
    color: black;
    background: yellow;
    padding: 10px 20px;
    border: 1px solid black;
    display: inline-block;
    cursor: pointer;
    position: absolute;
    z-index: 2000;
`

const GITHUB_REPO = "https://github.com/4GeeksAcademy/website-v2/tree/master/src/data";
const Fragment = ({ github, ...rest }) => {
    let { edit } = parseQueryString(useLocation().search)
    const [ editMode, setEditMode ] = React.useState(false)
    React.useEffect(() => {
        if(edit !== undefined){
            localStorage.setItem("edit-mode", "true");
            setEditMode(true)
        } 
        else setEditMode(localStorage.getItem("edit-mode") === "true")
    }, [])
    if(editMode && github) return <div style={{ position: "relative" }} {...rest}>
        <An href={`${GITHUB_REPO}${github}`} target="blank" rel="noopener noreferrer">edit</An>
        {rest.children}
    </div>
    else return <div {...rest}>{rest.children}</div>;
}
Fragment.propTypes = {
    github: PropTypes.string,
    children: PropTypes.node
}
Fragment.defaultValues = {
    github: null,
    children: null
}
export default Fragment;