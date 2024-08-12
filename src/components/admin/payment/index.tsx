'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  // flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
import {
  // CalendarDays,
  // ChevronsDownUp,
  Command,
  MoreHorizontal,
  // PlusCircle,
} from 'lucide-react'
import UsersTable from './table'

const data: any[] = [
  {
    id: 'm5gr84i9',
    task: 'TASK-8788',
    title: 'Title 1',
    status: 'success',
    priority: 'high',
  },
  {
    id: '3u1reuv4',
    task: 'TASK-1234',
    title: 'Title 2',
    status: 'processing',
    priority: 'medium',
  },
  {
    id: 'derv1ws0',
    task: 'TASK-5678',
    title: 'Title 3',
    status: 'failed',
    priority: 'low',
  },
  // Adicione mais exemplos conforme necessário
]

// export type Animal = {
//   id: string
//   owner: string
//   name: string
//   // title: string
//   status: 'disponível para adoção' | 'em processo de adoção' | 'adotado'
//   // priority: 'low' | 'medium' | 'high'
// }

export type User = {
  id: string
  name: string
  animals: string
  // status: 'disponível para adoção' | 'em processo de adoção' | 'adotado'
  // priority: 'low' | 'medium' | 'high'
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'task',
    header: 'Task',
    cell: ({ row }) => <div>{row.getValue('task')}</div>,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className="lowercase">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Prioridade',
    cell: ({ row }) => <div>{row.getValue('priority')}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <section className="flex h-screen items-center justify-center px-[5px] py-[8px]">
      <div className="h-full w-full rounded-[16px] border border-[#E1E7EF] bg-white p-[20px] shadow-md">
        <div className="flex flex-col">
          <span className="text-md mb-5 font-medium text-[#A0A0A9]">
            Usuários
          </span>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold tracking-tighter text-black">
              Usuários
            </h1>
            <Button className="text-md h-[50px] w-[260px] rounded-[16px] bg-[#01377D] text-white">
              Novo usuário / <Command size={14} />
              <span className="text-sm">+ S</span>
            </Button>
          </div>
        </div>
        <div className="my-4 h-[2px] w-full bg-zinc-100" />

        <UsersTable />
      </div>
    </section>
  )
}
