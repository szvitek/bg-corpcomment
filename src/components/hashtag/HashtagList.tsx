import { useFeedbackContext } from '../../lib/hooks';
import HashtagItem from './HashtagItem';

export default function HashtagList() {
  const { companyList, handleSelectCompany } = useFeedbackContext();
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={handleSelectCompany}
        />
      ))}
    </ul>
  );
}
