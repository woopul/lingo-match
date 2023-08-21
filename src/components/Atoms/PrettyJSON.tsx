const PrettyJSON = ({ data }: { data: Object }) => (
  <pre className="text-small whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
);

export default PrettyJSON;
