import React from "react";

const RoundButton = ({title}) => {
    return (
        <div className="shadow-innerButton border-borderColor border-[1px] text-[11px] h-[20px] text-center bg-glow hover:bg-radiant bg-no-repeat bg-cover text-white font-semibold px-2">
            {title}
        </div>
    )
}

export default RoundButton;