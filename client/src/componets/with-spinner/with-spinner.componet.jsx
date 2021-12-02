import React from 'react';

import Spinner from '../spinner/spinner.componet';

const WithSpinner = WrappedComponent => {
   const spin = ({isLoading, ...otherProps}) => {
       return isLoading ? (
        <Spinner />
        ) : (
            <WrappedComponent {...otherProps} />
        );
   }
   
   return spin;
}

export default WithSpinner;