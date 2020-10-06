import React, {useEffect} from 'react';
import { ProcessGetRequest } from '../../utils/RestUtils'

/**
 * 
 * @param {*} url For future implementation 
 * @param {*} options For future implementation
 */
export default function useFetch(url, options) {
    const [res, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            try {
                // Will open this for future implementations
                //   const res = await fetch(url, options);
                //   const json = await res.json();
                let res = localStorage.getItem('movie_titles');
                if (res === null || res === undefined || res.length === 0) {
                    res = await ProcessGetRequest();
                    if (res.status === 200) {
                        localStorage.setItem('movie_titles', JSON.stringify(response));
                        setResponse(res.data);
                    }
                    else {
                        setError(true);
                    }
                }
                else{
                    let parsed_response = JSON.parse(res);
                    setResponse(parsed_response.data);
                }
            } catch (error) {
                setError(error);
            }
            // setLoading(false)
        }
        fetchData();
    }, []);
    return { res, error };
};