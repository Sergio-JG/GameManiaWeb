import { useEffect, useState, useRef } from 'react';
import { Grid, InputBase, IconButton, Stack, ListItem, Paper } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import GameInterface from '../interfaces/GameInterface';

const searchStyles: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '5px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative', // To position the search results relative to the search bar
};

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<GameInterface[]>([]);
    const [games, setGames] = useState<GameInterface[]>([]);
    const [showResults, setShowResults] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);

        const filteredResults = games.filter((game: GameInterface) =>
            game.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
        setShowResults(!!searchQuery); // Show results if there's a search query
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowResults(false); // Close search results if clicked outside the container
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/game');
                if (!response.ok) {
                    throw new Error('ERROR');
                }
                const result = await response.json();
                setGames(result);
            } catch (error) {
                console.error('ERROR fetching data:', error);
            }
        };

        fetchData();

        // Attach event listener when the component mounts
        document.body.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <Grid item xs={4}>
            <div style={searchStyles} ref={searchRef}>
                <InputBase
                    sx={{ marginInlineStart: 2 }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search' }}
                    style={{ width: '100%' }}
                    onChange={handleSearch}
                    value={query}
                />
                <IconButton aria-label="search">
                    <Search />
                </IconButton>
            </div>
            {showResults && (
                <div style={{ position: 'absolute', top: '70%', left: 0, right: 0, width: 1248, paddingInlineStart: 635 }}>
                    <Paper>
                        <Stack spacing={2}>
                            {results.map((game: GameInterface) => (
                                <ListItem key={game.gameId}>
                                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/game/${game.gameId}`}>{game.title}</Link>
                                </ListItem>
                            ))}
                        </Stack>
                    </Paper>
                </div>
            )}
        </Grid>
    );
};

export default SearchComponent;