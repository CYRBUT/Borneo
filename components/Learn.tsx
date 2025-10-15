import React, { useState, useEffect } from 'react';
import { getCulturalFacts } from '../services/geminiService';
import Spinner from './Spinner';
import { SparklesIcon, ArrowUpOnSquareIcon, TrashIcon, XMarkIcon } from './icons/HeroIcons';
import { UserRole, CulturalPost } from '../types';

const CULTURAL_POSTS_KEY = 'culturalPosts';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

interface LearnProps {
    userRole: UserRole;
}

const Learn: React.FC<LearnProps> = ({ userRole }) => {
    const [facts, setFacts] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<CulturalPost[]>([]);
    const [newPost, setNewPost] = useState<{ image: File | null, text: string, imagePreview: string | null }>({ image: null, text: '', imagePreview: null });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const isAdmin = userRole === UserRole.ADMIN;

    useEffect(() => {
        fetchFacts();
        try {
            const storedPosts = localStorage.getItem(CULTURAL_POSTS_KEY);
            setPosts(storedPosts ? JSON.parse(storedPosts) : []);
        } catch (e) {
            setPosts([]);
        }
    }, []);

    const fetchFacts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const newFacts = await getCulturalFacts();
            setFacts(newFacts);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load cultural facts.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setNewPost(prev => ({ ...prev, image: file, imagePreview: previewUrl }));
        }
    };

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.image || !newPost.text.trim()) return;

        try {
            const imageUrl = await fileToBase64(newPost.image);
            const post: CulturalPost = {
                id: `post-${Date.now()}`,
                imageUrl,
                text: newPost.text,
                date: new Date().toISOString()
            };
            const updatedPosts = [post, ...posts];
            setPosts(updatedPosts);
            localStorage.setItem(CULTURAL_POSTS_KEY, JSON.stringify(updatedPosts));
            setNewPost({ image: null, text: '', imagePreview: null });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleDeletePost = (id: string) => {
        const updatedPosts = posts.filter(p => p.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem(CULTURAL_POSTS_KEY, JSON.stringify(updatedPosts));
    };
    
    const formatDateTime = (dateString: string) => 
        new Date(dateString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/\./g, ':');

    return (
        <div className="max-w-7xl mx-auto animate-slide-in-up">
            <div className="relative rounded-lg overflow-hidden mb-12 shadow-lg">
                <img 
                    src="https://images.unsplash.com/photo-1588622872384-239b2a7597a3?q=80&w=2070&auto=format&fit=crop" 
                    alt="Budaya Borneo" 
                    className="w-full h-64 object-cover" 
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Jelajahi Budaya Borneo
                    </h1>
                    <p className="text-lg text-gray-200 max-w-2xl">
                        Temukan fakta menarik tentang bahasa dan tradisi masyarakat Dayak yang kaya dan beragam.
                    </p>
                </div>
            </div>

            {isAdmin && (
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg mb-12">
                    <h3 className="text-lg font-semibold mb-4 flex items-center"><ArrowUpOnSquareIcon className="mr-2" /> Admin: Unggah Konten Budaya</h3>
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="image-upload" className="block text-sm font-medium text-medium-light-text dark:text-medium-text mb-1">Gambar</label>
                            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20" required/>
                            {newPost.imagePreview && <img src={newPost.imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-48" />}
                        </div>
                         <div>
                            <label htmlFor="text-content" className="block text-sm font-medium text-medium-light-text dark:text-medium-text mb-1">Deskripsi</label>
                            <textarea id="text-content" value={newPost.text} onChange={e => setNewPost(prev => ({...prev, text: e.target.value}))} rows={4} className="w-full p-2 bg-light-border dark:bg-dark-border rounded resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Tulis deskripsi atau cerita tentang gambar..." required></textarea>
                        </div>
                        <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50">Unggah</button>
                    </form>
                </div>
            )}

            {posts.length > 0 && (
                <div className="mb-12">
                     <h2 className="text-2xl font-bold mb-6 text-center">Kisah dari Admin</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {posts.map(post => (
                            <div key={post.id} className="group relative bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden flex flex-col">
                                <img 
                                    src={post.imageUrl} 
                                    alt="Konten budaya" 
                                    className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                                    onClick={() => setSelectedImage(post.imageUrl)}
                                />
                                <div className="p-4 flex-grow">
                                    <p className="text-xs text-medium-light-text dark:text-medium-text mb-2">{formatDateTime(post.date)}</p>
                                    <p className="text-dark-text dark:text-light-text">{post.text}</p>
                                </div>
                                {isAdmin && (
                                    <button onClick={() => handleDeletePost(post.id)} className="absolute top-2 right-2 bg-red-500/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Hapus unggahan">
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                         ))}
                     </div>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-6 text-center">Fakta Cepat dari Gemini</h2>
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 dark:text-red-400 bg-red-500/10 p-4 rounded-lg">
                    <p><strong>Oops!</strong> {error}</p>
                    <button onClick={fetchFacts} className="mt-2 px-4 py-1 bg-red-500 text-white rounded-md text-sm">
                        Coba Lagi
                    </button>
                </div>
            )}

            {!isLoading && !error && (
                <div className="space-y-6">
                    {facts.map((fact, index) => (
                        <div 
                            key={index} 
                            className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg border-l-4 border-brand-accent animate-fade-in"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <p className="text-dark-text dark:text-light-text leading-relaxed">{fact}</p>
                        </div>
                    ))}
                    <div className="text-center pt-6">
                         <button 
                            onClick={fetchFacts} 
                            disabled={isLoading}
                            className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-2 px-6 rounded-full hover:scale-105 transform transition-all duration-300 disabled:opacity-50 flex items-center mx-auto"
                        >
                            <SparklesIcon className="w-5 h-5 mr-2"/>
                            Hasilkan Fakta Baru
                        </button>
                    </div>
                </div>
            )}

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative p-4" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Tampilan diperbesar" className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl" />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-0 right-0 m-2 bg-white/80 text-black p-2 rounded-full hover:scale-110 transition-transform backdrop-blur-sm"
                            aria-label="Tutup penampil gambar"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Learn;