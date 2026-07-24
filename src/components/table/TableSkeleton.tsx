type Props = {
  rows?: number;
};

export function TableSkeleton({
  rows = 8,
}: Props) {
  return (
    <tbody>
      {Array.from({
        length: rows,
      }).map((_, index) => (
        <tr
          key={index}
          className="border-b"
        >
          {Array.from({
            length: 6,
          }).map((_, cell) => (
            <td
              key={cell}
              className="px-5 py-4"
            >
              <div
                className="
                  h-4
                  animate-pulse
                  rounded
                  bg-slate-200
                "
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}