export interface PagerProps {
  page: number;
  perPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void | Promise<void>;
  onRowsPerPageChange?: (rowsPerPage: number) => void | Promise<void>;
}
export function Pager({
  page,
  perPage,
  totalItems,
  onPageChange = () => {},
  onRowsPerPageChange = () => {}
}: PagerProps) {
  function handlePageChange(page: number) {
    onPageChange(page);
  }
  function handleRowsPerPageChange(rowsPerPage: string) {
    onRowsPerPageChange(parseInt(rowsPerPage));
  }
  const buttonStyle = 'border-black border-2 p-4 m-2 rounded';
  const previousDisabled = page === 1;
  const nextDisabled = page * perPage >= totalItems;
  return (
    <div className="w-1/2 m-auto">
      <button
        className={`${buttonStyle} ${previousDisabled ? 'bg-gray-300' : 'hover:bg-blue-600'}`}
        disabled={page === 1}
        onClick={() => {
          handlePageChange(page - 1);
        }}>
        Previous
      </button>
      <span className="text-xl mx-4">Page: {page}</span>
      <button
        className={`${buttonStyle} ${nextDisabled ? 'bg-gray-300' : 'hover:bg-blue-600'}`}
        disabled={page * perPage >= totalItems}
        onClick={() => {
          handlePageChange(page + 1);
        }}>
        Next
      </button>
      <label htmlFor="rows-per-page-input">Rows:</label>
      <select
        className="border-black border-2 p-4 m-2 rounded"
        onChange={(e) => handleRowsPerPageChange(e.target.value)}
        id="rows-per-page-input">
        {[5, 10, 25, 50, 100].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
