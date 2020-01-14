import React, { useEffect } from 'react'

const baseUrl = 'http://localhost:533/'
const apiUrl = 'api/v1/'

export default function useUrl(props){
    const {  modelBase, objectId='', depends=[], ...other } = props
    // Takes arguments and builds a url with it
    
    const [fullUrl, setFullUrl] = useState(baseUrl + apiUrl)
    
    useEffect(() => {
        setFullUrl(baseUrl + apiUrl + modelBase + objectId + "/")
    }, depends)

    return { fullUrl, baseUrl, apiUrl, modelBase, objectId, other }
}