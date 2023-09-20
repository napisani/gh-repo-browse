export interface TableHeaderProps {
  label: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  sortIndicator?: string | null;
}
export function TableHeader({
  label,
  onClick = () => {},
  disabled = false,
  sortIndicator
}: TableHeaderProps) {
  const buttonStyle =
    'w-full m-0 rounded border-black border-2 p-4 whitespace-nowrap ' +
    (disabled ? ' bg-white-400' : ' hover:bg-blue-600');
  return (
    <th>
      <button
        disabled={disabled}
        type="button"
        className={buttonStyle}
        onClick={() => {
          onClick();
        }}>
        {label} {sortIndicator && <span>{sortIndicator}</span>}
      </button>
    </th>
  );
}
