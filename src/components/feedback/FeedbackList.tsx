import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackStore } from '../../stores/feedbackStore';
import { useShallow } from 'zustand/react/shallow';

export default function FeedbackList() {
  const { isLoading, errorMessage, filteredFeedbackItems } = useFeedbackStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      filteredFeedbackItems: state.getFilteredFeedbackItems(),
    }))
  );

  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
