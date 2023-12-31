import { ColumnDef as ProjectDataTableColumns } from "@tanstack/react-table"

import { ProjectDataTableRowActions } from "./project-data-table-row-actions"
import { Checkbox } from "../../../components/ui/checkbox"
import { DataTableColumnHeader } from "../../../components/ui/data-table/data-table-column-header"
import { TProject } from "../../../models/project"

export const columns: ProjectDataTableColumns<TProject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] align-top"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] align-top"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ProjectDataTableRowActions row={row} />,
  },
]