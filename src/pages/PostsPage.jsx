import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { postsApi } from '../services/api';
import './PostsPage.css';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postsApi.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Erreur lors du chargement des posts. Veuillez réessayer.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="posts-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-page">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={fetchPosts} className="btn btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <header className="page-header">
        <h1>Tous les Posts</h1>
        <p className="page-description">
          Découvrez tous les articles de notre blog
        </p>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher dans les posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <p className="search-results">
            {filteredPosts.length} résultat{filteredPosts.length !== 1 ? 's' : ''} pour "{searchTerm}"
          </p>
        )}
      </div>

      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="no-posts">
            <h3>Aucun post trouvé</h3>
            <p>
              {searchTerm
                ? `Aucun post ne correspond à votre recherche "${searchTerm}"`
                : 'Aucun post disponible pour le moment'
              }
            </p>
          </div>
        )}
      </div>

      <div className="posts-stats">
        <p>
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} affiché{filteredPosts.length !== 1 ? 's' : ''}
          {searchTerm ? ` sur ${posts.length} total` : ''}
        </p>
      </div>
    </div>
  );
};

export default PostsPage;