import React from "react";
import RoundButton from "../RoundButton";
const statusTitles = ["VERIFIED", "PREMIUM", "ROOKIE"]
const socials = ["facebook", "twitch", "youtube", "twitter"]

const NavProfile = _ => {
    return (
        <div>
        <div className="flex flex-row justify-between items-center text-white">
            <div className="flex flex-row justify-between space-x-1 my-4">
                {
                    statusTitles.map((title, key) => (
                        <li className="list-none" key={key}>
                            <RoundButton title={title} />
                        </li>
                    ))
                }
            </div>
            <div className="flex flex-row justify-between space-x-5">
                <div className="flex flex-row justify-between space-x-5">
                    {
                        socials.map((social, key) => (
                            <li className="list-none" key={key}>
                                <div>{social}</div>
                            </li>
                        ))
                    }
                </div>
            </div>
        </div>
        </div>
    )
}

export default NavProfile