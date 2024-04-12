import { useShallow } from 'zustand/react/shallow';
import { useFeedbackStore } from '../../stores/feedbackStore';
import HashtagItem from './HashtagItem';

export default function HashtagList() {
  const { companyList, selectCompany } = useFeedbackStore(
    useShallow((state) => ({
      companyList: state.getCompanyList(),
      selectCompany: state.selectCompany,
    }))
  );
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}
