import React from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'

function ProfileImage() {
    const router = useRouter();
    return (
        <div className="relative h-10 w-10 md:h-20 md:w-20 p-2" onClick={_ => profile(router)}>
            <Image src='/profilePic.svg' layout='fill'/>
        </div>
    )
}

const profile = router => {
    router.push("/profile")
}

export default ProfileImage
