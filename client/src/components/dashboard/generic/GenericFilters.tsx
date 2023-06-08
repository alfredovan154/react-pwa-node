import React from "react";
import { IoFilterOutline, IoSearch } from "react-icons/io5";
import "@/css/Filters.css";
import { Filter, GenericAttributes } from "@/lib/types";
import { IconContext } from "react-icons";

const Filters = ({
  columns,
  onChangeFilters,
}: {
  columns: Array<GenericAttributes>;
  onChangeFilters: (filters: Array<Filter>) => void;
}) => {
  const [activeFiltersCount, setActiveFiltersCount] = React.useState(0);
  const [selectFiltersIsVisible, setSelectFiltersIsVisible] =
    React.useState(false);
  const [filters, setFilters] = React.useState<Array<Filter>>(
    columns.map((column) => ({
      name: column.accessor,
      value: "",
      active: false,
    }))
  );

  const showSelectFilters = () => {
    setSelectFiltersIsVisible(!selectFiltersIsVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.name === e.target.name) {
        let filterActive = true;
        if (e.target.value !== "" && !filter.active) {
          setActiveFiltersCount(activeFiltersCount + 1);
          filterActive = true;
        } else if (e.target.value == "" && filter.active) {
          setActiveFiltersCount(activeFiltersCount - 1);
          filterActive = false;
        }
        return { ...filter, value: e.target.value, active: filterActive };
      }
      return filter;
    });
    setFilters(updatedFilters);
  };

  const filterInputs = columns.map((column) => {
    return (
      <div
        className="select-filter-container component-element"
        key={column.accessor}
      >
        <span className="select-filter-title">{column.Header}</span>
        <div className="filter">
          {column.icon}
          <input
            type={column.inputType}
            name={column.accessor}
            id={column.accessor}
            onChange={handleChange}
            className="filter-input"
          />
        </div>
      </div>
    );
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement> ) => {
    e.preventDefault();
    const activeFilters = filters.filter(f => f.active);
    onChangeFilters(activeFilters);
  }

  return (
    <>
      <IconContext.Provider
        value={{ className: "filter-icons", size: "1.2rem" }}
      >
        <div className="filter-container component-element">
          <button className="filter-button filters" onClick={showSelectFilters}>
            <IoFilterOutline />
            <span>
              Filtros{" "}
              {activeFiltersCount === 0 ? "" : `(${activeFiltersCount})`}
            </span>
          </button>
        </div>
        <form
          className="select-filters"
          style={{ display: selectFiltersIsVisible ? "flex" : "none" }}
          onSubmit={handleSubmit}
          method="post"
        >
          {filterInputs}
          <div className="component-element">
            <button type="submit" className="submit-filters">
              {" "}
              <IoSearch /> Buscar
            </button>
          </div>
        </form>
      </IconContext.Provider>
    </>
  );
};

export default Filters;
