import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsApi } from '../services/api';
import './PostDetailPage.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPostData(id);
    }
  }, [id]);

  const fetchPostData = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      const postData = await postsApi.getPostById(postId);
      setPost(postData);
      
      if (postData.userId) {
        fetchUserData(postData.userId);
      }
    } catch (err) {
      setError('Post non trouvé ou erreur lors du chargement.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      setLoadingUser(true);
      const userData = await postsApi.getUserById(userId);
      setUser(userData);
    } catch (err) {
      console.error('Erreur lors du chargement de l\'utilisateur:', err);
    } finally {
      setLoadingUser(false);
    }
  };

  if (loading) {
    return (
      <div className="post-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement du post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-page">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>{error || 'Post non trouvé'}</p>
          <div className="error-actions">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Retour à l'accueil
            </button>
            <button onClick={() => fetchPostData(id)} className="btn btn-secondary">
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Accueil</Link>
        <span className="breadcrumb-separator">→</span>
        <span className="breadcrumb-current">Post #{post.id}</span>
      </nav>

      <article className="post-detail">
        <header className="post-header">
          <div className="post-meta">
            <span className="post-id">Post #{post.id}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
        </header>

        <div className="post-content">
          <p>{post.body}</p>
        </div>

        <footer className="post-footer">
          <div className="author-section">
            <h3>Auteur</h3>
            {loadingUser ? (
              <div className="author-card loading">
                <div className="author-avatar skeleton"></div>
                <div className="author-info">
                  <div className="skeleton-text name"></div>
                  <div className="skeleton-text email"></div>
                  <div className="skeleton-text company"></div>
                </div>
              </div>
            ) : user ? (
              <div className="author-card">
                <div className="author-info">
                  <h4 className="author-name">{user.name}</h4>
                </div>
              </div>
            ) : (
              <div className="author-card fallback">
                <div className="author-avatar fallback">
                  {post.userId}
                </div>
                <div className="author-info">
                  <h4 className="author-name">Utilisateur {post.userId}</h4>
                  <p className="author-email">Informations non disponibles</p>
                </div>
              </div>
            )}
          </div>
        </footer>
      </article>

      <div className="post-actions">
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          ← Retour à l'accueil
        </button>
        <Link to="/create" className="btn btn-primary">
          Créer un post
        </Link>
      </div>
    </div>
  );
};

export default PostDetailPage;