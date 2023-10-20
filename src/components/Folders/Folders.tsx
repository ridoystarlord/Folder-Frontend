import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SingleFolder, getFolders } from "../../services/folders";
import { Folder } from "../Folder";

export const Folders = () => {
  const [subFolders, setSubFolders] = useState<SingleFolder[]>([]);

  const { api, getKey } = getFolders();
  const { data } = useQuery(getKey(), api, {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setSubFolders(data?.result);
    }
  }, [data]);

  return (
    <div className="py-5 px-10">
      {subFolders?.map((folder: SingleFolder, index: number) => (
        <Folder
          key={index}
          id={folder._id}
          name={folder.folderName}
          folders={folder.subFolders}
        />
      ))}
    </div>
  );
};
