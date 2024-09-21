import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
  type MRT_ColumnFiltersState,
  type MRT_VisibilityState,
  type MRT_DensityState,
} from "material-react-table";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Invoice from "./Invoice"; // Ensure this import path is correct
import { alpha } from "@mui/material/styles";

const STORAGE_KEY_PREFIX = "dataTable_";

const DataTable: React.FC<{ data: Invoice[] }> = ({ data }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [showColumnFilters, setShowColumnFilters] = useState(false);

  const [globalFilter, setGlobalFilter] = useState<string | undefined>(
    undefined
  );

  //Show gLOBAL
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);

  //Default Sorting

  const [sorting, setSorting] = useState<MRT_SortingState>([
    { id: "attributes.updatedOn", desc: true },
  ]);

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    {}
  );
  const [density, setDensity] = useState<MRT_DensityState>("comfortable");

  const [columnPinning, setColumnPinning] = useState({
    left: ["mrt-row-expand", "mrt-row-select"],
    right: ["mrt-row-actions"],
  });

  //   useEffect(() => {
  //     const loadState = (
  //       key: string,
  //       setter: React.Dispatch<React.SetStateAction<any>>
  //     ) => {
  //       const value = sessionStorage.getItem(STORAGE_KEY_PREFIX + key);
  //       if (value) setter(JSON.parse(value));
  //     };

  //     loadState("columnFilters", setColumnFilters);
  //     loadState("globalFilter", setGlobalFilter);
  //     loadState("sorting", setSorting);
  //     loadState("pagination", setPagination);
  //     loadState("density", setDensity);

  //     isFirstRender.current = false;
  //   }, []);

  // Save states to sessionStorage
  //   useEffect(() => {
  //     if (isFirstRender.current) return;
  //     const saveState = (key: string, value: any) => {
  //       sessionStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  //     };

  //     saveState("columnFilters", columnFilters);
  //     saveState("globalFilter", globalFilter);
  //     saveState("sorting", sorting);
  //     saveState("pagination", pagination);
  //     saveState("density", density);
  //   }, [columnFilters, globalFilter, sorting, pagination, density]);

  //   const resetState = () => {
  //     const keys = [
  //       "columnFilters",
  //       "globalFilter",
  //       "sorting",
  //       "pagination",
  //       "density",
  //     ];
  //     keys.forEach((key) => sessionStorage.removeItem(STORAGE_KEY_PREFIX + key));
  //     window.location.reload();
  //   };

  const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Record Number",
        size: 150,
        Cell: ({ row }) => (
          <Box
            sx={{
              cursor: "pointer",
              color: theme.palette.primary.main,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {row.original.id}
          </Box>
        ),
      },
      {
        accessorKey: "attributes.companyCode",
        header: "Company Code",
        size: 150,
      },
      {
        accessorKey: "attributes.vendorCode",
        header: "Vendor Code",
        size: 150,
      },
      {
        accessorKey: "attributes.invoiceNumber",
        header: "Invoice Number",
        size: 200,
      },
      {
        accessorKey: "attributes.documentNumber",
        header: "Document Number",
        size: 200,
      },
      {
        accessorKey: "attributes.amountInDocumentCurrency",
        header: "Amount",
        size: 150,
        Cell: ({ row }) => (
          <Box
            sx={{
              backgroundColor:
                row.original.attributes.amountInDocumentCurrency < 1000
                  ? theme.palette.success.main
                  : row.original.attributes.amountInDocumentCurrency < 5000
                  ? theme.palette.warning.main
                  : theme.palette.error.main,
              borderRadius: "4px",
              color: "#fff",
              p: "0.25rem",
              display: "inline-block",
            }}
          >
            {`${
              row.original.attributes.documentCurrency
            } ${row.original.attributes.amountInDocumentCurrency.toFixed(2)}`}
          </Box>
        ),
      },
      {
        accessorKey: "attributes.historicMatchesCount",
        header: "Duplicate Entries",
        size: 150,
      },
      {
        accessorKey: "attributes.status",
        header: "Status",
        size: 150,
        filterVariant: "select",
        filterSelectOptions: ["New", "Pending", "Completed"],
      },
      {
        accessorFn: (row) =>
          `${row.attributes.assignedUser.firstName} ${row.attributes.assignedUser.lastName}`,
        id: "assignedTo",
        header: "Assigned To",
        size: 200,
      },
      {
        accessorFn: (row) => {
          const { firstName, lastName } = row.attributes.updatedBy;
          return lastName ? `${firstName} ${lastName}` : firstName;
        },
        id: "updatedBy",
        header: "Updated By",
        size: 200,
      },
      {
        accessorKey: "attributes.updatedOn",
        header: "Updated On",
        size: 200,
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString(),
        sortingFn: "datetime",
      },
    ],
    []
  );

  /* We need to show the column fiilter when we actually apply the filtering
    --  When the user visits the Website they will get to know what filters has been applied

    -- The Headers should have less spacing also it should show the full column width or it should collaps to a new line
    
    */

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: false,
    enableColumnPinning: true,
    enableColumnResizing: true,
    enableFacetedValues: true,

    initialState: { showColumnFilters: false, showGlobalFilter: true },
    state: {
      columnFilters,
      globalFilter,
      sorting,
      pagination,
      columnVisibility,
      density,
      columnPinning,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onDensityChange: setDensity,
    // renderTopToolbarCustomActions: () => (
    //   <Button onClick={resetState} variant="contained" color="primary">
    //     Reset Table
    //   </Button>
    // ),

    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "green",
        fontWeight: "light",
        fontSize: "0.8rem",
        color: "white",
        whiteSpace: "normal",
        wordBreak: "break-word",
        height: "auto",

        lineHeight: 1.2,
        "& .Mui-TableHeadCell-Content": {
          whiteSpace: "normal",
          wordBreak: "break-word",
        },
        "& .Mui-TableHeadCell-Content-Labels": {
          whiteSpace: "normal",
          wordBreak: "break-word",
        },
        "& .Mui-TableHeadCell-Content-Wrapper": {
          whiteSpace: "normal",
          wordBreak: "break-word",
        },
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      },
    },
    muiTableContainerProps: {
      sx: {
        flex: "1 1 auto",
        overflow: "auto",
        "&:fullscreen": {
          overflow: "hidden",
        },
        "&:fullscreen .MuiTable-root": {
          overflow: "auto",
          maxHeight: "100vh",
        },
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:last-child td": { borderBottom: "none" },
      },
    },
    muiTableProps: {
      sx: {
        tableLayout: "fixed",
        "& .MuiTableHead-root": {
          "& .MuiTableRow-root": {
            height: "auto",
          },
        },
      },
    },
    layoutMode: "grid",
    positionToolbarAlertBanner: "bottom",
    displayColumnDefOptions: {
      "mrt-row-expand": {
        size: 50,
      },
      "mrt-row-select": {
        size: 50,
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;
