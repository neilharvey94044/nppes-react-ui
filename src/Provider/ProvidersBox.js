import React from 'react';
import {ProviderCard} from './ProviderCard';

export const ProvidersBox = (props) => {

    console.log("props.prov is array:" + Array.isArray(props.prov));

    return (
        <div>
            {props.prov.map(provider => {
                 return <ProviderCard name={provider.name} />;
            })}
        </div>
    );
}