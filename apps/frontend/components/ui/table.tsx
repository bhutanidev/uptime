interface TableProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export const Table: React.FC<TableProps> = ({ children, className = '', ...props }) => (
  <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
    {children}
  </table>
);

export const TableHeader: React.FC<TableProps> = ({ children, className = '', ...props }) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<TableProps> = ({ children, className = '', ...props }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<TableRowProps> = ({ children, className = '', ...props }) => (
  <tr className={`border-b transition-colors data-[state=selected]:bg-muted ${className}`} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<TableCellProps> = ({ children, className = '', ...props }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<TableCellProps> = ({ children, className = '', ...props }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
    {children}
  </td>
);