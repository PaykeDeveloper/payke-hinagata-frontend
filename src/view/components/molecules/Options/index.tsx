interface Props<T> {
  objects: T[];
  display: keyof T;
  value: keyof T;
}

const Options = <T extends unknown>(props: Props<T>) => {
  const { objects, value, display } = props;
  const options = objects.map((object, index) => (
    <option key={index} value={`${object[value]}`}>
      {`${object[display]}`}
    </option>
  ));
  return <>{options}</>;
};

export default Options;
