import { useContext } from 'react';
import { FeedbackContext } from '../contexts/FeedbackContext';

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('FeedbackContext must be used within an FeedbackProvider');
  }

  return context;
}
