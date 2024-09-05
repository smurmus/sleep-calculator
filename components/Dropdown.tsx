import { View } from 'react-native';
import React, { useState } from 'react';
import DropdownPicker, { ValueType } from 'react-native-dropdown-picker';

import Text from './Text';

type DropdownProps<T extends ValueType> = {
  options: {
    label: string;
    value: T;
  }[];
  placeholder?: string;
  label: string;
};


export function Dropdown<T extends ValueType>({
  options,
  placeholder,
  label,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<T | null>(null);
  const [items, setItems] = useState(options);

  return (
    <View>
      <Text>{label}</Text>
      <DropdownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
      />
    </View>
  );
}
