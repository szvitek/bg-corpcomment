import FeedbackItem from './FeedbackItem';

const feedbackItems = [
  {
    id: 1,
    upvoteCount: 563,
    badgeLetter: 'B',
    companyName: 'ByteGrad',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit velit alias est, officiis aut veniam?',
    daysAgo: 4,
  },
  {
    id: 2,
    upvoteCount: 427,
    badgeLetter: 'S',
    companyName: 'Starbucks',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    daysAgo: 6,
  },
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
