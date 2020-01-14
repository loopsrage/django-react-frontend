
import React, { useState, useEffect } from 'react';
import api from "../api";


export function useApi(method, url, stateCallback, data={}, depends=[]){
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(() => {
        if(depends[0] !== null){
            switch(method){
                case "get":
                    const get_request = async () => {
                        setIsLoading(true)
                        await api.get(url)
                            .then(result => {
                                if(stateCallback){
                                    stateCallback(result.data)
                                }
                                setResponse(result.data)
                                setIsLoading(false)
                            })
                            .catch(error => {
                                setError(error)
                                setIsLoading(false)
                            })
                    }
                    get_request()
                    break;
                case "put":
                    const put_request = async () => {
                        setIsLoading(true)
                        await api.put(url)
                            .then(result => {
                                if(stateCallback){
                                    stateCallback(result.data)
                                }
                                setResponse(result.data)
                                setIsLoading(false)
                            })
                            .catch(error => {
                                setError(error)
                                setIsLoading(false)
                            })
                    }
                    put_request()
                    break;
                case "post":
                    const post_request = async () => {
                        setIsLoading(true)
                        await api.post(url, data)
                            .then(result => {
                                if(stateCallback){
                                    stateCallback(result.data)
                                }
                                setResponse(result.data)
                                setIsLoading(false)
                            })
                            .catch(error => {
                                setError(error)
                                setIsLoading(false)
                            })
                    }
                    post_request()
                    break;
                case "patch":
                    const patch_request = async () => {
                        setIsLoading(true)
                        await api.patch(url, data)
                            .then(result => {
                                if(stateCallback){
                                    stateCallback(result.data)
                                }
                                setResponse(result.data)
                                setIsLoading(false)
                            })
                            .catch(error => {
                                setError(error)
                                setIsLoading(false)
                            })
                    }
                    patch_request()
                    break;
                case "delete":
                    const delete_request = async () => {
                        setIsLoading(true)
                        await api.delete(url)
                            .then(result => {
                                if(stateCallback){
                                    stateCallback(result.data)
                                }
                                setResponse(result.data)
                                setIsLoading(false)
                            })
                            .catch(error => {
                                setError(error)
                                setIsLoading(false)
                            })
                    }
                    delete_request()
                    break;
            }
        }
    }, depends)
    return { response, error, isLoading }
}
