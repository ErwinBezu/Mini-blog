import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';

function App() {

  return (
    <>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
