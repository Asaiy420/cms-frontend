import { CreateButton } from '@/components/refine-ui/buttons/create';
import { DataTable } from '@/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/components/refine-ui/views/list-view';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEPARTMENT_OPTIONS } from '@/constants';
import { Subject } from '@/types';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const SubjectsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departmentFilters =
    selectedDepartment === 'all'
      ? []
      : [
          {
            field: 'department',
            operator: 'eq' as const,
            value: selectedDepartment,
          },
        ];

  const searchFilters = searchQuery
    ? [
        {
          field: 'name',
          operator: 'contains' as const,
          value: searchQuery,
        },
      ]
    : [];

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(
      () => [
        {
          id: 'code',
          accessorKey: 'code',
          size: 100,
          header: () => <p className='column-title ml-2'>Code</p>,
          cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
          id: 'name',
          accessorKey: 'name',
          size: 200,
          header: () => <p className='column-title'>Name</p>,
          cell: ({ getValue }) => (
            <span className='text-foreground'>{getValue<string>()}</span>
          ),
          filterFn: 'includesString',
        },
        {
          id: 'department',
          accessorKey: 'department.name',
          size: 150,
          header: () => <p className='column-title'>Department</p>,
          cell: ({ getValue }) => (
            <Badge variant='secondary'>{getValue<string>()}</Badge>
          ),
        },
        {
          id: 'description',
          accessorKey: 'description',
          size: 300,
          header: () => <p className='column-title'>Description</p>,
          cell: ({ getValue }) => (
            <span className='truncate line-clamp-2'>{getValue<string>()}</span>
          ),
        },
      ],
      []
    ),
    refineCoreProps: {
      resource: 'subjects',
      pagination: {
        pageSize: 10,
        mode: 'server',
      },
      filters: {
        permanent: [...departmentFilters, ...searchFilters],
      },
      sorters: {
        initial: [
          {
            field: 'id',
            order: 'desc',
          },
        ],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className='page-title'>Subjects</h1>

      <div className='intro-row'>
        <p>Quick Access To Essential Metrics and Management Tools</p>
        <div className='actions-row'>
          <div className='search-field relative w-full sm:w-auto'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' /> 
            <input
              type='text'
              placeholder='Search by name'
              className='w-full pl-10 pr-3 py-2 border rounded-md border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='flex gap-2 w-full sm:w-auto'>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder='Filter by Department' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Departments</SelectItem>
                {DEPARTMENT_OPTIONS.map(department => (
                  <SelectItem key={department.value} value={department.value}>
                    {department.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={subjectTable} />
    </ListView>
  );
};

export default SubjectsList;
