/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'

import { Checkbox } from '@/components/ui/checkbox'

import React, { useState, useEffect } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ArrowUpDown,
  CalendarDays,
  Check,
  CheckCircle2,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Circle,
  MoreHorizontal,
  MoveDown,
  PlusCircle,
  Timer,
  XCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// * end imports

export type Payment = {
  id: string
  task: string
  badge: string
  title: string
  status: // | 'pending'
  | 'progress'
    // | 'success'
    // | 'failed'
    | 'todo'
    | 'backlog'
    | 'canceled'
  priority: 'low' | 'medium' | 'high'
}

const statusPriority = {
  low: <MoveDown size={14} alignmentBaseline="central" />,
  medium: <MoveDown size={14} alignmentBaseline="central" />,
  high: <MoveDown size={14} alignmentBaseline="central" />,
}

const statusData = {
  // pending: <Clock />,
  progress: <Timer size={14} alignmentBaseline="central" />,
  // success: <Clock size={14} alignmentBaseline="central" />,
  // failed: 'teste',
  todo: <Circle size={14} alignmentBaseline="central" />,
  backlog: <CheckCircle2 size={14} alignmentBaseline="central" />,
  canceled: <XCircle size={14} alignmentBaseline="central" />,
}

const data: Users[] = [
  {
    id: 'm5gr84i9',
    task: 'TASK-8788',
    badge: 'Documentation',
    title: 'You can compress the program without quantifying the open',
    status: 'todo',
    priority: 'high',
  },
  {
    id: '3u1reuv4',
    task: 'TASK-1234',
    badge: 'Bug',
    title:
      'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
    status: 'progress',
    priority: 'medium',
  },
  {
    id: 'derv1ws0',
    task: 'TASK-5678',
    badge: 'Feature',
    title: 'We need to program the back-end THX pixel!',
    status: 'canceled',
    priority: 'low',
  },
]
const pages = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
]

export const columns: ColumnDef<Users>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="peer h-4 w-4 shrink-0 rounded-sm border border-[#000] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#fff] data-[state=checked]:text-primary-foreground"
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
        className="peer h-4 w-4 shrink-0 rounded-sm border border-[#000] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#fff] data-[state=checked]:text-primary-foreground"
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
    header: ({ column }) => {
      return (
        <Button
          className="p-[-4px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant="outline" className="mr-2">
            {row.original.badge}
          </Badge>
          <span>{row.original.title}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          className="p-[-4px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        {statusData[row.original.status]}
        {row.original.status}
      </div>
    ),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          className="p-[-4px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        {statusPriority[row.original.priority]}
        {row.getValue('priority')}
      </div>
    ),
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

// * Start payment component
// * Todas as vezes que você ver "use" isso é se chama HOOK

export default function UsersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

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
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Pesquisar"
            value={(table.getColumn('task')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('task')?.setFilterValue(event.target.value)
            }
            className="w-[251px] max-w-sm border border-[#E4E4E7] shadow-sm placeholder:text-[#71717A]"
          />
          {/* <Button className="flex items-center rounded-md border border-dashed border-[#E4E4E7] bg-white text-black shadow-sm">
            <PlusCircle size={14} className="mr-1" /> Status
          </Button> */}
        </div>
        <div className="grid-profile grid items-center gap-3 rounded-[16px] border border-[#E3E3E6] bg-white p-2 shadow-sm">
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#F9F9F9]">
            <CalendarDays className="text-[#01377D]" />
          </div>
          <div className="flex flex-1 flex-col truncate">
            <span className="truncate text-[10px] font-medium text-zinc-500">
              Filtro
            </span>
            <span className="text-lg font-medium text-black">
              Últimos 30 dias
            </span>
          </div>
          <button
            type="button"
            className="ml-auto rounded-md p-2 hover:bg-zinc-50"
          >
            <ChevronsDownUp className="h-5 w-5 text-zinc-500" />
          </button>
        </div>
      </div>
      {/* // * End Header Payment */}

      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-xs text-[#71717A]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-sm text-[#09090B]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className=""
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <span className="px-2 text-sm font-medium text-[#09090B]">
              Rows per pages
            </span>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[70px] justify-between"
              >
                {value
                  ? pages.find((pages) => pages.value === value)?.label
                  : '10'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[70px] p-0">
              <Command>
                <CommandGroup>
                  {pages.map((pages) => (
                    <CommandItem
                      key={pages.value}
                      value={pages.value}
                      onSelect={(currentValue: any) => {
                        setValue(currentValue === value ? '' : currentValue)
                        setOpen(false)
                      }}
                    >
                      {pages.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === pages.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <span className="px-[32px] text-sm font-medium text-[#09090B]">
            Page 1 of 10
          </span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={14} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </>
  )
}

// * End payment component
