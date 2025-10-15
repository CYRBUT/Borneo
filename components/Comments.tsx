
import React, { useState, useMemo, useEffect } from 'react';
import { Comment, RatingSummary, UserRole } from '../types';
import { MOCK_COMMENTS } from '../constants';
import { moderateContent } from '../services/geminiService';
import { StarIcon, TrashIcon, HeartSolidIcon, ChatBubbleOvalLeftIcon, XMarkIcon, HeartIcon } from './icons/HeroIcons';
import { StarIcon as StarIconOutline } from './icons/HeroIconsOutline';

const Rating: React.FC<{ rating: number; setRating?: (rating: number) => void }> = ({ rating, setRating }) => (
    <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={setRating ? () => setRating(star) : undefined} disabled={!setRating} className={`transition-colors ${setRating ? 'cursor-pointer' : ''}`} aria-label={`Rate ${star} stars`}>
                {star <= rating ? <StarIcon className="w-5 h-5 text-yellow-400" /> : <StarIconOutline className="w-5 h-5 text-yellow-400" />}
            </button>
        ))}
    </div>
);

const calculateRatingSummary = (comments: Comment[]): RatingSummary => {
    if (comments.length === 0) return { average: 0, total: 0, counts: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 } };
    const totalRating = comments.reduce((acc, c) => acc + c.rating, 0);
    const counts = comments.reduce((acc, c) => {
        const ratingKey = c.rating.toString() as keyof RatingSummary['counts'];
        acc[ratingKey]++;
        return acc;
    }, { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 });

    return { average: totalRating / comments.length, total: comments.length, counts };
};

const findAndMutateComment = (comments: Comment[], id: string, mutateFn: (comment: Comment) => void): Comment[] => {
    return comments.map(comment => {
        if (comment.id === id) {
            mutateFn(comment);
            return { ...comment };
        }
        if (comment.replies && comment.replies.length > 0) {
            return { ...comment, replies: findAndMutateComment(comment.replies, id, mutateFn) };
        }
        return comment;
    });
};

const findAndDeleteComment = (comments: Comment[], id: string): Comment[] => {
    let filteredComments = comments.filter(c => c.id !== id);
    return filteredComments.map(c => {
        if (c.replies && c.replies.length > 0) {
            return { ...c, replies: findAndDeleteComment(c.replies, id) };
        }
        return c;
    });
}

const CommentCard: React.FC<{ comment: Comment; onReply: (id: string, reply: Comment) => void; onDelete: (id: string) => void; onLike: (id: string) => void; isAdmin: boolean; isLiked: boolean; level?: number }> = ({ comment, onReply, onDelete, onLike, isAdmin, isLiked, level = 0 }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!replyMessage.trim()) return;
        const newReply: Comment = {
            id: `reply-${Date.now()}`,
            username: isAdmin ? 'Admin' : 'Guest',
            email: '',
            message: replyMessage,
            rating: 0,
            date: new Date().toISOString(),
            likes: 0,
            replies: []
        };
        onReply(comment.id, newReply);
        setReplyMessage('');
        setShowReplyForm(false);
    };

    const handleLike = () => {
        onLike(comment.id);
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className={`transition-all duration-500 ${level > 0 ? 'ml-4 sm:ml-8 border-l-2 border-light-border dark:border-dark-border pl-4 sm:pl-6' : ''}`}>
            <div className="group">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-2">
                             <span className="font-semibold">{comment.username}</span>
                             {comment.username === 'Admin' && (
                                <span className="text-xs font-bold bg-brand-primary text-white px-2 py-0.5 rounded-full">Admin</span>
                             )}
                        </div>
                        <p className="text-medium-light-text dark:text-medium-text text-sm mb-2">{formatDate(comment.date)}</p>
                    </div>
                    {comment.rating > 0 && <Rating rating={comment.rating} />}
                </div>
                <p className="text-dark-text dark:text-light-text mb-2">{comment.message}</p>
                <div className="flex items-center space-x-4 text-sm text-medium-light-text dark:text-medium-text">
                    <button onClick={handleLike} disabled={isLiked} className="flex items-center space-x-1 hover:text-brand-primary transition-colors disabled:cursor-not-allowed disabled:text-red-500">
                        {isLiked ? <HeartSolidIcon className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5" />}
                        <span>{comment.likes}</span>
                    </button>
                    <button onClick={() => setShowReplyForm(!showReplyForm)} className="flex items-center space-x-1 hover:text-brand-primary transition-colors">
                        <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                        <span>Reply</span>
                    </button>
                     {isAdmin && (
                        <button onClick={() => onDelete(comment.id)} className="flex items-center space-x-1 text-red-500 opacity-50 group-hover:opacity-100 transition-opacity">
                            <TrashIcon className="h-5 w-5" />
                            <span>Delete</span>
                        </button>
                    )}
                </div>
            </div>
            {showReplyForm && (
                <form onSubmit={handleReplySubmit} className="mt-4 animate-fade-in flex items-start space-x-2">
                    <textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="Write a reply..." className="flex-grow p-2 bg-light-border dark:bg-dark-border rounded h-16 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm" required></textarea>
                    <div className="flex flex-col space-y-1">
                        <button type="submit" className="bg-brand-primary text-white font-bold p-2 rounded-full transform transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l16-5.333a.75.75 0 000-1.418l-16-5.333z" /></svg>
                        </button>
                         <button type="button" onClick={() => setShowReplyForm(false)} className="bg-light-border dark:bg-dark-border text-dark-text dark:text-light-text p-2 rounded-full transform transition-all duration-300">
                            <XMarkIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </form>
            )}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map(reply => <CommentCard key={reply.id} comment={reply} onReply={onReply} onDelete={onDelete} onLike={onLike} isAdmin={isAdmin} isLiked={isLiked} level={level + 1} />)}
                </div>
            )}
        </div>
    );
};

