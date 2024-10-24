export const fetchCharacters = async (page: number = 1) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  return response.json();
};

export const fetchEpisodes = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/episode");
  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }
  return response.json();
};

export const fetchEpisodeCharacters = async (episodeId: number) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/episode/${episodeId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch episode characters");
  }
  const data = await response.json();
  console.log(data);
  const characterPromises = data.characters.map((url: string) =>
    fetch(url).then((res) => res.json())
  );
  return {
    name: data?.name,
    characters: await Promise.all(characterPromises),
  };
};
