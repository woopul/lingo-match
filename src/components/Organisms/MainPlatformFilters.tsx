import Checkbox from '@lingo-match/components/Atoms/CheckBox';
import IconImage from '@lingo-match/components/Atoms/IconImage';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { BaseDataItem } from '@lingo-match/types/strapi/baseApiResponse';
import { FilterAccordionDTO, TagDTO } from '@lingo-match/types/strapi/blocks';
import clsx from 'clsx';
import { useState } from 'react';

export type MainPlatformFiltersProps = {
  filters: FilterAccordionDTO[] | [];
};

const MainPlatformFilters = ({ filters }: MainPlatformFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFiltersChange = ({ filter, group }: { filter: string; group: string }) => {
    const selectedGroup = selectedFilters[group] ?? [];
    if (!selectedGroup?.includes(filter)) {
      setSelectedFilters({ ...selectedFilters, [group]: [...selectedGroup, filter] });
      return;
    }
    const newSelectedGroup = selectedGroup.filter(
      (selectedFilter: string) => selectedFilter !== filter,
    );
    setSelectedFilters({ ...selectedFilters, [group]: newSelectedGroup });
  };

  const getFiltersCount = (groupTitle: string, groupId: number) => {
    return selectedFilters[`${groupTitle}-${groupId}`]?.length ?? 0;
  };

  return (
    <div className="flex flex-col gap-1.5 py-2">
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
              className="pt-0 pb-0"
              expanded={expanded}
              icon={Icon}
              key={groupId}
              shouldBeExpandable={shouldBeExpandable}
              title={`${groupTitle} (${getFiltersCount(groupTitle, groupId)})`}
            >
              <div className={clsx('flex gap-1 pb-1 px-0.5', variant !== 'label' && 'flex-col')}>
                {tags.data?.map(({ attributes, id }: BaseDataItem<TagDTO>) => (
                  <Checkbox
                    id={`${attributes.name}-${groupId}-${id}`}
                    key={id}
                    label={attributes.name}
                    onChange={() =>
                      handleFiltersChange({
                        filter: attributes.type,
                        group: `${groupTitle}-${groupId}`,
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
  );
};

export default MainPlatformFilters;
