"use client"

import React, { useState, useMemo } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import BookCard from "../home/BookCard"

interface LibraryClientProps {
    initialBooks: Book[]
}

const LibraryClient = ({ initialBooks }: LibraryClientProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchBy, setSearchBy] = useState<'title' | 'author'>('title')
    const [selectedGenre, setSelectedGenre] = useState<string>('all')
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'title'>('newest')
    const [showFilters, setShowFilters] = useState(false)

    const availableGenres = useMemo(() => {
        const genres = Array.from(new Set(initialBooks.map(book => book.genre).filter(Boolean)))
        return genres.sort()
    }, [initialBooks])

    const filteredBooks = useMemo(() => {
        let filtered = [...initialBooks]

        // search
        if (searchTerm.trim()) {
            filtered = filtered.filter(book => {
                const searchValue = searchBy === 'title' ? book.title : book.author
                return searchValue?.toLowerCase().includes(searchTerm.toLowerCase())
            })
        }

        // filtering genre (based on what i've put on the database)
        if (selectedGenre !== 'all') {
            filtered = filtered.filter(book => book.genre === selectedGenre)
        }

        // sorting after click filter
        filtered = filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
                case 'oldest':
                    return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime()
                case 'rating':
                    return (Number(b.rating) || 0) - (Number(a.rating) || 0)
                case 'title':
                    return (a.title || '').localeCompare(b.title || '')
                default:
                    return 0
            }
        })

        return filtered
    }, [initialBooks, searchTerm, searchBy, selectedGenre, sortBy])

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedGenre('all')
        setSortBy('newest')
    }

    return (
        <div className="min-h-screen w-full">
            <div className="relative px-4 py-20 text-center">
                <div className="relative z-10">
                    <h1 className="paytone-one-regular text-3xl md:text-5xl bg-gradient-to-r from-[#EAB139] to-[#E78B48] text-transparent bg-clip-text uppercase mb-6">
                        FIND YOUR BOOKS HERE!
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                        Explore our complete collection of {initialBooks.length} books
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {/* Search section */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        {/* Search bar */}
                        <div className="flex-1 relative">
                            <div className="flex rounded-lg overflow-hidden bg-white shadow-lg">
                                <select
                                    value={searchBy}
                                    onChange={(e) => setSearchBy(e.target.value as 'title' | 'author')}
                                    className="px-4 py-3 bg-gray-50 border-r border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EAB139] text-sm font-medium cursor-pointer"
                                >
                                    <option value="title">Title</option>
                                    <option value="author">Author</option>
                                </select>
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder={`Search by ${searchBy}...`}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EAB139]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Filter toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 bg-[#EAB139] text-white rounded-lg hover:bg-[#f18912] transition-colors font-medium cursor-pointer"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {/* Filter options */}
                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-white/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Genre */}
                                <div>
                                    <label className="block text-white font-medium mb-2">Genre</label>
                                    <select
                                        value={selectedGenre}
                                        onChange={(e) => setSelectedGenre(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EAB139] cursor-pointer"
                                    >
                                        <option value="all">All Genres</option>
                                        {availableGenres.map(genre => (
                                            <option key={genre} value={genre}>{genre}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort by */}
                                <div>
                                    <label className="block text-white font-medium mb-2">Sort By</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EAB139] cursor-pointer"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="rating">Highest Rating</option>
                                        <option value="title">Title A-Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results summary */}
                <div className="text-center mb-8">
                    <p className="text-gray-300 text-lg">
                        Showing {filteredBooks.length} of {initialBooks.length} books
                        {searchTerm && (
                            <span className="text-[#EAB139] font-medium">
                                {" "}for &quot;{searchTerm}&quot;
                            </span>
                        )}
                        {selectedGenre !== 'all' && (
                            <span className="text-[#EAB139] font-medium">
                                {" "}in {selectedGenre}
                            </span>
                        )}
                    </p>
                </div>

                {/* Books grid */}
                {filteredBooks.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-14">
                        {filteredBooks.map((book) => (
                            <BookCard key={book.id || book.title} {...book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No books found
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {searchTerm ? 
                                `No books match your search \"${searchTerm}\"` : 
                                "Try adjusting your filters or search terms"
                            }
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-[#EAB139] text-white rounded-lg hover:bg-[#d49d2a] transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Library stats */}
                {initialBooks.length > 0 && (
                    <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                        <h2 className="paytone-one-regular text-3xl font-semibold bg-gradient-to-r from-[#EAB139] to-[#E78B48] text-transparent bg-clip-text uppercase mb-10 text-center">
                            LIBRARY STATISTICS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#EAB139] mb-2">
                                    {initialBooks.length}
                                </div>
                                <div className="text-gray-300">Total Books</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#EAB139] mb-2">
                                    {new Set(initialBooks.map(book => book.author).filter(Boolean)).size}
                                </div>
                                <div className="text-gray-300">Authors</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#EAB139] mb-2">
                                    {availableGenres.length}
                                </div>
                                <div className="text-gray-300">Genres</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LibraryClient