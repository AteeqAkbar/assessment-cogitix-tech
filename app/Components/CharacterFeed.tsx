"use client";
import React, { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacters, fetchEpisodeCharacters } from "../services/api";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterFeedProps {
  selectedEpisodeId: number | null;
}

const CharacterFeed: React.FC<CharacterFeedProps> = ({ selectedEpisodeId }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters", selectedEpisodeId, page],
    queryFn: () =>
      selectedEpisodeId
        ? fetchEpisodeCharacters(selectedEpisodeId)
        : fetchCharacters(page),
  });

  if (isError) return <p>Error fetching characters</p>;

  const characters = selectedEpisodeId ? data?.characters : data?.results;
  const totalPages = data?.info?.pages || 1;

  return (
    <div className="p-4 pt-0 w-3/4">
      {selectedEpisodeId && data?.name && characters.length > 0 && (
        <span className="tag-neumorphic inline-block p-2 rounded-full text-lg font-medium text-gray-600 mb-1 mr-2">
          {characters?.length} characters in episode {data?.name}
        </span>
      )}
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {characters.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 pt-8">
              {characters.map((character: Character) => (
                <Fragment key={character?.name + Date.now() + Math.random()}>
                  <Card
                    name={character?.name}
                    imageUrl={character?.image}
                  ></Card>
                </Fragment>
              ))}
            </div>
          )}
          {!selectedEpisodeId && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                Previous
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(1)}
                  className={`px-3 py-1 rounded-md ${
                    page === 1
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  1
                </button>

                {page > 4 && <span className="px-2">...</span>}

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter((pageNumber) => {
                    return (
                      pageNumber >= page - 1 &&
                      pageNumber <= page + 1 &&
                      pageNumber !== 1 &&
                      pageNumber !== totalPages
                    );
                  })
                  .map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`px-3 py-1 rounded-md ${
                        page === pageNumber
                          ? "bg-blue-700 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                {page < totalPages - 3 && <span className="px-2">...</span>}

                {totalPages > 1 && (
                  <button
                    onClick={() => setPage(totalPages)}
                    className={`px-3 py-1 rounded-md ${
                      page === totalPages
                        ? "bg-blue-700 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </div>

              <button
                onClick={() =>
                  setPage((old) => (data?.info?.next ? old + 1 : old))
                }
                disabled={!data?.info?.next}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterFeed;
