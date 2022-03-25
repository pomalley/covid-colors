export interface DataRecord {
  city: string;
  county: string;
  population: number;
  pct_positivity: number;
  daily_rate: number;
  color: string;
  report_date: string;
  start_date: string;
  end_date: string;
  testing_rate: number;
  avg_daily_rate: number;
  total_case_count: number;
  total_positive_tests: number;
  total_tests: number;
  total_tests_last_two_weeks: number;
  two_week_case_counts: number;
}

export function parseRow(row: Record<string, string>): DataRecord {
  return {
    city: row['City/Town'],
    county: row['County'],
    population: Number(row['Population']),
    pct_positivity: Number(row['Percent Positivity']),
    daily_rate: Number(row['Average Daily Rate']),
    color: row['Color'],
    report_date: parseDate(row['Report Date']),
    start_date: parseDate(row['Start_Date']),
    end_date: parseDate(row['End_Date']),
    testing_rate: Number(row['Testing Rate']),
    avg_daily_rate: Number(row['Average Daily Rate']),
    total_case_count: Number(row['Total Case Counts']),
    total_positive_tests: Number(row['Total Positive Tests']),
    total_tests: Number(row['Total Tests']),
    total_tests_last_two_weeks: Number(row['Total Tests Last Two Weeks']),
    two_week_case_counts: Number(row['Two Week Case Counts']),
  };
}

// This is ugly and fragile, but whatever. Parsing it is hardly better.
export function parseDate(d: string): string {
  return `20${d.substring(6, 8)}-${d.substring(0, 2)}-${d.substring(3, 5)}`;
}

export interface DataInput {
  city: string;
  weight: number;
  active: boolean;
}

export enum Colors {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  BLUE = 'blue',
}

export function quasarColor(c: Colors): string {
  switch (c) {
    case Colors.RED:
      return 'red';
    case Colors.ORANGE:
      return 'orange';
    case Colors.YELLOW:
      return 'yellow-7';
    case Colors.BLUE:
      return 'blue';
  }
}

export interface Thresholds {
  red: number;
  orange: number;
  yellow: number;
}

export interface DataConfig {
  name: string;
  dataInputs: DataInput[];
}
