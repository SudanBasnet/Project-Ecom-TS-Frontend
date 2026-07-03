"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiLayers,
  FiSearch,
} from "react-icons/fi";
import { useMemo, useState } from "react";

export type CategoryTableRow = {
  id: string;
  name: string;
  description: string;
  products: number;
  updated: string;
  accent: string;
  status: "Active" | "Inactive";
};

type CategoryTableProps = Readonly<{
  categories: CategoryTableRow[];
}>;

const statusStyles: Record<CategoryTableRow["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Inactive: "bg-slate-100 text-slate-600 ring-slate-500/10",
};

const CategoryTable = ({ categories }: CategoryTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<CategoryTableRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Category",
        cell: ({ row }) => {
          const category = row.original;

          return (
            <div className="flex items-center gap-3">
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${category.accent}`}
              >
                <FiLayers className="size-4" />
              </span>
              <span className="font-bold text-slate-800">
                {category.name}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => (
          <span className="line-clamp-2 max-w-md text-slate-500">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "products",
        header: "Products",
        cell: ({ getValue }) => (
          <span className="font-semibold text-slate-700">
            {getValue<number>()}
          </span>
        ),
      },
      {
        accessorKey: "updated",
        header: "Updated",
        cell: ({ getValue }) => (
          <span className="text-slate-500">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue<CategoryTableRow["status"]>();

          return (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${statusStyles[status]}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "action",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="text-right">
            <button
              type="button"
              aria-label={`Edit ${row.original.name}`}
              className="inline-grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <FiEdit2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  // TanStack Table intentionally returns handler functions from this hook.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: categories,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <label className="relative block max-w-sm">
          <span className="sr-only">Search categories</span>
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search categories"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-left">
          <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className={`px-6 py-3 ${
                        header.column.id === "action" ? "text-right" : ""
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!canSort}
                          onClick={header.column.getToggleSortingHandler()}
                          className={`inline-flex items-center gap-1.5 ${
                            canSort
                              ? "cursor-pointer text-slate-500 transition hover:text-indigo-600"
                              : "cursor-default"
                          }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {sortDirection === "asc" && (
                            <FiChevronUp className="size-3.5" />
                          )}
                          {sortDirection === "desc" && (
                            <FiChevronDown className="size-3.5" />
                          )}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-slate-50/80">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-sm font-medium text-slate-500"
                >
                  No categories match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoryTable;
