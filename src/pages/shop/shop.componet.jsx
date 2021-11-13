import React from "react";
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../componets/collection-preview/collection-preview.componet';

class ShopPage extends React.Component{
    constructor(){
        super();

        this.state = {
            collections: SHOP_DATA
        }
    }

    render(){
        const {collections} = this.state;
        return (
            <div className="shop">
               {
                   collections.map(({id, ...otherShopCollections}) => (
                        <CollectionPreview key={id} {...otherShopCollections}/>
                   ))
               }
            </div>

        )
    }

}

export default ShopPage;

