import React from 'react';
import '../App.css';

export const ProviderCard = (props) => {
    // the taxonomy has multiple licenses for a provider, reduce to unique roles using taxonomy code
    const uniqueroles = props.provider.taxonomies.filter((role, index, self) => index === self.findIndex((obj) => (obj.txCode === role.txCode)))
    const numroles = uniqueroles.length;
    const roles = uniqueroles.map((role, i) => {
        return (role.classification + (numroles <= 1 || i === (numroles-1) ? "":"; "));
    });

    return (
    <div className='prov-card'>
        <span>
        NPI: {props.provider.npi}<br/>
        <strong>{roles}</strong><br/>
        {props.provider.name}<br/>
        {props.provider.addrLine1}<br/>

        { //check if line2 has a value
        props.provider.addrLine2.length === 0 ? null:(<span>{props.provider.addrLine2} <br/></span>)
        }

        {props.provider.addrCity}, {props.provider.addrState} {props.provider.addrZip}<br/>
        </span>
    </div>
    )
}
