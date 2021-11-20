import React from "react";

import "./directory-menu.styles.scss";

import MenuItem from "../menu-item/menu-item.componet";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectDirectorySection } from '../../redux/directory/directory-reselect';
 
const Directory = ({ sections }) => (
    <div className="directory-menu">
        {sections.map( ({title,id, imageUrl, size, linkUrl})=>(
            <MenuItem 
                key={id} 
                title={title} 
                imageUrl= {imageUrl}
                size = {size}
                linkUrl = {linkUrl}
            />
        ))}
    </div>   
)

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection 
});

export default connect(mapStateToProps)(Directory);