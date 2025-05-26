interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    rating: number;
    cover: string;
    description: string;
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

interface BookParams {
    title: string;
    author: string;
    year: number;
    genre: string;
    rating: number;
    coverUrl: string;
    fileUrl: string;
    description: string;
}