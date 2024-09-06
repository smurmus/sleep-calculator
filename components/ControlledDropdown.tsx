import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropdownPicker, { ValueType } from 'react-native-dropdown-picker';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

import Text from './Text';

type ControlledDropdownProps<T extends ValueType> = {
  options: {
    label: string;
    value: T;
  }[];
  initialValue?: T | null;
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
  name,
  initialValue,
  ...otherProps
}: ControlledDropdownProps<T>) {
  const { control, setValue: setFieldValue, trigger, formState: { isDirty, isValid } } = useFormContext();

  const [open, setOpen] = useState(false);
  const [currValue, setCurrValue] = useState(initialValue);
  const [items, setItems] = useState(options);

  useEffect(() => {
    if (isDirty || initialValue != null) {
      trigger();
    }
  }, [isDirty, trigger]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, formState: { errors: fieldErrors } }) => (
        <View style={{ zIndex: elevation }}>
          <Text type="xs" style={{ fontWeight: 500, marginBottom: 4 }}>{label}</Text>
          <DropdownPicker
            testID={`${id}-dropdown`}
            open={open}
            value={currValue as ValueType}
            items={items}
            setOpen={setOpen}
            onClose={() => {
              trigger();
            }}
            onChangeValue={(v) => {
              onChange(v);
              setFieldValue(name, currValue, { shouldValidate: true });
              setOpen(false);
            }}
            setValue={setCurrValue}
            closeAfterSelecting
            setItems={setItems}
            placeholder={placeholder}
            dropDownContainerStyle={{
              backgroundColor: 'white',
              zIndex: 10,
            }}
          />
          {fieldErrors[name] && !isValid &&
            <Text type="xs" color="red" style={{ paddingTop: 4 }}>
              {fieldErrors[name]?.message as string}
            </Text>
          }
        </View>
      )}
      {...otherProps}
    />
  );
};
