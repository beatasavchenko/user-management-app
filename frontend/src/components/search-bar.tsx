type SearchBarProps = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar(props: SearchBarProps) {
    const { search, setSearch } = props;

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
