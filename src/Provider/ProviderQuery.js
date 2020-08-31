import React, {useReducer} from 'react';
import config from '../configuration.js';

const initialState = {
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

const queryProviders = async (props, zip, distance, taxonomyCode) => {
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
    return await fetch(queryurl, options)
        .then(response => {
            if(!response.ok)
            {
                throw new Error('API Invocation Failed.');
            }
            return response.json()
        })
        .then(json => {
            console.log("json is array:" + Array.isArray(json));
            console.log(json[0].name);
             props.setProviders(json);
        })
        .catch( error => {
            console.log(error);
        })
}


export const ProviderQuery = (props) => {
    
    // using the React hook "useReducer" to manage complex state
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const { zip, distance, taxonomyCode} = state;
    
    const submitHandler = (event) => {
        event.preventDefault();
        // invoke the REST API here
        queryProviders(props, zip, distance, taxonomyCode);
    };

    const onChange = (e) => {
        dispatch({field: e.target.name, value: e.target.value})
    };


    return (
        <form id="queryprovidersform" onSubmit={submitHandler}>
            <label>Enter Zip Code<input name="zip" value={zip} onChange={onChange}></input></label>

            <label>Enter Distance In Miles<input name="distance" value={distance} onChange={onChange}></input></label>

            <label>Enter Taxonomy Code<input name="taxonomyCode" value={taxonomyCode} onChange={onChange}></input></label>
            <button type='submit'>Search</button>
        </form>

    )
}