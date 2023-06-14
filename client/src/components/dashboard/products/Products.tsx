import { useAuth } from "@/hooks/authHook";
import { Product, Validation } from "@/lib/types";
import React from "react";
import { IoBagHandle, IoQrCodeOutline } from "react-icons/io5";
import GenericPage from "../generic/GenericPage";
import axios from "axios";

const Products = () => {
  const auth = useAuth();
  const [visitors, setProducts] = React.useState<Array<Product>>([]);
  const [filters, setFilters] = React.useState<Partial<Product>>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const url = import.meta.env.VITE_BASE_URL + "/product";

  const validations = React.useMemo<Array<Validation<Product>>>(
    () => [
      {
        accessor: "productName",
        header: "Producto",
        required: false,
        isVisibleOnTable: true,
        isOnForm: false,
        icon: <IoQrCodeOutline />,
        inputType: "text",
      },
      {
        accessor: "Store.storeName",
        header: "Nombre de tienda",
        required: false,
        isVisibleOnTable: true,
        isOnForm: true,
        icon: <IoBagHandle />,
        inputType: "text",
      },
      {
        accessor: "Store.address",
        header: "Dirección",
        required: false,
        isVisibleOnTable: true,
        isOnForm: true,
        icon: <IoBagHandle />,
        inputType: "text",
      },
      {
        accessor: "id",
        header: "id",
        required: false,
        isVisibleOnTable: true,
        isOnForm: false,
        icon: <IoQrCodeOutline />,
        inputType: "text",
      },
    ],
    []
  );

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleFilters = (filters: Partial<Product>) => {
    setFilters(filters);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: auth.getAccessToken(),
        },
        params: filters,
      }).then((response) => {
        setProducts(response.data as Array<Product>);
      });
    };
    if (isLoading) {
      fetchData();
    }
    setIsLoading(false);
  }, [isLoading]);

  return (
    <GenericPage
      data={visitors}
      url={url}
      validations={validations}
      modalTitle="visitantes"
      filters={filters}
      onLoading={handleLoading}
      onFilters={handleFilters}
    />
  );
};

export default Products;
