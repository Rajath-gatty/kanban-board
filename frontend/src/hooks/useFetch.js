import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (url = null, options = null, method = "GET") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makeRequest = useCallback(
        async (requestUrl, requestOptions = null, requestMethod = "GET") => {
            try {
                setLoading(true);
                setError(null);

                let response;
                if (requestMethod.toUpperCase() === "POST") {
                    response = await axios.post(
                        requestUrl,
                        requestOptions?.body || {},
                        requestOptions?.config || {}
                    );
                } else {
                    response = await axios.get(
                        requestUrl,
                        requestOptions?.config || {}
                    );
                }

                setData(response.data);
                return response.data;
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        if (url) {
            makeRequest(url, options, method);
        }
    }, [url, options, method, makeRequest]);

    return { data, loading, error, makeRequest };
};

export default useFetch;
