import Button from '@lingo-match/components/Atoms/Button';
import Checkbox from '@lingo-match/components/Atoms/Checkbox';
import IconImage from '@lingo-match/components/Atoms/IconImage';
import Loader from '@lingo-match/components/Atoms/Loader';
import AccordionItem from '@lingo-match/components/Organisms/AccordionItem';
import { FilterAccordionDTO } from '@lingo-match/types/strapi/blocks';
import clsx from 'clsx';
import { debounce, isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';

export type MainPlatformFiltersProps = {
  filters: FilterAccordionDTO[] | [];
  setPlatformList: (platforms: any) => void;
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

const MainPlatformFilters = ({ filters, setPlatformList }: MainPlatformFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Array<SelectedFilterType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    debounceFetchFilters();
    return () => {
      debounceFetchFilters.cancel();
    };
  }, [selectedFilters]);

  const handleFiltersChange = (filter: SelectedFilterType) => {
    if (!isEmpty(selectedFilters) && selectedFilters.some((item) => item.name === filter.name)) {
      setSelectedFilters(selectedFilters.filter((item) => item.name !== filter.name));
      return;
    }
    setSelectedFilters([...selectedFilters, filter]);
  };

  const isCheckboxChecked = (type: string) => {
    return selectedFilters.some((item) => item.type === type);
  };

  const getFiltersCountForGroup = (groupId: number) => {
    return selectedFilters.filter((item) => item.groupId === groupId).length;
  };

  const handleFiltersSubmit = async () => {
    setIsLoading(true);
    const filtersArray = selectedFilters.map((item) => item.type);

    // TODO - handle response change for filtered platforms
    const response = await fetch('/api/platforms/filter', {
      body: JSON.stringify(filtersArray),
      method: 'POST',
    });

    const { data, success } = await response.json();

    if (!success) {
      // TODO - handle fetch error (notification?)
      setIsLoading(false);
      return;
    }
    setPlatformList(data);
    setIsLoading(false);
  };

  const debounceFetchFilters = debounce(handleFiltersSubmit, 1000);

  return (
    <div className="px-2 relative">
      <div className="sticky z-20 p-2 mb-2 -mx-2 top-[8.5rem] bg-white flex flex-col gap-2 border-lighterGrey border-b">
        <div className="flex justify-between">
          <div className="flex items-center">
            <BsFilterLeft className="w-[2.4rem] h-[2.4rem]" />
            <div className="mx-2">{labels.filters}</div>
            {isLoading && <Loader className="w-[1.8rem] h-[1.8rem]" />}
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
                  className="rounded-full bg-orange flex content-between items-center flex-row-reverse"
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
        <div className="flex flex-col gap-1.5 h-full pb-2">
          {/*<AccordionItem*/}
          {/*  bold*/}
          {/*  className="px-0 pt-0 pb-1"*/}
          {/*  expanded*/}
          {/*  shouldBeExpandable={false}*/}
          {/*  title="Cena"*/}
          {/*>*/}
          {/*  <RangeInput className="px-2" id="platform-price-slider" max={500} min={0} />*/}
          {/*</AccordionItem>*/}
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
                    className={clsx(
                      'flex gap-1 pb-1 px-1',
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
  );
};

export default MainPlatformFilters;
