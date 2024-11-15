import { useDocument } from '@/hooks/use-document';
import { IconTrashX } from '@tabler/icons-react';
import { IconPlus } from '@tabler/icons-react';

interface ItemActionsProps {
  id: string;
  expanded: boolean;
  handleExpand: () => void;
}

export function ItemActions({ id, expanded, handleExpand }: ItemActionsProps) {
  const { handleCreateChildDocument, handleArchiveDocument } = useDocument();

  return (
    <div className="ml-auto flex items-center">
      <div
        role="button"
        onClick={() => handleCreateChildDocument(id, expanded, handleExpand)}
        className="rounded-sm mr-1 lg:opacity-0 lg:group-hover/item:opacity-100 hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      >
        <IconPlus className="h-4 w-4 text-muted-foreground" />
      </div>

      <div
        role="button"
        onClick={() => handleArchiveDocument(id)}
        className="rounded-sm p-px lg:opacity-0 lg:group-hover/item:opacity-100 hover:bg-input ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
      >
        <IconTrashX className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
