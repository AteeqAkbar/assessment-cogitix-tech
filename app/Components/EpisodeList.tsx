"use client";
import React, { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEpisodes } from "../services/api";
import ListSkeleton from "./ListSkeleton";
import ButtonSecondary from "./ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";

interface Episode {
  id: number;
  name: string;
  episode: string;
}

interface EpisodeListProps {
  onEpisodeSelect: (episodeId: number | null) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ onEpisodeSelect }) => {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(
    null
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["episodes"],
    queryFn: fetchEpisodes,
  });

  if (isError) return <p>Error fetching episodes</p>;

  const handleEpisodeClick = (episodeId: number | null) => {
    setSelectedEpisodeId(episodeId);
    onEpisodeSelect(episodeId);
  };

  return (
    <div className="w-1/4 p-4 shadow2 rounded-3xl">
      <h2 className="text-xl font-bold mb-4">Episodes</h2>
      <ul className="space-y-2">
        {isLoading ? (
          <ListSkeleton />
        ) : (
          <>
            {data?.results.map((episode: Episode) => (
              <Fragment key={episode.id + Date.now() + Math.random()}>
                {selectedEpisodeId === episode.id ? (
                  <ButtonPrimary
                    onClick={() => handleEpisodeClick(episode.id)}
                    text={episode.name}
                    style={{
                      width: "100%",

                      textAlign: "center",
                    }}
                  />
                ) : (
                  <ButtonSecondary
                    onClick={() => handleEpisodeClick(episode.id)}
                    text={episode.name}
                    style={{
                      width: "100%",

                      textAlign: "center",
                    }}
                  />
                )}
              </Fragment>
            ))}
            <ButtonSecondary
              onClick={() => handleEpisodeClick(null)}
              text={"Reset to All Characters"}
              style={{
                width: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </>
        )}
      </ul>
    </div>
  );
};

export default EpisodeList;
