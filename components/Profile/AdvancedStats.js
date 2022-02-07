import react from "react";

const mockData = [
    [
        { "value": "KD/ RATIO", "key": "4.67" },
        { "value": "KD/ RATIO", "key": "4.67" },
        { "value": "Experience", "key": "2.9 per min" }
    ],
    [
        { "value": "Gold earned", "key": "2345 per min" },
        { "value": "Average Kills", "key": "14.4 per gmae" },
        { "value": "Gold earned", "key": "2345 per min" }
    ],
    [
        { "value": "Longest kill streak", "key": "8 kills" },
        { "value": "Elo for 3v3 format", "key": "303 per game" },
        { "value": "Elo for 3v3 format", "key": "324 per game" }

    ],
    [
        { "value": "Longest kill streak", "key": "8 kills" },
        { "value": "Elo for 3v3 format", "key": "303 per game" },
        { "value": "Elo for 3v3 format", "key": "324 per game" }
    ]
]

const AdvancedStats = _ => {
    return (
        <div className="w-full px-4 bg-[#0a0e13]">
            <div className="font-extrabold text-xs mb-2 mt-5 text-white">Advanced Stats</div>
            <div className="pt-2"></div>
            <table className="w-full table-auto text-white border-separate">
                {
                    mockData.map((value, index) => (
                        <tr key={index}>
                            {
                                value.map((valuex, index_) => (
                                    <td key={index_} className="border border-tableBorderColor py-[14px] px-[22px]">
                                        <div className="flex flex-row justify-between">
                                            <div className="text-ADStatsColor font-bold text-xs">
                                                {valuex["value"]}
                                            </div>
                                            <div className="font-extrabold text-xs">
                                                {valuex["key"]}
                                            </div>
                                        </div>

                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default AdvancedStats