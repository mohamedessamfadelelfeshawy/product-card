"use client";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { categories } from "../../data";

interface IProps {
    selectedId: number; 
    setSelectedId: (id: number) => void;
}

const Select = ({ selectedId, setSelectedId }: IProps) => {
  const selectedCategory = categories.find((cat) => cat.id === selectedId);

  return (
    <Listbox value={selectedId} onChange={setSelectedId}>
      <Label className="my-1 font-medium text-gray-700 block">Category</Label>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left border-2 text-gray-900 outline-0 -outline-offset-0 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt=""
              src={selectedCategory.imageURL}
              className="size-5 shrink-0 rounded-full"
            />
            <span className="block truncate">{selectedCategory.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {categories.map((category) => (
            <ListboxOption
              key={category.id}
              value={category.id}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pr-9 pl-3 ${
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                }`
              }
            >
              {({ selected }) => (
                <>
                  <div className="flex items-center">
                    <img
                      alt=""
                      src={category.imageURL}
                      className="size-5 shrink-0 rounded-full"
                    />
                    <span
                      className={`ml-3 block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {category.name}
                    </span>
                  </div>

                  {selected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default Select;
