import { useFeedbackStore } from '../../stores/feedbackStore';
import FeedbackForm from '../feedback/FeedbackForm';
import Logo from '../Logo';
import PageHeading from '../PageHeading';
import Pattern from '../Pattern';

export default function Header() {
  const addItemToList = useFeedbackStore((store) => store.addItemToList);
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addItemToList} />
    </header>
  );
}
