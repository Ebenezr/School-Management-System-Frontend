import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  MaterialReactTable,
  Tooltip,
  IconButton,
  Box,
  Edit,
  Delete,
} from "..."; // replace with your actual imports

const MyMaterialReactTable = ({
  columns,
  tableData,
  refetch,
  handleDeleteRow,
  setUpdateModalOpen,
  setSelectedData,
  data,
  isError,
  setColumnFilters,
  setGlobalFilter,
  setPagination,
  setSorting,
  tableInstanceRef,
  columnFilters,
  globalFilter,
  isLoading,
  pagination,
  isFetching,
  sorting,
}) => (
  <MaterialReactTable
    columns={columns}
    data={tableData ?? []}
    initialState={{
      showGlobalFilter: true,
      showColumnFilters: false,
    }}
    enableTopToolbar={false}
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
    renderRowActions={({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip arrow placement="left" title="Edit">
          <IconButton
            onClick={() => {
              setUpdateModalOpen(true);
              setSelectedData(row);
            }}
          >
            <Edit />
          </IconButton>
        </Tooltip>

        <Tooltip arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
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
  />
);

export default MyMaterialReactTable;
