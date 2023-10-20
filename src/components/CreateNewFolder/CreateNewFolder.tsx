import React from "react";

type Props = {
  handleClose: (e: React.MouseEvent<HTMLElement>) => void;
  handleCreate: (e: React.MouseEvent<HTMLElement>) => void;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
};

export const CreateNewFolder = ({
  handleCreate,
  handleClose,
  setFolderName,
  folderName,
}: Props) => {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl">Create New Folder</h2>
      <form className="space-y-3">
        <input
          className="border w-full px-3 py-2"
          type="text"
          placeholder="Enter Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className="flex gap-4 justify-end items-center text-white">
          <button
            className="bg-red-400 rounded px-3 py-1"
            type="reset"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 rounded px-3 py-1"
            type="submit"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
