import { TFeedbackItem } from '../../lib/types';
import FeedbackList from '../feedback/FeedbackList';
import Header from './Header';

type ContainerProps = {
  isLoading: boolean;
  errorMessage: string;
  feedbackItems: TFeedbackItem[];
  handleAddToList: (test: string) => void;
};

export default function Container({
  isLoading,
  feedbackItems,
  errorMessage,
  handleAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        isLoading={isLoading}
        feedbackItems={feedbackItems}
        errorMessage={errorMessage}
      />
    </main>
  );
}
