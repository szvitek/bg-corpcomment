import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { TFeedbackItem } from '../../lib/types';

type FeedbackListProps = {
  isLoading: boolean;
  errorMessage: string;
  feedbackItems: TFeedbackItem[];
};

export default function FeedbackList({
  isLoading,
  feedbackItems,
  errorMessage,
}: FeedbackListProps) {
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
