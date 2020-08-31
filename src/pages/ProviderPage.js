import React, {useState} from 'react';
import {ProviderQuery} from '../Provider/ProviderQuery.js';
import {ProvidersBox} from '../Provider/ProvidersBox.js';

export const ProviderPage = () => {
    const [providerState, setProviderState] = useState([]);

    return (
    <>
    <h1>Provider Query Page</h1>
    <ProviderQuery prov={providerState} setProviders={setProviderState}/>
    <ProvidersBox prov={providerState} />
    </>
)
};