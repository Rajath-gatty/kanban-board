import React from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
    return (
        <div className="border rounded-md border-gray-300 flex items-center gap-2">
            <div className="pl-3">
                <SearchIcon className="text-gray-400" />
            </div>
            <input
                type="text"
                className="h-full w-full p-3 rounded-md"
                placeholder="Search"
                name="search"
                id="search"
            />
        </div>
    );
};

export default Search;
