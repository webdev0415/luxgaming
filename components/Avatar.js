import React from 'react'
import Image from 'next/image'

export const Avatar = ({src}) => {
    return (
     <div className="bg-profile-blue-hexagon bg-cover w-14 h-16 bg-no-repeat flex items-center justify-center">
        <Image src={src}  objectFit="cover" width={32} height={40}/>
     </div>
    )
}