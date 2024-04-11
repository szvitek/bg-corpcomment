import { useEffect, useState } from 'react';
import Container from './components/Container';
import Footer from './components/Footer';
import HashtagList from './components/HashtagList';
import { TFeedbackItem } from './lib/types';
import API from './lib/api';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToList = async (text: string) => {
    const company = text
      .split(' ')
      .find((word) => word.startsWith('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: company!.substring(0, 1).toUpperCase(),
      company: company,
      text,
      daysAgo: 0,
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await fetch('http://localhost:3000/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await API.get('/api/feedbacks');

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbackItems(data);
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again later.');
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        isLoading={isLoading}
        feedbackItems={feedbackItems}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList />
    </div>
  );
}

export default App;
