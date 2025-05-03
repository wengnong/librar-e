interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    rating: number;
    total_copies: number;
    available_copies: number;
    cover: string;
    description: string;
    summary: string;
    isLoanedBook?: boolean;
}

interface FeaturedBook {
    title: string;
    author: string;
    year: number;
    description: string;
    cover: string;
}

interface AuthCredentials {
    username: string;
    email: string;
    password: string;
}