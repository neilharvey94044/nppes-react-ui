import React from 'react';
import {ProviderQuery} from '../Provider/ProviderQuery.js';
import '../App.css';

export const ProviderPage = () => {
    console.log('ProviderPage');

    return (
    <>
        <div className='page-title'>
            <h2>Provider Search Page</h2>
        </div>
        <ProviderQuery />
  
    </>
)
};