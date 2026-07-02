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
import { useMemo, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiExternalLink,
  FiSearch,
} from "react-icons/fi";

export type BrandTableRow = {
  name: string;
  initials: string;
  products: number;
  colour: string;
  website: string;
  status: "Active" | "Inactive";
};

type BrandTableProps = Readonly<{
  brands: BrandTableRow[];
}>;

const statusStyles: Record<BrandTableRow["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Inactive: "bg-slate-100 text-slate-600 ring-slate-500/10",
};

const BrandTable = ({ brands }: BrandTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<BrandTableRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Brand",
        cell: ({ row }) => {
          const brand = row.original;

          return (
            <div className="flex items-center gap-3">
              <span
                className={`grid size-10 place-items-center rounded-xl text-xs font-black text-white ${brand.colour}`}
              >
                {brand.initials}
              </span>
              <span className="font-bold text-slate-800">{brand.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "website",
        header: "Website",
        cell: ({ getValue }) => (
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            {getValue<string>()}
            <FiExternalLink className="size-3.5" />
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
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue<BrandTableRow["status"]>();

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
    data: brands,
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
          <span className="sr-only">Search brands</span>
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search brands"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
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
                  No brands match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BrandTable;
