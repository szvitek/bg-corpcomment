import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import HashtagList from './components/hashtag/HashtagList';
import { useEffect } from 'react';
import { useFeedbackStore } from './stores/feedbackStore';

function App() {
  const fetchFeedbackItems = useFeedbackStore(store => store.fetchFeedbackItems)
  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);
  

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}

export default App;
