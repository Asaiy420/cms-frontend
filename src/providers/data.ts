import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from '@refinedev/core';

export interface Subject extends BaseRecord {
  id: number;
  courseCode: string;
  name: string;
  department: string;
  description: string;
}

const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    courseCode: 'CS101',
    name: 'Introduction to Computer Science',
    department: 'Computer Science',
    description:
      'Fundamental concepts of programming, algorithms, and data structures.',
  },
  {
    id: 2,
    courseCode: 'MATH201',
    name: 'Calculus II',
    department: 'Mathematics',
    description:
      'Continuation of Calculus I, covering integration techniques and series.',
  },
  {
    id: 3,
    courseCode: 'ENG150',
    name: 'English Literature',
    department: 'Humanities',
    description: 'Study of classic and modern works in English literature.',
  },
];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== 'subjects') {
      return { data: [] as TData[], total: 0 };
    }
    // Cast to any because the generic TData may not be Subject but callers expect the right type
    return {
      data: MOCK_SUBJECTS as unknown as TData[],
      total: MOCK_SUBJECTS.length,
    };
  },

  getOne: async () => {
    throw new Error('This function is not present in the mock data provider');
  },
  create: async () => {
    throw new Error('This function is not present in the mock data provider');
  },
  update: async () => {
    throw new Error('This function is not present in the mock data provider');
  },
  deleteOne: async () => {
    throw new Error('This function is not present in the mock data provider');
  },

  getApiUrl: () => '',
};
