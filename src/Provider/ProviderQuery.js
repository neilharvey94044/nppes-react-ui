import React, {useReducer, useContext, useEffect} from 'react';
import config from '../configuration.js';
import {AppContextHandle} from '../App.js';

export const initialProvQueryState = {
    zip: '',
    distance: '',
    taxonomyCode: '',
}

function reducer(state, { field, value}) {
    return {    
        ...state,
        [field]: value
    }
}

const queryProviders = async ({zip, distance, taxonomyCode}) => {
    let queryparams = new URLSearchParams();
    queryparams.append("zipcode", zip);
    queryparams.append("distance", distance);
    // queryparams.append("taxonomy", taxonomyCode);
    const options = {
        method: 'GET',
        mode: 'cors'
      };
    let queryurl = new URL(config.PROVIDER_QUERY_URL + queryparams);
    console.log(queryurl);
    const response = await fetch(queryurl, options)
        .then(response => {
            if(!response.ok)
            {
                throw new Error('API Invocation Failed.');
            }
            return response;
        })
        .catch( error => {
            console.log(error);
        });
        console.log(response.json());
    return response.json();
}


export const ProviderQuery = (props) => {
    // manage the query parameters state here
    const {appState, appDispatch} = useContext(AppContextHandle);
    const [queryparms, dispatch] = useReducer(reducer, appState.provQueryParms);

    
    // invoked to get matching providers when query form is submitted
    const submitHandler = (event) => {
        event.preventDefault();
        //save query parameters
        appDispatch({type: 'UPDATE_QUERY_PARMS', value: queryparms});
        //get query results
        const json = queryProviders(queryparms);
        //save query results
        appDispatch({type: 'UPDATE_QUERY_RESULTS', value: json});
    };
    
    // invoked when each query parameter is updated
    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    };
    
    const { zip, distance, taxonomyCode} = queryparms;

    return (
        <form id="queryprovidersform" onSubmit={submitHandler}>
            <label>Enter Zip Code<input name="zip" value={zip} onChange={onChange}></input></label>

            <label>Enter Distance In Miles<input name="distance" value={distance} onChange={onChange}></input></label>

            <label>Enter Taxonomy Code<input name="taxonomyCode" value={taxonomyCode} onChange={onChange}></input></label>
            <button type='submit'>Search</button>
        </form>

    )
}