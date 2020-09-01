import React, { useContext } from 'react';
import {ProviderCard} from './ProviderCard';
import {AppContextHandle} from '../App.js';

export const ProvidersBox = (props) => {
    const {appState} = useContext(AppContextHandle);


    return (
        <div>
            {appState.provQueryResults.map(provider => {
                return <ProviderCard name={provider.name} />;
            })}
        </div>
    );
}