import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import NavigationContext from "../../providers/NavigationProvider";


export default function Search(){
    const { formData, handleSearchCallback } = useContext(NavigationContext);
    return (
        <>
            <TextField id="outlined"
                label="Search"
                variant="outlined"
                placeholder='Search'
                value={ formData }
                onChange={ handleSearchCallback } 
            />
        </>
    )
}
