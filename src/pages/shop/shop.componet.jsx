import React from "react";
import { Route } from "react-router-dom";

import './shop.styles.scss';

import CollectionsOverview from '../../componets/collections-overview/collections-overview.compoent'
import CollectionPage from "../collection/collection.componet";

const ShopPage = ({ match }) => (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route  path={`${match.path}/:categoryId`} component={CollectionPage} />

    </div>
)

export default ShopPage;

