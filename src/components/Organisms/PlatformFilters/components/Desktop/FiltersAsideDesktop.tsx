import Button from '@lingo-match/components/Atoms/Button';
import Checkbox from '@lingo-match/components/Atoms/Checkbox';
import IconImage from '@lingo-match/components/Atoms/IconImage';
import Loader from '@lingo-match/components/Atoms/Loader';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { useHeaderHeight } from '@lingo-match/hooks';
import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import { cn } from '@lingo-match/utlis/cn';
import { isEmpty } from 'lodash-es';
import { use, useEffect, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';

export type MainPlatformFiltersProps = {
  filters: FilterAccordionDTO[] | [];
  handleFiltersChange: (filter: SelectedFilterType) => void;
  isLoading: boolean;
  selectedFilters: Array<SelectedFilterType>;
  setPlatformList: (platforms: any) => void;
  setSelectedFilters: (filters: any) => void;
};

const labels = {
  cleanFilters: 'Wyczyść filtry',
  filters: 'Filtry',
  selectedFilters: 'Wybrane filtry',
};

type SelectedFilterType = {
  groupId: number;
  name: string;
  type: string;
};

export const FiltersAsideDesktop = ({
  filters,
  handleFiltersChange,
  isLoading,
  selectedFilters,
  setSelectedFilters,
}: MainPlatformFiltersProps) => {
  const headerHeight = useHeaderHeight();
  const isCheckboxChecked = (type: string) => {
    return selectedFilters.some((item) => item.type === type);
  };

  const getFiltersCountForGroup = (groupId: number) => {
    return selectedFilters.filter((item) => item.groupId === groupId).length;
  };

  return (
    <aside className="col-span-3 hidden min-h-[40rem] flex-col justify-start desktop:flex">
      <div className="sticky top-10 rounded-md bg-white px-2 drop-shadow-md">
        <div
          className="sticky  z-20 -mx-2 mb-2 flex flex-col gap-2 rounded-md border-b border-lighterGrey bg-white p-2"
          style={{ top: headerHeight }}
        >
          <div className="flex justify-between">
            <div className="flex items-center">
              <BsFilterLeft className="h-[2.4rem] w-[2.4rem]" />
              <div className="mx-2">{labels.filters}</div>
              {isLoading && <Loader className="h-[1.8rem] w-[1.8rem]" />}
            </div>
            <Button
              disabled={isEmpty(selectedFilters)}
              onClick={() => setSelectedFilters([])}
              variant="text"
            >
              {labels.cleanFilters}
            </Button>
          </div>
          {!isEmpty(selectedFilters) && (
            <div className="text-paragraph flex flex-col gap-1">
              <div className="font-bold">{labels.selectedFilters}</div>
              <div className="flex flex-wrap gap-1">
                {selectedFilters?.map((filter) => (
                  <div
                    className="flex flex-row-reverse content-between items-center rounded-full bg-orange"
                    key={filter.name}
                  >
                    <Button
                      className="peer p-[0.5rem] px-[0.5rem]"
                      onClick={() => handleFiltersChange(filter)}
                      type={'button'}
                      variant="text"
                    >
                      <IoCloseOutline />
                    </Button>
                    <span className="pl-1 leading-14 peer-hover:line-through">{filter.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <form className="flex flex-col">
          <div className="flex h-full flex-col gap-1.5 pb-2">
            {filters.map(
              ({
                expanded,
                icon,
                id: groupId,
                positionReversed,
                shouldBeExpandable,
                tags,
                title: groupTitle,
                variant,
              }) => {
                const Icon = icon.data ? (
                  <IconImage className="mr-1" src={icon.data.attributes.url} />
                ) : null;

                return (
                  <AccordionItem
                    bold
                    className="px-0 py-0"
                    expanded={expanded}
                    icon={Icon}
                    key={groupId}
                    shouldBeExpandable={shouldBeExpandable}
                    title={`${groupTitle} (${getFiltersCountForGroup(groupId)})`}
                  >
                    <div
                      className={cn(
                        'flex gap-1 px-1 pb-1',
                        variant === 'label' ? 'flex-row flex-wrap' : 'flex-col',
                      )}
                    >
                      {tags.data?.map(({ attributes, id }) => (
                        <Checkbox
                          checked={isCheckboxChecked(attributes.type)}
                          id={`${attributes.name}-${groupId}-${id}`}
                          key={id}
                          label={attributes.name}
                          labelFullWidth
                          onChange={() =>
                            handleFiltersChange({
                              groupId,
                              name: attributes.name,
                              type: attributes.type ?? attributes.name,
                            })
                          }
                          positionReversed={positionReversed}
                          variant={variant}
                        />
                      ))}
                    </div>
                  </AccordionItem>
                );
              },
            )}
          </div>
        </form>
      </div>
    </aside>
  );
};
