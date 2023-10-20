import React from "react";

type Props = {
  handleClose: (e: React.MouseEvent<HTMLElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLElement>) => void;
};

export const DeleteFolder = ({ handleDelete, handleClose }: Props) => {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl">Delete Folder</h2>
      <p>Are You Sure?</p>
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
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
