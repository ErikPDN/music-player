export const filterSongs = (searchQuery: string) => (track: any) =>
	track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
	track.artist?.toLowerCase().includes(searchQuery.toLowerCase())
