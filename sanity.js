// import { createClient } from "next-sanity";
// import createImageUrlBuilder from "@sanity/image-url";

// export const config = {
//     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
//     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//     apiVersion: "2021-03-25",
//     useCdn: process.env.NODE_ENV === "production",
// };

// if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
//     throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_PROJECT_ID!");
// }

// if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
//     throw new Error("Couldn't find env var NEXT_PUBLIC_SANITY_DATASET");
// }

// export const sanityClient = createClient(config);

import createImageUrlBuilder from "@sanity/image-url";
import {
    createCurrentUserHook,
    createClient,
} from "next-sanity";

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-03-25",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: false
};

export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBuilder(config).image(source);