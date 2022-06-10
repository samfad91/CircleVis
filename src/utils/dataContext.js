import React from 'react'
import randomizeData from "./randomizeData"

const DataContext = React.createContext();

export function DataContextProvider({ children }) {

    const [data, setData] = React.useState(randomizeData())

    const addData = (newData) => {
        setData(newData)
    }
    return (
        <DataContext.Provider value={{data , addData}}>
            {children}
        </DataContext.Provider>
    )
}


export function useDataContext() {
    const context = React.useContext(DataContext)
    return context
}

//  { DataContextProvider, useDataContext }