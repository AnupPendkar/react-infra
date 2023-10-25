import React, {useState, useEffect} from 'react'

const SingletonService = () => {
    const [baseUrl ,setBaseUrl] = useState();

    function setApplicationBaseUrl(){
        console.log('ds')
    }

    useEffect(() => {
        setApplicationBaseUrl();
    }, [])
}

export default SingletonService
