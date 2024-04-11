import { useContext, useEffect, useState } from 'react';
import { FeedbackContext } from '../contexts/FeedbackContext';
import { TFeedbackItem } from './types';
import API from './api';

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('FeedbackContext must be used within an FeedbackProvider');
  }

  return context;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  return {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
  };
}
