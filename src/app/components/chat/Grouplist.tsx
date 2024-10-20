import { useState } from "react";
import Link from "next/link";

const GroupList = () => {
    const [groups, setGroups] = useState([
        "exercise",
        "sleep",
        "sunlight",
        "general health",
    ]);

    return (
        <div>
            {groups.map((group, index) => {
                return (
                    <Link
                        href={`/chatroom/${group}`}
                        key={index}
                        className="text-blue-500 underline mr-8 hover:text-blue-700"
                    >
                        {group}
                    </Link>
                );
            })}
        </div>
    );
};

export default GroupList;
