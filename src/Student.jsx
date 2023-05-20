import React, { useMemo, useRef, useState } from "react";

import MaterialReactTable from "material-react-table";

import { Box, IconButton, Pagination, Toolbar, Tooltip } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import { Delete, Edit } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

const Student = () => {
  const [columnFilters, setColumnFilters] = useState([]);

  const [globalFilter, setGlobalFilter] = useState("");
  const tableInstanceRef = useRef(null);
  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,

    pageSize: 10,
  });

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "table-data",

      columnFilters, //refetch when columnFilters changes

      globalFilter, //refetch when globalFilter changes

      pagination.pageIndex, //refetch when pagination.pageIndex changes

      pagination.pageSize, //refetch when pagination.pageSize changes

      sorting, //refetch when sorting changes
    ],

    queryFn: async () => {
      const fetchURL = new URL(
        "/api/data",

        process.env.NODE_ENV === "production"
          ? "https://www.material-react-table.com"
          : "http://localhost:3000"
      );

      fetchURL.searchParams.set(
        "start",

        `${pagination.pageIndex * pagination.pageSize}`
      );

      fetchURL.searchParams.set("size", `${pagination.pageSize}`);

      fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));

      fetchURL.searchParams.set("globalFilter", globalFilter ?? "");

      fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      const response = await fetch(fetchURL.href);

      const json = await response.json();

      return json;
    },

    keepPreviousData: true,
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",

        header: "Id",
      },
      {
        accessorKey: "firstName",

        header: "First Name",
      },

      {
        accessorKey: "lastName",

        header: "Last Name",
      },

      {
        accessorKey: "dob",

        header: "DOB",
      },
      {
        accessorKey: "grade",

        header: "Class",
      },
      {
        accessorKey: "bal",

        header: "Fee Balance",
      },
    ],

    []
  );

  //column definitions...
  return (
    <MaterialReactTable
      columns={columns}
      data={data?.data ?? []} //data is undefined on first render
      initialState={{
        showGlobalFilter: true,
        showColumnFilters: false,
      }}
      enableRowActions
      manualFiltering
      manualPagination
      manualSorting
      muiToolbarAlertBannerProps={
        isError
          ? {
              color: "error",

              children: "Error loading data",
            }
          : undefined
      }
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      renderBottomToolbarCustomActions={() => (
        <>
          <Tooltip arrow title="Refresh Data">
            <IconButton onClick={() => refetch()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton
              onClick={() => {
                // setUpdateModalOpen(true);
                // setSelectedData(row);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>

          <Tooltip arrow placement="right" title="Delete">
            <IconButton
              color="error"
              // onClick={() => handleDeleteRow(row)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      rowCount={data?.meta?.totalRowCount ?? 0}
      state={{
        columnFilters,

        globalFilter,

        isLoading,

        pagination,

        showAlertBanner: isError,

        showProgressBars: isFetching,

        sorting,
      }}
      {...(tableInstanceRef.current && (
        <Toolbar
          sx={{
            display: "flex",

            justifyContent: "center",

            flexDirection: "column",
          }}
        >
          <Box
            className="place-items-center"
            sx={{ display: "grid", width: "100%" }}
          >
            <Pagination
              variant="outlined"
              shape="rounded"
              count={data?.totalPages ?? 0}
              page={pagination.pageIndex + 1}
              onChange={(event, value) =>
                setPagination((prevPagination) => ({
                  ...prevPagination,
                  pageIndex: value - 1,
                }))
              }
            />
          </Box>
        </Toolbar>
      ))}
    />
  );
};

export default Student;
