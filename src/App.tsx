import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import HashtagList from './components/hashtag/HashtagList';
import FeedbackProvider from './contexts/FeedbackContext';

function App() {
  return (
    <div className="app">
      <Footer />
      <FeedbackProvider>
        <Container />
        <HashtagList />
      </FeedbackProvider>
    </div>
  );
}

export default App;
