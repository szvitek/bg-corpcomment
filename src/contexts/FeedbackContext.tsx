import { ReactNode, createContext, useMemo, useState } from 'react';
import { TFeedbackItem } from '../lib/types';
import { useFeedbackItems } from '../lib/hooks';
import API from '../lib/api';

type FeedbackProviderProps = {
  children: ReactNode;
};

type TFeedbackContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

export const FeedbackContext = createContext<TFeedbackContext | null>(null);

export default function FeedbackProvider({ children }: FeedbackProviderProps) {
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems();
  const [selectedComapny, setSelectedComapny] = useState('');

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        // remove duplicates
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );
  const filteredFeedbackItems = useMemo(
    () =>
      selectedComapny
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedComapny
          )
        : feedbackItems,
    [feedbackItems, selectedComapny]
  );

  const handleAddToList = async (text: string) => {
    const company = text
      .split(' ')
      .find((word) => word.startsWith('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: company!.substring(0, 1).toUpperCase(),
      company: company,
      text,
      daysAgo: 0,
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await API.post('/api/feedbacks', newItem);
  };
  const handleSelectCompany = (company: string) => {
    setSelectedComapny((prev) => {
      return prev === company ? '' : company;
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
