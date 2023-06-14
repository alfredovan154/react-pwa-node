import React from "react";
import { IoFilterOutline, IoSearch } from "react-icons/io5";
import "@/css/Filters.css";
import {
  Product,
  Student,
  Validation,
  Visitor
} from "@/lib/types";
import { IconContext } from "react-icons";

const GenericFilters = ({
  filters,
  onChangeFilters,
  attributes,
}: {
  filters: Partial<Visitor> | Partial<Product>;
  onChangeFilters: (filters: any) => void;
  attributes: Array<Validation<any>>;
}) => {
  const [activeFiltersCount, setActiveFiltersCount] = React.useState(0);
  const [selectFiltersIsVisible, setSelectFiltersIsVisible] =
    React.useState(false);
  const [values, setValues] = React.useState<
    Partial<Student> | Partial<Product> | Partial<Visitor>
  >(filters);

  React.useEffect(() => {
    setValues(filters);
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedValues = Object.assign({}, values);
    updatedValues[e.target.name as keyof typeof values] =
      e.target.value.toString();
    setValues(updatedValues);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeFilters(values);
  };

  const filterInputs = attributes.map((column) => {
    return (
      <div
        className="select-filter-container component-element"
        key={column.accessor.toString()}
      >
        <span className="select-filter-title">{column.header}</span>
        <div className="filter">
          {column.icon}
          <input
            type={column.inputType}
            name={column.accessor.toString()}
            id={column.accessor.toString()}
            onChange={handleChange}
            className="filter-input"
          />
        </div>
      </div>
    );
  });
  const showSelectFilters = () => {
    setSelectFiltersIsVisible(!selectFiltersIsVisible);
  };

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
          method="post"
          onSubmit={handleSubmit}
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

export default GenericFilters;
