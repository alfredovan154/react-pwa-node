import { useSortBy, useTable } from "react-table";
import "@/css/Table.css";
import { IoCaretDown, IoCaretUp, IoPencil, IoTrash } from "react-icons/io5";
import { Student } from "@/lib/types";

const GenericTable = ({
  columns,
  data,
  onSelect,
}: {
  columns: any;
  data: any;
  onSelect: (student: Student) => void;
}) => {

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: "actions",
            Header: "Acciones",
            Cell: ({ row }) => (
              <div className="actions-container">
                <button className="action-button" onClick={() => onSelect(row.original as Student)}>
                  <IoPencil />
                </button>
                <button className="action-button">
                  <IoTrash />
                </button>
              </div>
            ),
          },
        ]);
      }
    );

  return (
    <div className="generic-table-container component-element">
      <table {...getTableProps()} className="generic-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="generic-headers-row"
            >
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="generic-headers">
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <IoCaretDown className="table-sort-button" />
                      ) : (
                        <IoCaretUp className="table-sort-button" />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="generic-cells-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="generic-row-cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
