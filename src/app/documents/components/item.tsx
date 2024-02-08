import { Button } from '@/components/ui/button';
import { Icon } from '@tabler/icons-react';

interface ItemProps {
  icon: Icon;
  label: string;
}

export function Item({ icon: Icon, label }: ItemProps) {
  return (
    <Button variant={'ghost'} size={'sm'} className="min-w-full h-8 px-[10px] gap-2 justify-start">
      <Icon size={18} />
      {label}
    </Button>
  );
}
