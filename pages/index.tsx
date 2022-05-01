import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typing'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div
      className='" bg-gradient-to-br from-purple-900 to-rose-900 py-20 px-10
    2xl:px-0'
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col ">
        <Head>
          <title>NFT Drop</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="mb-10 text-4xl text-white font-extralight">
          The{' '}
          <span className="font-extrabold underline decoration-yellow-500 text-white">
            CoolestFAM
          </span>{' '}
          NFT Market place.
        </h1>

        <main className="bg-slate-100 p-10 shadow-xl shadow-red-900">
          <div className="grid space-x-3  md:grid-cols-2 lg:grid-cols-3 2xl:grid">
            {collections.map((collection) => (
              <Link href={`/${collection.slug.current}`}>
                <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
                  <img
                    className="h-96 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className="p-5 text-center">
                    <h2 className="tex-3xl">{collection.title}</h2>
                    <p className="mt-2 text-sm text-gray-400">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection" ]{
    _id,
    title,
    description,
    nftCollectionName,
    address,
    mainImage {
    asset
    },

    slug {
    current
    },
    creator-> {
    _id,
    name,
    address,
    slug {
    current
    },
  },
}`

  const collections = await sanityClient.fetch(query)
  console.log(collections)

  return {
    props: {
      collections,
    },
  }
}
