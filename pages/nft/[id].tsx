import React, { useEffect, useState } from 'react'
import { useAddress, useMetamask, useDisconnect, useNFTDrop } from "@thirdweb-dev/react"
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings';
import Link from 'next/link';
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    collection: Collection;
}

function NFTDropPage({ collection }: Props) {

    const [claimedSupply, setClaimedSupply] = useState<number>(0);
    const [price, setPrice] = useState<string>();
    const [totalSupply, setTotalSupply] = useState<BigNumber>();
    const [loading, setLoading] = useState(true);
    const nftDrop = useNFTDrop("0x9f97456fF1510a771FDE084C6637FA1Dc77Eb0A1");
    // const address = useAddress();
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();


    useEffect(() => {
        if (!nftDrop) {
            return
        }

        const fetchNFTDropData = async () => {
            setLoading(true);
            const claimed = await nftDrop.getAllClaimed();
            const total = await nftDrop.totalSupply();
            setClaimedSupply(claimed.length);
            setTotalSupply(total);
            setLoading(false);
        }

        fetchNFTDropData();
    }, [nftDrop])

    useEffect(() => {
        if (!nftDrop) {
            return
        }

        const fetchPrice = (async () => {
            const claimConditions = await nftDrop.claimConditions.getAll();
            setPrice(claimConditions?.[0].currencyMetadata.displayValue);
        });

        fetchPrice();
    }, [nftDrop]);

    const mintNFT = () => {
        if (!nftDrop || !address) {
            return
        }
        setLoading(true);
        const notif = toast.loading("Minting NFT...", {
            style: {
                background: "white",
                color: "green",
                fontWeight: "bolder",
                fontSize: "17px",
                padding: "20px"
            }
        })
        const quantity = 1;
        nftDrop.claimTo(address, quantity).then((tranData) => {
            // const receipt = tranData[0].receipt;
            // const claimedTokenId = tranData[0].id;
            // const claimedNFTData = tranData[0].data;
            toast("Successfully minted :)", {
                duration: 8000,
                style: {
                    background: "white",
                    color: "green",
                    fontWeight: "bolder",
                    fontSize: "17px",
                    padding: "20px"
                }
            })

        }).catch(err => {
            toast("UPS... something went terribly wrong", {
                style: {
                    background: "red",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "17px",
                    padding: "20px"
                }
            })
            console.log(err);
        }).finally(() => {
            setLoading(false);
            toast.dismiss(notif);
        })
    }

    return (
        <div className='flex h-screen flex-col lg:grid lg:grid-cols-10' >
            <Toaster position='bottom-center' />
            {/* Left here*/}
            <div className='bg-gradient-to-br from-cyan-900 to-rose-500 lg:col-span-4'>
                <div className='flex flex-col items-center justify-center py-2 lg:h-screen'>
                    <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                        <img
                            className='w-44 rounded-xl object-cover lg:h-96 lg:w-72'
                            src={urlFor(collection.mainImage).url()}
                            alt=""
                        />
                    </div>
                    <div className='p-5 text-center space-y-2'>
                        <h1 className='text-4xl font-bold text-white'>{collection.title}</h1>
                        <h2 className='text-xl text-red-300'>{collection.description}</h2>
                    </div>
                </div>
            </div>
            {/* Right here*/}
            <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
                {/* Header here*/}
                <div className='flex items-center justify-between'>
                    <Link href={`/`}>
                        <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
                            The{" "}<span className='font-extrabold underline decoration-violet-600/50'>NFT</span>{" "}marketplace
                        </h1>
                    </Link>
                    <button onClick={() => { address ? disconnect() : connectWithMetamask() }} className='rounded-full bg-red-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base'>{address ? "Sign Out" : "Sign In"}</button>
                </div>
                <hr className='m-2 border' />
                {address && (
                    <p className='text-center text-sm text-red-500'>You are logged in with wallet {address.substring(0, 5)}...{address.substring(address.length, -5)}</p>
                )}

                {/* body here*/}
                <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0  lg:justify-center'>
                    <img className='w-80 object-cover pb-10 lg:h-40' src={urlFor(collection.previewImage).url()} alt={"asdasd asd "} />
                    <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>
                        {collection.collectionName}
                    </h1>
                    {loading ? (
                        <p className='pt-2 text-rose-400 animate-bounce '>Loading ...</p>
                    ) : (
                        <p className='pt-2 text-green-500 '> {claimedSupply}/{totalSupply?.toString()} claimed </p>
                    )}

                    {loading && <img className='w-10 h-10' src='https://www.inspirationde.com/media/2019/09/cd514331234507.564a1d2324e4e.gif'></img>}
                </div>
                {/* Mint button here*/}
                <button onClick={mintNFT} disabled={loading || claimedSupply == totalSupply?.toNumber() || !address} className='mt-10 h-16 bg-red-500 w-full text-white rounded-full font-bold disabled:bg-gray-400'>
                    {
                        loading ? (
                            <>Loading</>
                        ) : (
                            claimedSupply == totalSupply?.toNumber() ? (
                                <>SOLD OUT</>
                            ) : (
                                !address ? (
                                    <>SIGN IN</>
                                ) : (
                                    <span className='font-bold'> Mint NFT ({price} ETH)</span>
                                )
                            )
                        )
                    }
                </button>
                <div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const qry = '*[_type=="collection" && slug.current == $id][0]{ _id,title, description,collectionName,mainImage {asset},previewImage {asset}, slug {current}, creator-> {  _id, name, address, slug{ current }, }}';
    const collection = await sanityClient.fetch(qry, { id: params?.id });
    console.log("aaa", collection);

    if (!collection) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            collection: collection
        }
    };
}