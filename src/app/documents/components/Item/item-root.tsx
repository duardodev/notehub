import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ItemRootProps {
  children: React.ReactNode;
  id?: string;
  level?: number;
  active?: boolean;
  onClick: () => void;
}

export function ItemRoot({ children, id, level, active, onClick }: ItemRootProps) {
  return (
    <Button
      onClick={onClick}
      variant={'ghost'}
      size={'sm'}
      style={{ paddingLeft: level ? `${level * 16 + 16}px` : '16px' }}
      className={cn(
        'group/item w-full h-7 pr-4 rounded-none gap-1 justify-start',
        !!id && 'text-foreground/70',
        active && 'bg-accent text-accent-foreground'
      )}
    >
      {children}
    </Button>
  );
}

ItemRoot.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div style={{ paddingLeft: level ? `${level * 16 + 26}px` : '16px' }} className="flex gap-x-2 py-[3px]">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  );
};
