export interface Column {
  id: 'avatar' | 'name' | 'slack' | 'bonus';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface Data {
  avatar: any;
  name: string;
  slack: number;
  bonus: number;
}

export interface ReportProps {
  match: {
    params: {
      employee?: any;
    };
  };
  history: {
    push: (path: any) => any;
  };
  records: any[];
  clearStorageData: () => any;
}
