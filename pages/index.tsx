import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { sanityClient, urlFor } from "../sanity"
import { Collection } from '../typings';

interface Props {
  collections: Collection[];
}

const Home = ({ collections }: Props) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-screen py-20 px-10 2xl:px-0 ">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='mb-10 text-4xl font-extralight'>
        The{" "}<span className='font-extrabold underline decoration-violet-600/50'>NFT</span>{" "}marketplace
      </h1>
      <main className='bg-slate-100 p-10 shadow-xl shadow-red-400/20'>
        <div className='grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {collections.map(x => {
            return (
              <Link href={`/nft/${x.slug.current}`}>
                <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105'>
                  <img
                    className="w-60 h-96 object-cover rounded-2xl"
                    src={urlFor(x.mainImage).url()}
                    alt="Main image"
                  />
                  <div className='p-5'>
                    <h2 className='text-3xl'>{x.title}</h2>
                    <p className='mt-2 text-sm text-gray-400'>{x.description}</p>
                  </div>
                </div>
              </Link>
            )
          }
          )}
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {

  const collections = await sanityClient.fetch('*[_type=="collection"]{ _id,title, description,collectionName,mainImage {asset}, slug {current}, creator-> {  _id, name, address, slug{ current }, }}', {});
  console.log("aaa", collections);
  return {
    props: {
      collections: collections
    }
  };
}