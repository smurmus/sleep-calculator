import { View } from 'react-native';
import React, { useState } from 'react';
import DropdownPicker, { ValueType } from 'react-native-dropdown-picker';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

import Text from './Text';

type ControlledDropdownProps<T extends ValueType> = {
  options: {
    label: string;
    value: T;
  }[];
  placeholder?: string;
  label: string;
  id: string;
} & Omit<ControllerProps, 'render'>;

export function ControlledDropdown<T extends ValueType>({
  options,
  placeholder,
  label,
  id,
  ...otherProps
}: ControlledDropdownProps<T>) {
  const { control, setValue } = useFormContext();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <View>
          <Text>{label}</Text>
          <DropdownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            onChangeValue={onChange}
            setValue={(currVal) => setValue(otherProps.name, currVal)}
            setItems={setItems}
            placeholder={placeholder}
          />
        </View>
      )}
      {...otherProps}
    />
  );
}
