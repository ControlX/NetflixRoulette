import React from 'react';
import { ProcessGetRequest } from '../../utils/RestUtils'

/**
 * 
 * @param {*} url For future implementation 
 * @param {*} options For future implementation
 */
export default function useFetch(url, options) {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            try {
                // Will open this for future implementations
                //   const res = await fetch(url, options);
                //   const json = await res.json();
                let response = localStorage.getItem('movieTitles');
                if (response === undefined || response.length === 0) {
                    response = await ProcessGetRequest();
                    if (response.status === 200) {
                        localStorage.setItem('movieTitles', response)
                        setResponse(response.data);
                    }
                    else {
                        setError(true);
                    }
                }
                else{
                    setResponse(response.data);
                }
            } catch (error) {
                setError(error);
            }
            // setLoading(false)
        }
        fetchData();
    }, []);
    return { response, error };
};