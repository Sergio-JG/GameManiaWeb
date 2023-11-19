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

export default Game
