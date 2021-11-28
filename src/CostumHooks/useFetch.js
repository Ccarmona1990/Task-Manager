import {useState, useEffect} from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getData = async ()=>{
        try {
            const response = await fetch(url);
            if(response.status > 299){
                setIsLoading(false);
                setIsError(true);
                throw new Error (`Data status: ${response.status}`)
            }
            const fetchedData = await response.json();
            setData(fetchedData);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsError(true);
        }
    };
    useEffect(()=>{
        getData();
    },[url]);
    return {isError, isLoading, data}
}
