# Material React Table Components Guide

## Main Components

### `<MaterialReactTable />`

- The default component for most use cases
- Accepts table options as props or a table instance
- Usage:

  ```jsx
  import {
    MaterialReactTable,
    useMaterialReactTable,
  } from "material-react-table";

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowPinning: true,
  });
  return <MaterialReactTable table={table} />; // recommended

  // OR

  return <MaterialReactTable columns={columns} data={data} enableRowPinning />; // passing props directly
  ```

- Note: Do not pass both a table prop and other table options as props

## MRT\_\* Sub Components

### Table Components

#### `<MRT_TablePaper />`

- Outermost component of the table
- Includes UI for the table and toolbar components
- Cannot pass table options as props

#### `<MRT_TableContainer />`

- Container for the table
- Contains only table UI, no toolbar components
- Useful for tables without built-in toolbars

#### `<MRT_Table />`

- Contains the `<table>` element and all table components
- Note: Loses row virtualization, modal editing, and full-screen features

#### `<MRT_TableLoadingOverlay />`

- Shows a loading spinner over the table when loading

### TableHead Components

#### `<MRT_TableHead />`

- Contains the `<thead>` element and all table head rows

#### `<MRT_TableHeadRow />`

- A `<tr>` element containing all table head cells in a row

#### `<MRT_TableHeadCell />`

- A `<th>` element containing all table head cell components

#### `<MRT_TableHeadCellColumnActionsButton />`

- Button that opens the column actions menu

#### `<MRT_TableHeadCellSortLabel />`

- Sort Icon Button and Label next to a table header

#### `<MRT_TableHeadCellFilterLabel />`

- Filter Icon Button and Label next to a table header

#### `<MRT_TableHeadCellGrabHandle />`

- Grab Handle Icon Button for column dragging

#### `<MRT_TableHeadCellResizeHandle />`

- Resize Handle Icon Button for column resizing

#### `<MRT_TableHeadCellFilterContainer />`

- Filter Container with filter input and actions

### TableBody Components

#### `<MRT_TableBody />`

- Contains the `<tbody>` element and all table body rows
- Can render multiple table bodies for static row pinning

#### `<MRT_TableBodyRow />`

- A `<tr>` element containing all table body cells in a row

#### `<MRT_TableDetailPanel />`

- Row and column-spanning row for rendering detail panels

#### `<MRT_TableBodyCell />`

- A `<td>` element surrounding the cell value or custom Cell render

#### `<MRT_TableBodyCellValue />`

- Renders the value of a cell (alternative to TanStack Table's flexRender)

#### `<MRT_TableBodyRowGrabHandle />`

- Button for grabbing a row for dragging

#### `<MRT_TableBodyRowPinButton />`

- Button(s) for pinning a row

### TableFooter Components

#### `<MRT_TableFooter />`

- Contains the `<tfoot>` element and all table footer rows

#### `<MRT_TableFooterRow />`

- A `<tr>` element containing all table footer cells in a row

#### `<MRT_TableFooterCell />`

- A `<td>` element surrounding the cell value or custom Footer render

### Input Components

#### `<MRT_EditCellTextField />`

- Textfield for editing a cell value (modal or table cell)

#### `<MRT_GlobalFilterTextField />`

- Search textfield for global filtering

#### `<MRT_FilterTextField />`

- Textfield for column filtering (can be textfield, select, multi-select, or date picker)

#### `<MRT_FilterCheckbox />`

- Checkbox for filtering a column by boolean values

#### `<MRT_FilterRangeSlider />`

- Range slider for filtering a column by a range of numbers

#### `<MRT_FilterFilterRangeFields />`

- Container rendering two MRT_FilterTextField components for min/max range filtering

#### `<MRT_SelectCheckbox />`

- Checkbox for selecting a row or all rows from the table header
