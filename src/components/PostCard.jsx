import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsApi } from '../services/api';
import './PostCard.css';

const PostCard = ({ post }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (post.userId) {
      fetchUser();
    }
  }, [post.userId]);

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const userData = await postsApi.getUserById(post.userId);
      setUser(userData);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'utilisateur:', error);
    } finally {
      setLoadingUser(false);
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <article className="post-card">
      <div className="post-card-header">
        <h2 className="post-title">
          <Link to={`/post/${post.id}`} className="post-link">
            {post.title}
          </Link>
        </h2>
        <span className="post-id">#{post.id}</span>
      </div>
      
      <div className="post-body">
        <p className="post-excerpt">
          {truncateText(post.body)}
        </p>
      </div>
      
      <div className="post-footer">
        <div className="post-author">
          {loadingUser ? (
            <div className="author-loading">
              <div className="author-avatar skeleton"></div>
              <div className="author-details">
                <div className="author-name skeleton-text"></div>
                <div className="author-email skeleton-text"></div>
              </div>
            </div>
          ) : user ? (
            <div className="author-info">
              <div className="author-details">
                <div className="author-name">{user.name}</div>
              </div>
            </div>
          ) : (
            <div className="author-info">
              <div className="author-avatar fallback">
                {post.userId}
              </div>
              <div className="author-details">
                <div className="author-name">Utilisateur {post.userId}</div>
                <div className="author-email">Email non disponible</div>
              </div>
            </div>
          )}
        </div>
        
        <Link 
          to={`/post/${post.id}`} 
          className="read-more-btn"
        >
          Lire plus →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;