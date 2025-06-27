// types/ExploreTypes.ts
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
  textColor: string;
  tintText: string;
  tintColor: string;
}

export interface CategoryChipsProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cardBackground: string;
  textColor: string;
  tintText: string;
}

export interface TrendingSectionProps {
  textColor: string;
  tintText: string;
  tintColor: string;
  cardBackground: string;
  communityDetails: any[];
  users: any[];
  joinedCommunities: any[];
}

export interface CategoriesSectionProps {
  textColor: string;
  tintText: string;
  tintColor: string;
  cardBackground: string;
  exploreCategories: any[];
}

export type EnhancedSearchBarProps = {
  cardBackground: string;
  isSearchFocused: boolean;
  tintColor: string;
  tintText: string;
  textColor: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchFocus: () => void;
  handleSearchBlur: () => void;
};

export interface DiscoverSectionProps {
  textColor: string;
  tintText: string;
  tintColor: string;
  discoverData: any[];
}

export interface ForYouSectionProps {
  textColor: string;
  tintText: string;
  tintColor: string;
  cardBackground: string;
  communityDetails: any[];
  users: any[];
  joinedCommunities: any[];
}

export interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  tintText: string;
  cardBackground: string;
  tintColor: string;
}
