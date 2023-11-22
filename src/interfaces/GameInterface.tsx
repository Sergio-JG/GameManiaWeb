export interface Game {
    gameId: string;
    title: string;
    price: number;
    image: string;
    description: string;
    releaseDate: string;
    numberOfSales: number;
    totalScore: number;
    genres: Genre[];
    platforms: Platform[];
    reviews: Review[];
    quantity: number;
}

export interface Genre {
    genreId: string;
    name: string;
}

export interface Platform {
    platformId: string;
    name: string;
}

export interface Review {
    reviewId: string;
    userId: string;
    gameId: string;
    score: number;
    comment: string;
}

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    profilePic: string;
    password: string;
    socialId: string;
    social: Social;
    roleId: string;
    role: Role;
    addressId: string;
    address: Address;
    creditCard: CreditCard[];
}

export interface Social {
    socialId: string;
    steamUrl: string;
    twitchUrl: string;
    youtubeUrl: string;
    discordTag: string;
}

export interface Role {
    roleId: string;
    name: string;
}

export interface Address {
    addressId: string;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
}

export interface CreditCard {
    creditCardId: string;
    userId: string;
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
    billingAddress: string;
}

export default Game
