'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from 'next-themes';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface IconPickerProps {
  asChild?: boolean;
  children: React.ReactNode;
  onChange: (icon: string) => void;
}

export function IconPicker({ asChild, children, onChange }: IconPickerProps) {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || 'light';

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="w-0 h-0 p-0">
        <Picker
          data={data}
          theme={currentTheme}
          onEmojiSelect={(data: { native: string }) => onChange(data.native)}
        />
      </PopoverContent>
    </Popover>
  );
}
