import React, { useState } from 'react'

const NavigationContext = React.createContext({})

export function NavigationProvider({children}){
    const [formData, setFormData] = useState('');

    const handleSearchCallback = event => {
        setFormData({
            formData: event.target.value
        });
    };

    return (
        <NavigationContext.Provider value={{
            formData, 
            handleSearchCallback
            }}>
            {children}
        </NavigationContext.Provider>
    )
    
}

export const NavigationConsumer = NavigationContext.Consumer
export default NavigationContext
