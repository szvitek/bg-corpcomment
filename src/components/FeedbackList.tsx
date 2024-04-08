import { useEffect, useState } from 'react';
import FeedbackItem from './FeedbackItem';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import { TFeedbackItem } from '../lib/types';

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/api/feedbacks');

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
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
