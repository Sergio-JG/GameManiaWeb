export interface Game {
    gameId: string;
    title: string;
    price: number;
    description: string;
    releaseDate: string;
    numberOfSales: number;
    totalScore: number;
    genres: any[];
    platforms: any[];
    reviews: any[];
}

export default Game
