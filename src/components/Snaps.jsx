export default function Snaps(props) {
  const { snaps } = props;

  return (
    <div className="flex flex-col gap-2">
      {snaps.map((snap, i) => (
        <div key={i} className="p-4 bg-gray-200">
          <div>{snap}</div>
        </div>
      ))}
    </div>
  );
}
