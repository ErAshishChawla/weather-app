import useClasses from "../hooks/useClasses";

function Skeleton({ times = 1, className }) {
  const outerClassNames = useClasses(
    "relative overflow-hidden bg-gray-200",
    className
  );
  const innerClassNames = useClasses(
    "animate-shimmer absolute inset-0 -translate-x-full",
    "bg-gradient-to-r from-gray-200 via-white to-gray-200"
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames}></div>
        </div>
      );
    });

  return boxes;
}

export default Skeleton;
