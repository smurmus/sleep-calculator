import { TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropdownPicker, { ValueType } from 'react-native-dropdown-picker';
import { useFormContext, Controller, ControllerProps } from 'react-hook-form';

import { useThemeColor } from '@/hooks/useColor';

import Text from './Text';

type DropdownOption<T> = {
  label: string;
  value: T;
  testID: string;
  disabled?: boolean;
  selectable?: boolean;
}

type ListItemProps<T extends ValueType> = {
  item: DropdownOption<T>;
  onChangeValue: (val: T) => void;
}

function ListItem<T extends ValueType>({ item, onChangeValue }: ListItemProps<T>) {
  const { disabled, label, value } = item;

  return (
    <TouchableOpacity
      onPress={(_) => onChangeValue(value)}
      disabled={disabled}
      style={{
        paddingVertical: 4, 
        paddingHorizontal: 8,
      }}
    >
      <Text color={disabled ? "grey" : "text"}>{label}</Text>
    </TouchableOpacity>
  );
};

type ControlledDropdownProps<T extends ValueType> = {
  options: DropdownOption<T>[];
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
  const placeholderColor = useThemeColor('grey');

  const [open, setOpen] = useState(false);
  const [currValue, setCurrValue] = useState<T | null | undefined>(initialValue);

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
            items={options}
            setOpen={setOpen}
            onClose={() => {
              trigger();
            }}
            setValue={setCurrValue}
            closeAfterSelecting
            placeholder={placeholder}
            dropDownContainerStyle={{
              backgroundColor: 'white',
              zIndex: 10,
            }}
            renderListItem={({ item }) =>
              <ListItem
                onChangeValue={(v) => {
                  onChange(v);
                  setFieldValue(name, v, { shouldValidate: true });
                  setCurrValue(v);
                  setOpen(false);
                }}
                item={item as DropdownOption<T>}
              />
            }
            placeholderStyle={{
              color: placeholderColor,
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
