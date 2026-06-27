import { useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { createQueryString } from '@/lib/utils/utils';

interface useSelectValueProps {
  defaultValue?: string | number;
  param?: string;
}

export function useSelectValue({ defaultValue, param }: useSelectValueProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelect = (option: string | number) => {
    setSelectedValue(option);

    // Make new request if param is true
    if (param) {
      const newSearchString = createQueryString(searchParams, [
        { param, value: option },
      ]);

      router.replace(`${pathname}?${newSearchString}`);
    }
  };

  return { selectedValue, handleSelect };
}
