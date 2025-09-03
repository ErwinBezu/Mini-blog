import { useState } from 'react';
import './PostForm.css';

const PostForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
        if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Le titre doit contenir au moins 5 caractères';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Le contenu est requis';
    } else if (formData.body.trim().length < 10) {
      newErrors.body = 'Le contenu doit contenir au moins 10 caractères';
    }
    
    if (!formData.userId || formData.userId < 1 || formData.userId > 10) {
      newErrors.userId = 'L\'ID utilisateur doit être entre 1 et 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      body: '',
      userId: 1
    });
    setErrors({});
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Titre du post *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Entrez le titre de votre post..."
            disabled={isLoading}
          />
          {errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="userId" className="form-label">
            ID Utilisateur *
          </label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className={`form-input ${errors.userId ? 'error' : ''}`}
            min="1"
            max="10"
            disabled={isLoading}
          />
          {errors.userId && (
            <span className="error-message">{errors.userId}</span>
          )}
          <small className="form-hint">
            Choisissez un ID entre 1 et 10
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="body" className="form-label">
            Contenu du post *
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className={`form-textarea ${errors.body ? 'error' : ''}`}
            placeholder="Écrivez le contenu de votre post..."
            rows="6"
            disabled={isLoading}
          />
          {errors.body && (
            <span className="error-message">{errors.body}</span>
          )}
          <small className="form-hint">
            {formData.body.length} caractères
          </small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Création...' : 'Créer le post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;