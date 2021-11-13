import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.componet";

const CollectionPreview = ({title, items}) =>(
    <div className="collection-preview">
        <h1>{title}</h1>
        <div class="preview">
            {
                items.filter((item,idx) => (idx < 4)).map(({id, ...itemProps}) => (
                    <CollectionItem key={id} {...itemProps} />
                ))
                
            }
        </div>
    </div>
);

export default CollectionPreview;