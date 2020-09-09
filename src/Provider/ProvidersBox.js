import React from 'react';
import {ProviderCard} from './ProviderCard';
import '../App.css';

export const ProvidersBox = (props) => {
    console.log("ProvidersBox");

    return (
        <>

        <div className='prov-container'>
            {props.error && <div className='error'>{props.error.name}: {props.error.message}</div>}
            {props.loading ? <div className='msg'>Loading providers...</div> : 
                props.provQueryResults.map((provider, index) => {
                return <ProviderCard provider={provider} key={index}/>
           })}
        </div>
        </>
    );
}