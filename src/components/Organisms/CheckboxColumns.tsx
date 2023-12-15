import CheckboxLabel from '@lingo-match/components/Atoms/CheckboxLabel';

type CheckboxLabelType = {
  checked: boolean;
  id: number;
  label: string;
};

export type CheckboxColumnType = {
  checkboxLabels: CheckboxLabelType[] | [];
  id: number;
};

export type CheckboxColumnsProps = {
  columns: CheckboxColumnType[] | [];
};

const CheckboxColumns = ({ columns }: CheckboxColumnsProps) => {
  return (
    <div className="flex flex-col gap-1 desktop:grid desktop:grid-cols-3">
      {columns?.map(({ checkboxLabels, id }) => (
        <div className="flex flex-col gap-1" key={id}>
          {checkboxLabels?.map(({ checked, id, label }) => (
            <CheckboxLabel checked={checked} key={id} label={label} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheckboxColumns;
