import axios from "axios";
import { API_BASE_URL } from "../environment";

export interface FolderResponse {
  success: boolean;
  message: string;
  error: unknown;
  result: SingleFolder[];
}

export interface SingleFolder {
  _id: string;
  folderName: string;
  parentFolderId: string;
  subFolders: SingleFolder[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getFolders = () => {
  return {
    api() {
      return axios
        .get<FolderResponse>(`${API_BASE_URL}/folder`)
        .then(({ data }) => data);
    },
    getKey() {
      return ["getFolders"];
    },
  };
};

export interface NewFolder {
  folderName: string;
  parentFolderId: string;
}

export const createNewFolder = () => {
  return {
    api(input: NewFolder) {
      return axios
        .post(`${API_BASE_URL}/folder`, input, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ["createNewFolder"];
    },
  };
};

export const deleteFolder = () => {
  return {
    api(id: string) {
      return axios
        .delete(`${API_BASE_URL}/folder/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => data);
    },
    getKey() {
      return ["deleteFolder"];
    },
  };
};
