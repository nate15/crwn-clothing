import React from 'react';

import './custome-button.styles.scss';

const CustomeButton = ({children,inverted ,isGoogleSignIn, ...otherProps}) => (
    <button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps} >
        {children}
    </button>
);

export default CustomeButton;