const Comments: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
    const [newComment, setNewComment] = useState({ username: 'Guest', email: '', message: '', rating: 0 });
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        try {
            const storedComments = localStorage.getItem('comments');
            setComments(storedComments ? JSON.parse(storedComments) : MOCK_COMMENTS);
        } catch (error) { setComments(MOCK_COMMENTS); }
    }, []);

    useEffect(() => {
        try { localStorage.setItem('comments', JSON.stringify(comments)); } catch (error) { console.error("Failed to save comments", error); }
    }, [comments]);

    const ratingSummary = useMemo(() => calculateRatingSummary(comments), [comments]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.rating === 0) { setFormError('Rating is required.'); return; }
        setIsSubmitting(true);
        setFormError(null);
        try {
            if (!(await moderateContent(newComment.message))) {
                setFormError("Your comment was flagged as sensitive and could not be posted.");
                return;
            }
            const commentToAdd: Comment = { ...newComment, id: `comment-${Date.now()}`, date: new Date().toISOString(), likes: 0, replies: [] };
            setComments([commentToAdd, ...comments]);
            setNewComment({ username: 'Guest', email: '', message: '', rating: 0 });
        } catch (error) { setFormError("An error occurred. Please try again.");
        } finally { setIsSubmitting(false); }
    };
    
    const handleLikeComment = (id: string) => {
        if (likedComments.has(id)) return;
        setComments(prev => findAndMutateComment(prev, id, c => { c.likes = (c.likes || 0) + 1; }));
        setLikedComments(prev => new Set(prev).add(id));
    };

    const handleDeleteComment = (id: string) => setComments(prev => findAndDeleteComment(prev, id));
    const handleReplyComment = (id: string, reply: Comment) => setComments(prev => findAndMutateComment(prev, id, c => c.replies.unshift(reply)));
    
    const isAdmin = userRole === UserRole.ADMIN;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in-up">
            <div className="md:col-span-1 space-y-8">
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Username" value={newComment.username} onChange={e => setNewComment({ ...newComment, username: e.target.value })} className="w-full p-2 bg-light-border dark:bg-dark-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary" required />
                        <textarea placeholder="Your message..." value={newComment.message} onChange={e => setNewComment({ ...newComment, message: e.target.value })} className="w-full p-2 bg-light-border dark:bg-dark-border rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary" required></textarea>
                        <div>
                            <div className="flex items-center space-x-2"><span className="text-medium-light-text dark:text-medium-text">Rating:</span><Rating rating={newComment.rating} setRating={r => { setNewComment({ ...newComment, rating: r }); if (formError) setFormError(null); }} /></div>
                            {formError && <p className="text-red-400 text-sm mt-1">{formError}</p>}
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-2 px-4 rounded-full hover:scale-105 transform transition-all duration-300 disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </div>
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Rating Summary</h3>
                    <div className="flex items-center space-x-2 mb-4"><StarIcon className="w-8 h-8 text-yellow-400" /><span className="text-3xl font-bold">{ratingSummary.average.toFixed(1)}</span><span className="text-medium-light-text dark:text-medium-text">/ 5 ({ratingSummary.total} reviews)</span></div>
                    <div className="space-y-1">{Object.entries(ratingSummary.counts).reverse().map(([star, count]) => (<div key={star} className="flex items-center space-x-2 text-sm"><span>{star} star</span><div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2.5"><div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${ratingSummary.total > 0 ? (Number(count) / ratingSummary.total) * 100 : 0}%` }}></div></div><span className="w-8 text-right">{count}</span></div>))}</div>
                </div>
            </div>
            <div className="md:col-span-2 bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>
                <div className="space-y-6 max-h-[calc(100vh-20rem)] overflow-y-auto pr-4">{comments.map((comment) => (<div key={comment.id} className="border-b border-light-border dark:border-dark-border pb-4 last:border-b-0"><CommentCard comment={comment} onReply={handleReplyComment} onDelete={handleDeleteComment} onLike={handleLikeComment} isAdmin={isAdmin} isLiked={likedComments.has(comment.id) || (comment.replies && comment.replies.some(r => likedComments.has(r.id)))} /></div>))}</div>
            </div>
        </div>
    );
};

export default Comments;
