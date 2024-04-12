import { create } from 'zustand';
import { TFeedbackItem } from '../lib/types';
import API from '../lib/api';

type TFeedbackStore = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackStore = create<TFeedbackStore>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    return (
      get()
        .feedbackItems.map((item) => item.company)
        // remove duplicates
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        })
    );
  },
  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
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

    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));
    // setFeedbackItems([...feedbackItems, newItem]);

    await API.post('/api/feedbacks', newItem);
  },
  selectCompany: (company: string) => {
    set((state) => ({
      selectedCompany: state.selectedCompany === company ? '' : company,
    }));
  },
  fetchFeedbackItems: async () => {
    set({ isLoading: true });
    try {
      const response = await API.get('/api/feedbacks');
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set({ feedbackItems: data });
    } catch (error) {
      set({
        errorMessage: 'Something went wrong. Please try again later.',
      });
    }
    set({ isLoading: false });
  },
}));
