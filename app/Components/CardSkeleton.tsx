import React from "react";

function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pt-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-neutral-300 w-full h-50 animate-pulse rounded-xl gap-4 card-neumorphic p-5"
        >
          <div className="bg-neutral-400/50 img-neumorphic w-full h-52 animate-pulse rounded-md"></div>
          <div className="flex justify-center align-center gap-2">
            <div className="bg-neutral-400/50 text-center w-32 h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
