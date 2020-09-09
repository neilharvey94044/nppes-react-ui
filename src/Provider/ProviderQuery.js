import React, {useReducer, useContext, useEffect, useState} from 'react';
import config from '../configuration.js';
import {AppContextHandle} from '../App.js';
import {ProvidersBox} from './ProvidersBox.js';
import {providerSearchTypes} from '../constants.js';

export const initialProvQueryState = {
    zip: '',
    distance: '',
    npitype: 1,
    taxonomyCode: '',
    npi: '',
}

function reducer(state, { field, value}) {
    return {    
        ...state,
        [field]: value
    }
}

export const ProviderQuery = () => {
    console.log("ProviderQuery");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {appState, appDispatch} = useContext(AppContextHandle);
    const [queryparms, dispatch] = useReducer(reducer, appState.provQueryParms);
    const [searchType, setSearchType] = useState(providerSearchTypes.NONE);
    const {zip, distance, npitype, taxonomyCode, npi} = queryparms;

    useEffect( () => {
        // console.log("Mount");
        queryProviders();
    }, [searchType, appState]);
        // }, []);
    
    const queryProviders = async () => {
        setError(null);
        let queryparams = new URLSearchParams();
        let queryurl = null;
        switch(searchType) {
                case providerSearchTypes.NONE:
                    console.log("search type NONE");
                    return;
                case providerSearchTypes.ZIP:
                    console.log("search type ZIP");
                
                    if(zip.length === 0 || distance.length === 0) {
                        console.log("Zip query requires zip and distance");
                        setError(Error("Zip query requires zip and distance"));
                        appDispatch({type: 'UPDATE_QUERY_RESULTS', field: 'provQueryResults', value: []});
                        return;
                    }
                    queryparams.append("zipcode", zip);
                    queryparams.append("distance", distance);
                    queryparams.append("npitype", npitype);
                    queryparams.append("taxonomy", taxonomyCode);
                    queryurl = new URL(config.PROVIDER_QUERY_URL + "?" + queryparams);
                    break;

                case providerSearchTypes.NPI:
                    console.log("search type NPI");
                    if(npi.length < 10) {
                        console.log("NPI must be 10 digits");
                        setError(Error("NPI must be 10 digits"));
                        appDispatch({type: 'UPDATE_QUERY_RESULTS', field: 'provQueryResults', value: []});
                    }
                    queryurl = new URL(config.PROVIDER_QUERY_URL + npi);
                    break;
        }
                
                
                
        const options = {
            method: 'GET',
            mode: 'cors'
        };
        console.log(queryurl);
        setLoading(true);
        await fetch(queryurl, options)
            .then(response => {
                if(!response.ok){
                    return null;
                }
                let type = response.headers.get("content-type");
                if (!type.includes("application/json")) {
                    throw new TypeError(`Expected JSON, got ${type}`);
                }
                return response.json();
            })
            .then(json => {
                //save query results
                if(json) {
                    console.log("Saving json");
                    console.log(json);
                    setError(null);
                    appDispatch({type: 'UPDATE_QUERY_RESULTS', field: 'provQueryResults', value: json});
                }
                else {
                    throw TypeError("Invalid data from server - not JSON");
                }
            })
            .catch(err => {
                console.log(err);
                setError(err);
                appDispatch({type: 'UPDATE_QUERY_RESULTS', field: 'provQueryResults', value: []});
            });
        setLoading(false);
    }

   
    // invoked to get provider by Zip
    const submitZipHandler = (event) => {
        console.log("submitZipHandler");
        event.preventDefault();
        //save query parameters
        appDispatch({type: 'UPDATE_QUERY_PARMS', field: 'provQueryParms', value: queryparms});
        //get query results
        setSearchType(providerSearchTypes.ZIP);
        // queryProviders();
    };
    
 // invoked to get Provider by NPI
 const submitNPIHandler = (event) => {
     console.log("submitNPIHandler");
    event.preventDefault();
    setSearchType(providerSearchTypes.NPI);
    //save query parameters
    appDispatch({type: 'UPDATE_QUERY_PARMS', field: 'provQueryParms', value: queryparms});
    //get query results
    // queryProviders();
};

    // invoked when each query parameter is updated
    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    };
    
    return (
        <>
        <div className='sub-search-container'>
        <form className="subs subs-zip" onSubmit={submitZipHandler}>
            <label className='f-label'>Zip<input className='f-input' name="zip" value={zip} placeholder='Enter Zip Code' onChange={onChange}></input></label>

            <label className='f-label'>Distance<input className='f-input' name="distance" value={distance} placeholder='Enter Distance In Miles' onChange={onChange}></input></label>

            <input type="radio" id="Org" name="npitype" value={2}></input><label className='f-label'>Organization</label>
            <label className='f-label'>Taxonomy Code<input className='f-input' name="taxonomyCode" value={taxonomyCode} placeholder='Optional' onChange={onChange}></input></label>
            <button type='submit' className="search-button">Search On Zip</button>
        </form>
        <form className="subs subs-npi" onSubmit={submitNPIHandler}>
            <label className='f-label'>NPI<input className='f-input' name="npi" value={npi} placeholder='Enter NPI' onChange={onChange}></input></label>
            <button type='submit' className="search-button">Search On NPI</button>

        </form>
        </div>

        <div>
            <ProvidersBox loading={loading} error={error}/>
        </div>
        </>
    )
}