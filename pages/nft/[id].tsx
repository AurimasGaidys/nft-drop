import React from 'react'
import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react"
function NFTDropPage() {

    // const address = useAddress();
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();

    return (
        <div className='flex h-screen flex-col lg:grid lg:grid-cols-10' >
            {/* Left here*/}
            <div className='bg-gradient-to-br from-cyan-900 to-rose-500 lg:col-span-4'>
                <div className='flex flex-col items-center justify-center py-2 lg:h-screen'>
                    <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                        <img
                            className='w-44 rounded-xl object-cover lg:h-96 lg:w-72'
                            src='https://niftys.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fniftys%2Fimage%2Fupload%2Fq_auto%2Cf_auto%2Fv1634052372%2Fspacejam%2Fgwm9vzwigdzwfyj8ftqy.webp&w=1920&q=75'
                            alt=""
                        />
                    </div>
                    <div className='p-5 text-center space-y-2'>
                        <h1 className='text-4xl font-bold text-white'>THE GOONS</h1>
                        <h2 className='text-xl text-red-300'>Introducing special edition  digital collectables</h2>
                    </div>
                </div>
            </div>
            {/* Right here*/}
            <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
                {/* Header here*/}
                <div className='flex items-center justify-between'>
                    <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
                        The{" "}<span className='font-extrabold underline decoration-violet-600/50'>NFT</span>{" "}marketplace
                    </h1>
                    <button onClick={() => { address ? disconnect() : connectWithMetamask() }} className='rounded-full bg-red-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base'>{address ? "Sign Out" : "Sign In"}</button>
                </div>
                <hr className='m-2 border' />
                {address && (
                    <p className='text-center text-sm text-red-500'>You are logged in with wallet {address.substring(0, 5)}...{address.substring(address.length, -5)}</p>
                )}

                {/* body here*/}
                <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0  lg:justify-center'>
                    <img className='w-80 object-cover pb-10 lg:h-40' src={"https://niftys.com/_next/image?url=https%3A%2F%2Fmedia.niftys.com%2Faccounts%2Fckqzi9r8l0124pdt0hvs81z0d%2Fmedia%2Fbanner-huBRgAO-KiAH-jDIhrHP8&w=1920&q=75"} alt={"asdasd asd "} />
                    <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>
                        THE GOON SQUAD HAS ARRIVED | NFT drop
                    </h1>
                    <p className='pt-2 text-green-500 '>2/25 NFT claimed</p>
                </div>
                {/* Mint button here*/}
                <button onClick={() => { }} className='mt-10 h-16 bg-red-500 w-full text-white rounded-full font-bold'>Mint nft (0.1 ETH)</button>
                <div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default NFTDropPage