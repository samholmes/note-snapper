import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function (props) {
  const { onClearStorage } = props

  return (
    <nav className="flex items-center w-screen bg-blue-500 text-white font-bold p-2">
      <Link to="/" className="p-4">
        Note Snapper
      </Link>
      <div className="grow"></div>
      <div
        className="flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-xl"
        onClick={() => onClearStorage()}
      >
        Clear Storage
      </div>
      <Link
        to="/camera"
        className="flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-xl"
      >
        <PlusIcon className="w-6 h-6 text-white" />
        New Snap
      </Link>
    </nav>
  );
}
