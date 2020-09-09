import React, { useContext } from 'react';
import {ProviderCard} from './ProviderCard';
import {AppContextHandle} from '../App.js';
import '../App.css';

export const ProvidersBox = (props) => {
    console.log("ProvidersBox");
    const {appState} = useContext(AppContextHandle);
    console.log(appState.provQueryResults);
 

    return (
        <>

        <div className='prov-container'>
            {props.error && <div className='error'>{props.error.name}: {props.error.message}</div>}
            {props.loading ? <div className='msg'>Loading providers...</div> : 
                appState.provQueryResults.map((provider, index) => {
                return <ProviderCard provider={provider} key={index}/>
           })}
        </div>
        </>
    );
}