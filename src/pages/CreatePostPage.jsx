
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { postsApi } from '../services/api';
import './CreatePostPage.css';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [createdPost, setCreatedPost] = useState(null);

  const handleCreatePost = async (postData) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const newPost = await postsApi.createPost(postData);
      
      setCreatedPost(newPost);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err) {
      setError('Erreur lors de la création du post. Veuillez réessayer.');
      console.error('Erreur:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success && createdPost) {
    return (
      <div className="create-post-page">
        <div className="success-container">
          <div className="success-message">
            <h2>Post créé avec succès !</h2>
            <div className="created-post-preview">
              <h3>{createdPost.title}</h3>
              <p>{createdPost.body}</p>
              <small>ID: {createdPost.id} | Utilisateur: {createdPost.userId}</small>
            </div>
            <p className="redirect-message">
              Redirection vers l'accueil dans 3 secondes...
            </p>
            <div className="success-actions">
              <button 
                onClick={() => navigate('/')} 
                className="btn btn-primary"
              >
                Retour à l'accueil
              </button>
              <button 
                onClick={() => {
                  setSuccess(false);
                  setCreatedPost(null);
                }} 
                className="btn btn-secondary"
              >
                Créer un autre post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-post-page">
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Accueil</Link>
        <span className="breadcrumb-separator">→</span>
        <span className="breadcrumb-current">Créer un post</span>
      </nav>

      <header className="page-header">
        <h1> Créer un nouveau post</h1>
        <p className="page-description">
          Partagez vos idées avec la communauté
        </p>
      </header>

      {error && (
        <div className="error-message-container">
          <div className="error-message">
            <strong> Erreur:</strong> {error}
          </div>
        </div>
      )}

      <PostForm 
        onSubmit={handleCreatePost}
        isLoading={isLoading}
      />

      <div className="page-actions">
        <Link to="/" className="btn btn-secondary">
          Annuler
        </Link>
      </div>

      <div className="info-box">
        <h3>Information</h3>
        <ul>
          <li>Les ID utilisateurs valides vont de 1 à 10</li>
          <li>Le titre doit contenir au moins 5 caractères</li>
          <li>Le contenu doit contenir au moins 10 caractères</li>
        </ul>
      </div>
    </div>
  );
};

export default CreatePostPage;