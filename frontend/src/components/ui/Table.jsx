import React from 'react';

const Table = ({
  headers = [],
  children,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ${className}`}>
      <table className="w-full text-left border-collapse text-sm">
        {headers.length > 0 && (
          <thead>
            <tr className="border-b border-white/[0.08] bg-purple-950/20 text-white/60 font-medium">
              {headers.map((header, idx) => (
                <th key={idx} className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-white/[0.05] text-white/90">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow = ({ children, className = '', onClick }) => (
  <tr
    onClick={onClick}
    className={`transition-colors duration-150 hover:bg-purple-900/10 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </tr>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`py-4 px-4 align-middle ${className}`}>
    {children}
  </td>
);

export default Table;
export { Table };
