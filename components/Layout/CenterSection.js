import React from 'react'

export const CenterSection = ({children}) => {
    return (
        <div className="col-span-2 bg-primary min-h-screen">
            {children}
        </div>
    )
}
