import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "@/css/Table.css";
import {
  IoCaretBackCircle,
  IoCaretBackOutline,
  IoCaretForwardCircle,
  IoCaretForwardCircleOutline,
  IoCaretForwardOutline,
  IoDownloadOutline,
} from "react-icons/io5";

const GenericTable = ({
  columns,
  data,
  onDownloadExcel,
}: {
  columns: any;
  data: any;
  onDownloadExcel: () => void;
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });


  return (
    <div className="generic-table-container component-element">
      <div className="top-buttons">
        <button onClick={onDownloadExcel} className="download-excel">
          <IoDownloadOutline size={"1.2rem"} /> Descargar
        </button>
        <select
          value={table.getState().pagination.pageSize}
          className="show-select"
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <table className="generic-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="generic-headers-row">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="generic-cells-row"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="generic-row-cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <IoCaretBackCircle />
        </button>
        <button
          className="pagination-button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IoCaretBackOutline />
        </button>
        <button
          className="pagination-button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <IoCaretForwardOutline />
        </button>
        <button
          className="pagination-button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <IoCaretForwardCircle />
        </button>
        <span className="page-of">
          <div>
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </div>
        </span>
      </div>
    </div>
  );
};

export default GenericTable;
