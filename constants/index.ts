export const navigationLinks = [
    {
        href: "/library",
        label: "Library",
    },

    {
        img: "/icons/user.svg",
        selectedImg: "/icons/user-fill.svg",
        href: "/my-profile",
        label: "My Profile",
    },
];

export const adminSideBarLinks = [
    {
        img: "/icons/admin/home.svg",
        route: "/admin",
        text: "Home",
    },
    {
        img: "/icons/admin/users.svg",
        route: "/admin/users",
        text: "Users",
    },
    {
        img: "/icons/admin/book.svg",
        route: "/admin/books",
        text: "Books",
    },
    {
        img: "/icons/admin/bookmark.svg",
        route: "/admin/borrowed-books",
        text: "Borrowed",
    }
];

export const FIELD_NAMES = {
    username: "Username",
    email: "Email",
    password: "Password",
};

export const FIELD_TYPES = {
    username: "text",
    email: "email",
    password: "password",
};

export const FIELD_PLACEHOLDER = {
    username: "thisismyusername",
    email: "youremail@email.com",
    password: "password123",
};

export const sampleBooks = [
    {
        id: 0,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        year: 1953,
        genre: "Dystopian / Science Fiction",
        rating: 4.5,
        total_copies: 30,
        available_copies: 18,
        cover: "/images/books/fahrenheit451.jpg",
        description:
            "The novel, Fahrenheit 451, follows in the viewpoint of Guy Montag, a fireman who becomes disillusioned with his role of censoring literature and destroying knowledge, eventually quitting his job and committing himself to the preservation of literary and cultural writings.",
        summary:
            "In a world where knowledge is censored and free thought is forbidden, Guy Montag begins to question the system that enforces conformity. As he starts to rebel against the oppressive regime, Bradbury's classic explores the dangers of censorship and the power of books."
    },    
    {
        id: 1,
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "Dystopian / Political Fiction",
        rating: 4.5,
        total_copies: 20,
        available_copies: 10,
        cover: "/images/books/1984.jpg",
        description:
            "A chilling dystopian novel set in a totalitarian society ruled by Big Brother, where independent thought is a crime and truth is manipulated.",
        summary:
            "In a bleak future where the Party watches everything and controls reality itself, Winston Smith dares to dream of rebellion. George Orwell's '1984' is a profound warning about surveillance, censorship, and the loss of individuality in an oppressive regime.",
    },
    {
        id: 2,
        title: "I Am a Cat",
        author: "Soseki Natsume",
        year: 1906,
        genre: "Fiction / Japanese Literature",
        rating: 3.8,
        total_copies: 40,
        available_copies: 25,
        cover: "/images/books/iamacat.jpg",
        description:
            "A humorous and satirical novel narrated from the perspective of a nameless cat who offers sharp commentary on the lives and follies of middle-class Tokyo society during the Meiji era.",
        summary:
            "Told through the witty eyes of a nameless cat, 'I Am a Cat' explores the absurdities and contradictions of modernizing Japan. With keen observations and dry humor, Soseki Natsume critiques human nature, society, and culture during a time of great change.",
    },    
    {
        id: 3,
        title: "The Girl Who Fell Beneath the Sea",
        author: "Axie Oh",
        year: 2022,
        genre: "Fantasy / Young Adult",
        rating: 4.5,
        total_copies: 30,
        available_copies: 18,
        cover: "/images/books/thegirlwhofellbeneaththesea.jpg",
        description:
            "A beautifully written feminist retelling of a Korean folktale, this novel follows a brave girl who sacrifices herself to the Sea God to save her people and discovers a mysterious spirit realm beneath the waves.",
        summary:
            "Mina throws herself into the sea to save her brother's beloved, becoming the Sea God's bride. As she navigates a world of spirits and forgotten gods, she must uncover secrets, face ancient curses, and find her voice in a magical journey of love, courage, and destiny.",
    },    
    {
        id: 4,
        title: "The Count of Monte Cristo",
        author: "Alexandre Dumas",
        year: 1844,
        genre: "Adventure / Historical Fiction",
        rating: 4.7,
        total_copies: 35,
        available_copies: 15,
        cover: "/images/books/thecountofmontecristo.jpg",
        description:
            "A gripping tale of betrayal, imprisonment, and revenge, this classic novel follows Edmond Dantès as he transforms into the mysterious Count of Monte Cristo to seek justice against those who wronged him.",
        summary:
            "Falsely imprisoned for a crime he didn't commit, Edmond Dantès escapes and discovers a hidden fortune. With a new identity, he sets out to reward loyalty and punish betrayal in a sweeping saga of vengeance, justice, and redemption."
    },    
    {
        id: 5,
        title: "Narcissus and Goldmund",
        author: "Hermann Hesse",
        year: 1930,
        genre: "Philosophical Fiction / Historical Fiction",
        rating: 3.7,
        total_copies: 25,
        available_copies: 12,
        cover: "/images/books/narcissusandgoldmund.jpg",
        description:
            "A profound philosophical novel exploring the contrasting lives of Narcissus, the disciplined monk, and Goldmund, the artistic wanderer, as they search for meaning and self-understanding in medieval Europe.",
        summary:
            "Through the parallel journeys of two friends—one rooted in intellect and the other in emotion—Hesse examines the eternal conflict between the life of the mind and the life of the senses, offering a moving meditation on individuality and purpose."
    },
    {
        id: 6,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance / Classic Literature",
        rating: 4.4,
        total_copies: 40,
        available_copies: 28,
        cover: "/images/books/prideandprejudice.jpg",
        description:
            "One of the most beloved novels in English literature, this witty and romantic story follows Elizabeth Bennet as she navigates love, class, and family expectations in 19th-century England.",
        summary:
            "When spirited Elizabeth Bennet meets the proud Mr. Darcy, sparks fly in this timeless tale of misunderstandings, moral growth, and true love. Jane Austen masterfully critiques societal norms through sharp dialogue and unforgettable characters."
    },    
];