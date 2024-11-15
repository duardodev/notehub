import { IconChevronRight } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';

interface ItemExpandButtonProps {
  handleExpand: () => void;
  expanded: boolean;
}

export function ItemExpandButton({ handleExpand, expanded }: ItemExpandButtonProps) {
  const ChevronIcon = expanded ? IconChevronDown : IconChevronRight;

  function onExpand(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    handleExpand?.();
  }

  return (
    <div
      role="button"
      onClick={onExpand}
      className="rounded-sm hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
    >
      <ChevronIcon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
