import React, { useEffect, useMemo, useRef, useState } from "react";

import MaterialReactTable, {
  MRT_FullScreenToggleButton,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { format } from "date-fns";

import {
  Box,
  IconButton,
  Pagination,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import { useQuery } from "@tanstack/react-query";
const KES = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KES",
});

const StudentClassReport = () => {
  const [columnFilters, setColumnFilters] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const tableInstanceRef = useRef(null);
  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,

    pageSize: 10,
  });

  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [
      "students-data",

      columnFilters, //refetch when columnFilters changes

      globalFilter, //refetch when globalFilter changes

      pagination.pageIndex, //refetch when pagination.pageIndex changes

      pagination.pageSize, //refetch when pagination.pageSize changes

      sorting, //refetch when sorting changes
    ],

    queryFn: async () => {
      const fetchURL = new URL(`${process.env.REACT_APP_BASE_URL}/students`);

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
  useEffect(() => {
    data && setTableData(data.items);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",

        header: "Id",
      },
      {
        accessorKey: "first_name",

        header: "First Name",
      },

      {
        accessorKey: "last_name",

        header: "Last Name",
      },

      {
        accessorKey: "dob",

        header: "DOB",
        Cell: ({ cell }) => {
          const dateTime = cell.getValue?.();
          return dateTime ? format(new Date(dateTime), "yyyy-MM-dd") : "";
        },
      },
      {
        accessorKey: "Class.name",

        header: "Class",
      },
      {
        accessorKey: "StudentTermFee[0]", // Update the index based on the correct position in the array

        header: "Total Fee",
        size: 50,
        Cell: ({ row }) => {
          const studentTermFee = row.original.StudentTermFee[0]; // Access the correct index
          const totalFee = studentTermFee
            ? Number(studentTermFee.total_fee)
            : 0;
          return `${KES.format(totalFee)}`;
        },
      },
      {
        accessorKey: "StudentTermFee[0]", // Update the index based on the correct position in the array

        header: "Fee Balance",
        size: 50,
        Cell: ({ row }) => {
          const studentTermFee = row.original.StudentTermFee[0]; // Access the correct index
          const balance = studentTermFee ? Number(studentTermFee.balance) : 0;
          return `${KES.format(balance)}`;
        },
      },
    ],

    []
  );

  //column definitions...
  return (
    <section className=" h-full w-full  p-4">
      <h1 className="mb-4 font-semibold tracking-wide text-lg">
        Students Class Report
      </h1>
      <Box className="border-slate-200 rounded border-[1px] p-4">
        {tableInstanceRef.current && (
          <Toolbar
            sx={() => ({
              backgroundColor: "#ede7f6",

              borderRadius: "4px",

              display: "flex",

              flexDirection: {
                xs: "column",

                lg: "row",
              },

              gap: "1rem",

              justifyContent: "space-between",

              p: "1.5rem 0",
            })}
          >
            <MRT_GlobalFilterTextField table={tableInstanceRef.current} />

            <Box>
              <MRT_ToggleFiltersButton table={tableInstanceRef.current} />

              <MRT_ShowHideColumnsButton table={tableInstanceRef.current} />

              <MRT_ToggleDensePaddingButton table={tableInstanceRef.current} />

              <MRT_FullScreenToggleButton table={tableInstanceRef.current} />
            </Box>
          </Toolbar>
        )}

        <MaterialReactTable
          columns={columns}
          data={tableData ?? []}
          initialState={{
            showGlobalFilter: true,
            showColumnFilters: false,
          }}
          enableTopToolbar={false}
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
          rowCount={data?.itemsPerPage ?? 0}
          tableInstanceRef={tableInstanceRef}
          state={{
            columnFilters,

            globalFilter,

            isLoading,

            pagination,

            showAlertBanner: isError,

            showProgressBars: isFetching,

            sorting,
          }}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: "grid",

                margin: "auto",

                gridTemplateColumns: "1fr",

                width: "100%",
              }}
            >
              <Typography>
                Tuition Fee:{" "}
                {KES.format(row.original?.StudentTermFee[0]?.tuition_fee ?? 0)}
              </Typography>
              <Typography>
                Bus Fee:{" "}
                {KES.format(row.original?.StudentTermFee[0]?.bus_fee ?? 0)}
              </Typography>
              <Typography>
                Boarding Fee:{" "}
                {KES.format(row.original?.StudentTermFee[0]?.boarding_fee ?? 0)}
              </Typography>
              <Typography>
                Food Fee:{" "}
                {KES.format(row.original?.StudentTermFee[0]?.food_fee ?? 0)}
              </Typography>
              <Typography>Status: {row.original?.status}</Typography>
            </Box>
          )}
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
        {/* Custom Bottom Toolbar */}

        {tableInstanceRef.current && (
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
        )}
      </Box>
    </section>
  );
};

export default StudentClassReport;
