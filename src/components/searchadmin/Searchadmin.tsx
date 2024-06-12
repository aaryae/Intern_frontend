import { useEffect, useState } from "react";

interface searchtype {
    handlesearchfunction: (searchdata: string) => void

}

const SearchAdmin = ({ handlesearchfunction }: searchtype) => {
    const useDebounce = (inputValue: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(inputValue);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(inputValue);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [inputValue, delay]);

        return debouncedValue;
    };

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 1000);

    useEffect(() => {
        handlesearchfunction(debouncedSearchValue)
    }, [debouncedSearchValue, handlesearchfunction])

    const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)

    };





    return (
        <div className="flex w-full justify-end">
            <div className="m-4 border">
                <div className="relative">
                    <div className="absolute inset-y-0 flex items-center p-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm"
                        placeholder="Search for Users."
                        value={searchValue}
                        onChange={handleUserSearch}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchAdmin;
