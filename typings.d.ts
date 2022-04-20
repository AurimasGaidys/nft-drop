interface Image {
    assets: {
        url: string;
    }
}

export interface Creator {
    _id: string;
    name: string;
    address: string;
    slug: {
        current: string;
    };
    image: Image;
    bio: string;
}

export interface Collection {
    _id: string;
    title: string;
    description: string;
    collectionName: string;
    address: string;
    slug: {
        current: string;
    };
    previewImage: Image;
    mainImage: Image;
    creator: Creator;
}

