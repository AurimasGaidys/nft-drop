import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient } from "../sanity"
import { Collection } from '../typings';

interface Props {
  collections: Collection[];
}

const Home = ({ collections }: Props) => {
  return (
    <div className="">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
        The{" "}<span className='font-extrabold underline decoration-violet-600/50'>NFT</span>{" "}marketplace
      </h1>
      <main>
        <div>
          {collections.map(x => {
            return (
              <div>{x.title}
                {/* <img src={urlFor(x.mainImage).url()} alt="asdasd adas das"/> */}
              </div>
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