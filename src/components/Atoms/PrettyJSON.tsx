import { PropsWithChildren } from 'react';

const PrettyJSON = ({ data }: { data: Object }) => (
  <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
);

export default PrettyJSON;
