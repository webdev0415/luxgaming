import React from 'react'

function LuxInputBox({placeholder, type, value, onChange}) {
    

    return (
        <div className="
        outline-none w-full border-[1px] border-gray-400 rounded-lg px-4 py-2 z-50 shadow-md">
        <input className="w-full bg-primary outline-none focus:bg-lxTopBar text-gray-300 placeholder-gray-500" 
        type={type}
        placeholder={placeholder} 
        onChange={(e) => onChange(e)}
        value={value}/>
        
        </div>
    )
}

export default LuxInputBox
