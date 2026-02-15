export type ScreenName = 
  | 'dashboard' 
  | 'calculator_menu' 
  | 'calc_retirement' 
  | 'calc_mortgage' 
  | 'calc_investment' 
  | 'calc_tax' 
  | 'scenarios' 
  | 'insights' 
  | 'settings';

export interface NavItem {
  id: ScreenName;
  icon: string;
  label: string;
  fill?: boolean;
}