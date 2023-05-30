const PrettyJSON = ({ data }: { data: Object }) => (
  <pre className="whitespace-pre-wrap text-small">{JSON.stringify(data, null, 2)}</pre>
);

export default PrettyJSON;
