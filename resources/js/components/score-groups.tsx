import { useDidUpdateEffect } from "@/hooks/use-did-update-effect";
import { cn } from "@/lib/utils";

interface ScoreGroupsProps {
  shouldShowAdvice?: boolean;
  items: { id: number; adjective: string; points: number }[];
  addPoints(id: number, points: number): void;
  removePoints(id: number): void;
  onClear(): void;
}

const initialPoints = [1, 2, 3, 4];

export const ScoreGroups = ({
  shouldShowAdvice = false,
  addPoints,
  removePoints,
  items,
  onClear,
}: ScoreGroupsProps) => {
  const selectedPoints = items.reduce(
    (acc, { points }) => (points === 0 ? acc : [...acc, points]),
    [] as number[]
  );

  const notSeletectedPoints = initialPoints.filter(
    (point) => !selectedPoints.includes(point)
  );

  useDidUpdateEffect(() => {
    const notSelectedItems = items.filter(({ points }) => points === 0);

    if (notSelectedItems.length === 1) {
      addPoints(notSelectedItems[0].id, notSeletectedPoints[0]);
    }
  }, [items]);

  return (
    <div className="bg-[#ededed] border border-purple-300 w-full relative px-8 pt-4 pb-6">
      {shouldShowAdvice && (
        <p className="bg-yellow-400 text-xs text-gray-600 w-fit rounded-full py-0.5 px-5 absolute left-2 top-2">
          Preencha todos os campos
        </p>
      )}
      <button
        className="block font-medium text-xs text-blue-500 hover:text-blue-600 active:text-blue-700 underline transition-colors w-fit ml-auto mr-0 mb-4"
        onClick={onClear}
        title="Limpar"
        type="button"
      >
        Limpar
      </button>
      <ul className="space-y-3">
        {items.map(({ id, adjective, points }) => (
          <li className="flex items-center justify-between" key={id}>
            <span className="font-medium text-lg text-gray-800 line-clamp-1">
              {adjective}
            </span>
            <div className="flex gap-x-2 items-center">
              {initialPoints.map((point) => {
                if (notSeletectedPoints.includes(point)) {
                  return (
                    <button
                      className="flex items-center justify-center h-8 min-h-8 w-8 min-w-8 bg-gray-50 hover:bg-purple-600 border border-purple-600 font-bold text-xl text-gray-600 hover:text-white transition-colors"
                      key={point}
                      onClick={() => addPoints(id, point)}
                      title={point.toString()}
                      type="button"
                    >
                      {point}
                    </button>
                  );
                }

                if (points === point) {
                  const isRemainingMoreThanOnePoint =
                    notSeletectedPoints.length > 1;

                  return (
                    <button
                      className={cn(
                        "flex items-center justify-center h-8 min-h-8 w-8 min-w-8 bg-purple-600 border border-gray-300 font-bold text-xl text-white transition-colors",
                        !isRemainingMoreThanOnePoint ? "cursor-not-allowed" : ""
                      )}
                      disabled={!isRemainingMoreThanOnePoint}
                      key={point}
                      onClick={
                        isRemainingMoreThanOnePoint
                          ? () => removePoints(id)
                          : undefined
                      }
                      title={point.toString()}
                      type="button"
                    >
                      {point}
                    </button>
                  );
                }

                return (
                  <button
                    className="cursor-not-allowed flex items-center justify-center h-8 min-h-8 w-8 min-w-8 bg-purple-100 border border-purple-200/90 font-bold text-xl text-gray-600 transition-colors"
                    disabled
                    key={point}
                    title={point.toString()}
                    type="button"
                  >
                    {point}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
