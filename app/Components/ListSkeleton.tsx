import React from "react";

function ListSkeleton() {
  return (
    <div className="flex flex-col gap-8 pt-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-neutral-300 w-full animate-pulse rounded-xl p-4 gap-4 shadow1"
        >
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListSkeleton;
