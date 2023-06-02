import Button from '@lingo-match/components/Atoms/Button';
import Checkbox from '@lingo-match/components/Atoms/CheckBox';
import IconImage from '@lingo-match/components/Atoms/IconImage';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import clsx from 'clsx';
import { FormEvent, useState } from 'react';

export type MainPlatformFiltersProps = {
  filters: FilterAccordionDTO[] | [];
};

const MainPlatformFilters = ({ filters }: MainPlatformFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFiltersChange = ({ filter, groupId }: { filter: string; groupId: number }) => {
    const selectedGroup = selectedFilters[groupId] ?? [];
    if (!selectedGroup?.includes(filter)) {
      setSelectedFilters({ ...selectedFilters, [groupId]: [...selectedGroup, filter] });
      return;
    }
    const newSelectedGroup = selectedGroup.filter(
      (selectedFilter: string) => selectedFilter !== filter,
    );
    setSelectedFilters({ ...selectedFilters, [groupId]: newSelectedGroup });
  };

  const isCheckboxChecked = ({ filter, groupId }: { filter: string; groupId: number }) => {
    return selectedFilters[groupId]?.includes(filter) ?? false;
  };

  const getFiltersCount = (groupId: number) => {
    return selectedFilters[groupId]?.length ?? 0;
  };

  const handleFiltersSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const filtersArray = Object.values(selectedFilters).reduce(
      (acc, curr) => [...acc, ...curr],
      [],
    );

    // TODO - handle response change for filtered platforms
    const filteredResponse = await fetch('/api/platforms/filter', {
      body: JSON.stringify(filtersArray),
      method: 'POST',
    });
  };

  return (
    <form className="flex flex-col p-2" onSubmit={handleFiltersSubmit}>
      <div className="flex flex-col gap-1.5 h-full pb-2">
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
                title={`${groupTitle} (${getFiltersCount(groupId)})`}
              >
                <div className={clsx('flex gap-1 pb-1 px-1', variant !== 'label' && 'flex-col')}>
                  {tags.data?.map(({ attributes, id }) => (
                    <Checkbox
                      checked={isCheckboxChecked({
                        filter: attributes.type ?? attributes.name,
                        groupId,
                      })}
                      id={`${attributes.name}-${groupId}-${id}`}
                      key={id}
                      label={attributes.name}
                      onChange={() =>
                        handleFiltersChange({
                          filter: attributes.type ?? attributes.name,
                          groupId,
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
      <div className="flex gap-2 justify-center mt-auto mx-auto">
        <Button className="hover:bg-opacity-75" color="secondary" type="submit">
          Aplikuj filtry
        </Button>
        <Button
          className=" hover:bg-opacity-75"
          color="black"
          onClick={() => setSelectedFilters({})}
          variant="text"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

export default MainPlatformFilters;
