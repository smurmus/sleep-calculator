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
  /** @prop elevation to help appropriately set zIndex if there are multiple pickers */
  elevation?: number;
} & Omit<ControllerProps, 'render'>;

export function ControlledDropdown<T extends ValueType>({
  options,
  placeholder,
  label,
  id,
  elevation = 10,
  ...otherProps
}: ControlledDropdownProps<T>) {
  const { control, setValue } = useFormContext();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={{ zIndex: elevation }}>
          <Text>{label}</Text>
          <DropdownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            onChangeValue={(e) => {
              onChange(e);
              setOpen(false);
            }}
            setValue={(currVal) => setValue(otherProps.name, currVal)}
            closeAfterSelecting
            setItems={setItems}
            placeholder={placeholder}
            dropDownContainerStyle={{
              backgroundColor: 'white',
              zIndex: 10,
            }}
          />
        </View>
      )}
      {...otherProps}
    />
  );
};
