import { useAuth } from "@/hooks/authHook";
import { Validation, Visitor } from "@/lib/types";
import React from "react";
import axios from "axios";
import {
  IoCalendarClearOutline, IoMailOutline,
  IoMapOutline,
  IoPerson,
  IoPersonOutline,
  IoQrCodeOutline
} from "react-icons/io5";
import GenericPage from "../generic/GenericPage";

const Visitors = () => {
  const auth = useAuth();
  const [visitors, setVisitors] = React.useState<Array<Visitor>>([]);
  const [filters, setFilters] = React.useState<Partial<Visitor>>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const url = import.meta.env.VITE_BASE_URL + "/visitor";

  const validations = React.useMemo<Array<Validation<Visitor>>>(
    () => [
      {
        accessor: "recordId",
        header: "Expediente",
        required: false,
        isVisibleOnTable: true,
        isOnForm: false,
        icon: <IoQrCodeOutline />,
        inputType: "text",
      },
      {
        accessor: "firstName",
        header: "Nombre",
        required: false,
        isVisibleOnTable: false,
        isOnForm: true,
        icon: <IoPerson />,
        inputType: "text",
      },
      {
        accessor: "lastName",
        header: "Apellidos",
        required: false,
        isVisibleOnTable: false,
        isOnForm: true,
        icon: <IoPerson />,
        inputType: "text",
      },
      {
        accessor: "fullName",
        header: "Nombre",
        required: false,
        isVisibleOnTable: true,
        isOnForm: false,
        icon: <IoPersonOutline />,
        inputType: "text",
      },
      {
        accessor: "email",
        header: "Email",
        required: false,
        isVisibleOnTable: true,
        isOnForm: true,
        icon: <IoMailOutline />,
        inputType: "text",
      },
      {
        accessor: "birthdate",
        header: "Nacimiento",
        required: false,
        isVisibleOnTable: true,
        isOnForm: true,
        icon: <IoCalendarClearOutline />,
        inputType: "date",
      },
      {
        accessor: "birthState",
        header: "Estado",
        required: false,
        isVisibleOnTable: true,
        isOnForm: true,
        icon: <IoMapOutline />,
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

  const handleFilters = (filters: Partial<Visitor>) => {
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
        setVisitors(response.data as Array<Visitor>);
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

export default Visitors;
