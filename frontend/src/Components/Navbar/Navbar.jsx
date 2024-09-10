import React from "react";
import { ArrowLeft, Settings, Share2 } from "lucide-react";
import Search from "./Search";
import Button from "../UI/Button";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center py-3 mb-4">
            <div className="flex items-center gap-6">
                <Button>
                    <ArrowLeft className="text-gray-400" />
                </Button>

                <div className="flex items-center gap-2">
                    <div>
                        <h2 className="text-gray-800 font-bold text-2xl">
                            Manage Tasks
                        </h2>
                        <div className="flex gap-2">
                            <span className="text-sm text-gray-400">
                                5 boards
                            </span>
                            <span className="text-sm text-gray-400">
                                24 members
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Search />
                <Button>
                    <Share2 className="text-gray-400" />
                </Button>
                <Button>
                    <Settings className="text-gray-400" />
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
