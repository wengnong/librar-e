interface Book {
    id: string;
    title: string;
    author: string;
    year: number;
    genre: string;
    rating: number;
    coverUrl: string;
    fileUrl: string;
    description: string;
    createdAt: Date | null;
}

interface FeaturedBook {
    title: string;
    author: string;
    year: number;
    description: string;
    coverUrl: string;
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

interface BorrowBookParams {
    bookId: string;
    userId: string;
}

interface BorrowedBook {
    id: string;
    bookId: string; 
    title: string;
    author: string;
    genre: string;
    coverUrl: string;
    fileUrl: string;
    dueDate: string;
    status: "BORROWED" | "RETURNED";
    borrowedAt: Date;
}

interface BorrowHistory {
    id: string;
    bookId: string;
    title: string;
    author: string;
    genre: string;
    coverUrl: string;
    fileUrl: string;
    dueDate: string;
    status: "BORROWED" | "RETURNED";
    borrowedAt: Date;
    returnedAt: string | null;
}

interface ReturnBookParams {
    borrowRecordId: string;
}