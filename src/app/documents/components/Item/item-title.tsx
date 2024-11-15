interface ItemTitleProps {
  label: string;
}

export function ItemTitle({ label }: ItemTitleProps) {
  return <span className="ml-[2px] truncate">{label}</span>;
}
