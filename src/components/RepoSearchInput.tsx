export interface RepoSearchInputProps {
  label: string;
  placeholder?: string;
  id: string;
  tabIndex?: number;
  onChange?: (value: string) => void | Promise<void>;
  disabled?: boolean;
  value?: string;
}

export function RepoSearchInput({
  label,
  id,
  placeholder = '',
  value = '',
  tabIndex = -1,
  disabled = false,
  onChange = () => {}
}: RepoSearchInputProps) {
  const inputId = `${id}-input`;
  return (
    <div id={id}>
      <label htmlFor={inputId}>{label}:</label>
      <input
        id={inputId}
        className="border-black border-2 p-4 m-2 rounded"
        type="text"
        value={value}
        disabled={disabled}
        tabIndex={tabIndex}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
