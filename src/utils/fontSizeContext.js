import React from 'react'

const FontSizeContext = React.createContext();

export function FontSizeContextProvider({ children }) {

    const [fontSize, setFontSize] = React.useState(18)

    const updateFontSize = (value) => {
        setFontSize(value)
    }
    return (
        <FontSizeContext.Provider value={{ fontSize, updateFontSize }}>
            {children}
        </FontSizeContext.Provider>
    )
}


export function useFontSizeContext() {
    const context = React.useContext(FontSizeContext)
    return context
}
