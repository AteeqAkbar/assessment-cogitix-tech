"use client";
import React, { useState } from "react";
import EpisodeList from "./Components/EpisodeList";
import CharacterFeed from "./Components/CharacterFeed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Home: React.FC = () => {
  const queryClient = new QueryClient();
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(
    null
  );

  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-4xl font-semibold pt-11 text-center">
        Rick and Morty
      </h1>
      <div className=" flex min-h-screen items-start p-24 ">
        <EpisodeList onEpisodeSelect={setSelectedEpisodeId} />

        <CharacterFeed selectedEpisodeId={selectedEpisodeId} />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
