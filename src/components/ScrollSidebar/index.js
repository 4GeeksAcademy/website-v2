import React from 'react';
import styled from 'styled-components';
import Scrollspy from 'react-scrollspy'

const ScrollSidebar = () => (
    <>
        <div id="list-example" className="list-group">
            <a className="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
            <a className="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
            <a className="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
            <a className="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
        </div>
        <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
            <h4 id="list-item-1">Item 1</h4>
            <p>...</p>
            <h4 id="list-item-2">Item 2</h4>
            <p>...</p>
            <h4 id="list-item-3">Item 3</h4>
            <p>...</p>
            <h4 id="list-item-4">Item 4</h4>
            <p>...</p>
        </div>
    </>
);

export default ScrollSidebar;