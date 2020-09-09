import React from 'react';
import {ProviderQuery} from '../Provider/ProviderQuery.js';
import '../App.css';

export const ProviderPage = (props) => {
    console.log('ProviderPage');

    return (
    <>
        <div className='page-title'>
            <h2>Provider Search Page</h2>
        </div>
        <ProviderQuery provQueryParms={props.provQueryParms} 
                          provQueryParmsDispatch={props.provQueryParmsDispatch} 
                          provQueryResults={props.provQueryResults}
                          provQueryResultsDispatch={props.provQueryResultsDispatch}/>
  
    </>
)
};