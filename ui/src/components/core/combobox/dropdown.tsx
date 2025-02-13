import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@/components/core/icon';
import { Flex } from '@/components';

type DropdownOptionProps = {
  option: DropdownItem;
};

const DropdownOption = ({ option }: DropdownOptionProps) => (
  <Listbox.Option
    className={({ active }) =>
      `relative cursor-default select-none py-2 px-3.5 text-slate11 rounded-xl mb-2 text-sm ${
        active ? 'bg-slate5 text-slate12' : 'bg-transparent'
      }`
    }
    value={option}
  >
    {({ selected, active }) => (
      <Flex css={{ justifyContent: 'space-between' }}>
        <span className={`${active ? 'text-slate12' : 'text-slate11'}`}>
          {option.label}
        </span>
        {selected && <Icon name="check" color="white" />}
      </Flex>
    )}
  </Listbox.Option>
);

type DropdownButtonProps = {
  selectedValue: DropdownItem | undefined;
  open: boolean;
};

const DropdownButton = ({ selectedValue, open }: DropdownButtonProps) => (
  <Listbox.Button
    className={`relative w-full cursor-default  bg-transparent border-solid border border-slate7  py-3 pl-3.5 pr-10 h-11 text-left focus:outline-none sm:text-sm ${
      open ? 'border-b-0 rounded-t-xl bg-black border-slate6' : 'rounded-xl'
    }`}
  >
    <span
      className={`block truncate ${
        selectedValue && selectedValue.label ? 'text-slate12' : 'text-slate11'
      }`}
    >
      {selectedValue && selectedValue.label ? selectedValue.label : 'Select'}
    </span>
    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
      <Icon name="chevron-down" />
    </span>
  </Listbox.Button>
);

export type DropdownItem = {
  value: string;
  label: string;
};

export type DropdownProps = {
  items: DropdownItem[];
  selectedValue: DropdownItem | undefined;
  onChange(option: DropdownItem): void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedValue,
  onChange,
}) => {
  const handleDropdownChange = (option: DropdownItem) => {
    onChange(option);
  };

  return (
    <Listbox value={selectedValue} by="value" onChange={handleDropdownChange}>
      {({ open }) => (
        <div className="relative">
          <DropdownButton selectedValue={selectedValue} open={open} />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute max-h-fit w-full z-10 overflow-auto rounded-b-xl bg-black px-3 pt-2 border-solid  border-slate6  border text-base focus:outline-none sm:text-sm">
              {items.map((option: DropdownItem) => (
                <DropdownOption key={option.value} option={option} />
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
