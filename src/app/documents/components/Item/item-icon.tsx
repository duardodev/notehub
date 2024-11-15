import { Icon } from '@tabler/icons-react';

interface ItemIconProps {
  documentIcon?: string | null;
  icon: Icon;
}

export function ItemIcon({ documentIcon, icon: Icon }: ItemIconProps) {
  return (
    <>
      {documentIcon ? (
        <div className="shrink-0 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px]" />
      )}
    </>
  );
}
