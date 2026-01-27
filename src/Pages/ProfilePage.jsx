import {  useCallback, useEffect, useState } from "react";
import { getUserData, deleteUserById } from "../Services/workflowService";
import { Link } from "react-router-dom";
import { Debounce } from "./Debounce";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";

const ProfilePage = () => {
  const [pagination,setPagination] = useState({
  pageIndex: 0,
  pageSize: 5,
});
const [searchValue,setSearchValue] = useState("");
  const [columnFilters, setcolumnFilters] = useState([]);
  const [sorting,setsorting] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [oldData, setOldData] = useState([]);
  // const [page,setpage] = useState(0);
  // const [size,setsize] = useState(5);
  // const size= 5;
  // const sortBy="name";
  // const [username,setusername] = useState("");

  const debouncedUsername = Debounce(searchValue,500);

  useEffect(() => {
    setcolumnFilters([
      {id:"name",
      value: debouncedUsername,}
    ])
  }, [debouncedUsername]);

  const fetchUserDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUserData();
      setOldData(response.userList || []);
      
      // setsize(response.userList.length)
      // console.log("checking",response.userList.length);
    } catch (error) {
      setMessage("Data not found",error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetail();
   setPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, [fetchUserDetail,columnFilters]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        await deleteUserById(id);
        fetchUserDetail();
      }
    } catch (error) {
      alert("Sorry, user not found",error.message);
    }
  };

  // const handleSearch = (e) =>
  // {
  //   setusername(e.target.value)
    
  //   setpage(0);

  // }
  // const filterUsers = oldData.filter((user)=>
    
  //     user.name.toLowerCase().includes(username.toLowerCase())
  //   );

const data = useMemo(() => oldData, [oldData]);

const columns = useMemo(
  () => [
    {
      id: "srNo",
      header: "Sr. No",
      enableSorting: false,
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return pageIndex * pageSize + row.index + 1;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="space-x-2">
          <Link
            to={`/update/${row.original.id}`}
            className="inline-block px-3 py-1 text-sm text-white bg-blue-500 rounded"
          >
            Update
          </Link>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="inline-block px-3 py-1 text-sm text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ],
  []
);



 const table = useReactTable({
  data,
  columns,
  state: {
    sorting,
    columnFilters,
    pagination,
  },
  onSortingChange: setsorting,
  onPaginationChange: setPagination,
  onColumnFiltersChange: setcolumnFilters,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

console.log(table.getHeaderGroups())
console.log(columnFilters);

// useEffect(() => {
//   table.setPageIndex(0);
// }, [globalFilter]);



// const filterChange = (id,value) => setcolumnFilters(
//   prev => prev.filter(f=> f.id !== id).concat({
//     id,value
//   })
// )
// const taskname = columnFilters.find(f=>f.id == "name")?.value || ""; 
  return (
  <div className="min-h-screen bg-slate-100 p-6">
    <div className="max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            User Management
          </h1>
          <p className="text-slate-500 text-sm">
            Manage registered users, roles and access
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by username..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            table.setPageIndex(0);
          }}
          className="w-full md:w-64 px-4 py-2 rounded-lg border border-slate-300
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Message */}
        {message && (
          <div className="px-6 py-3 bg-indigo-50 text-indigo-600 text-sm">
            {message}
          </div>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="p-10 text-center text-slate-500">
            Loading users...
          </div>
        ) : oldData.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No users found
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                
                <thead className="bg-slate-100 sticky top-0">
                  {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id}>
                      {hg.headers.map(header => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-6 py-3 text-left text-sm font-semibold text-slate-600
                          cursor-pointer select-none"
                        >
                          {header.column.columnDef.header}
                          <span className="ml-2">
                            {{
                              asc: "▲",
                              desc: "▼",
                            }[header.column.getIsSorted()] ?? ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr
                      key={row.id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      {row.getVisibleCells().map(cell => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-sm text-slate-700"
                        >
                          {cell.column.columnDef.cell
                            ? cell.column.columnDef.cell(cell.getContext())
                            : cell.getValue()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t">
              <span className="text-sm text-slate-600">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-4 py-2 rounded-md border text-sm
                  disabled:opacity-50 hover:bg-slate-100"
                >
                  Previous
                </button>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-4 py-2 rounded-md border text-sm
                  disabled:opacity-50 hover:bg-slate-100"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

};

export default ProfilePage;
