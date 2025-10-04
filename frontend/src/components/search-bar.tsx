export default function SearchBar({
    search,
    setSearch,
}: {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search-bar"
            type="text"
            placeholder="Search..."
        />
    );
}
