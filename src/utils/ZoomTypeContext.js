import React from 'react'

const ZoomTypeContext = React.createContext();

export function ZoomTypeContextProvider({ children }) {

    const [zoomType, setZoomType] = React.useState("SEMENTIC")

    const updateZoomType = (value) => {
        setZoomType(value)
    }
    return (
        <ZoomTypeContext.Provider value={{ zoomType, updateZoomType }}>
            {children}
        </ZoomTypeContext.Provider>
    )
}


export function useZoomTypeContext() {
    const context = React.useContext(ZoomTypeContext)
    return context
}
