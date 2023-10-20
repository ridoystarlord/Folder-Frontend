import { useState } from "react";
import {
  NewFolder,
  SingleFolder,
  createNewFolder,
  deleteFolder,
} from "../../services/folders";
import { BiFolderPlus } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "../Modal";
import { CreateNewFolder } from "../CreateNewFolder";
import { DeleteFolder } from "../DeleteFolder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { isAxiosError } from "../../utils/defaultQueryClient";
import toast from "react-hot-toast";

type Props = {
  id: string;
  name: string;
  folders: SingleFolder[];
};

export const Folder = ({ id, name, folders }: Props) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [parentId, setParentId] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");
  const [showCreateNewFolderModal, setShowCreateNewFolderModal] =
    useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleCreateNewModalClose = () => {
    setFolderName("");
    setShowCreateNewFolderModal(false);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const { api: createNewFolderAPI } = createNewFolder();
  const { mutateAsync } = useMutation(createNewFolderAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      handleCreateNewModalClose();
    },
    onError: (err: Error | AxiosError<unknown>) => {
      if (isAxiosError(err)) {
        toast.error(err.message, {
          id: "error-adding-folder",
        });
      }
    },
  });
  const { api: deleteFolderAPI } = deleteFolder();
  const { mutateAsync: deleteMutateAsync } = useMutation(deleteFolderAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      handleCloseDeleteModal();
    },
    onError: (err: Error | AxiosError<unknown>) => {
      if (isAxiosError(err)) {
        toast.error(err.message, {
          id: "error-deleting-folder",
        });
      }
    },
  });

  const handleCreateFolder = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const data: NewFolder = {
      parentFolderId: parentId,
      folderName: folderName,
    };
    toast.promise(
      mutateAsync(data),
      {
        loading: "Creating Folder",
        success: "Folder Created successful!",
        error: "Error! creating Folder",
      },
      {
        id: "creating-folder",
      }
    );
  };
  const handleDelete = () => {
    toast.promise(
      deleteMutateAsync(parentId),
      {
        loading: "Deleting Folder",
        success: "Folder Deleted successful!",
        error: "Error! Deleting Folder",
      },
      {
        id: "deleting-folder",
      }
    );
  };

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="ml-4">
        <div
          onClick={toggleFolder}
          className="cursor-pointer flex items-center gap-10"
        >
          <div>
            {isOpen ? "📂" : "📁"} {name}
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center"
              onClick={() => {
                setParentId(id);
                setShowCreateNewFolderModal(true);
              }}
            >
              <BiFolderPlus />
            </button>
            {name !== "Root" && (
              <button
                onClick={() => {
                  setParentId(id);
                  setShowDeleteModal(true);
                }}
              >
                <AiOutlineDelete className="createNewFolderBtn" />
              </button>
            )}
          </div>
        </div>
        {isOpen && folders && (
          <div className="ml-4">
            {folders.map((folder, index) => (
              <Folder
                key={index}
                id={folder._id}
                name={folder.folderName}
                folders={folder.subFolders}
              />
            ))}
          </div>
        )}
      </div>
      <Modal
        show={showCreateNewFolderModal}
        handleClose={handleCreateNewModalClose}
      >
        <CreateNewFolder
          handleCreate={handleCreateFolder}
          handleClose={handleCreateNewModalClose}
          folderName={folderName}
          setFolderName={setFolderName}
        />
      </Modal>
      <Modal show={showDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteFolder
          handleDelete={handleDelete}
          handleClose={handleCloseDeleteModal}
        />
      </Modal>
    </>
  );
};
