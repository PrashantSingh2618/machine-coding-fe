export type FileSystemNode = {
  name: string;
  type: string;
  children?: FileSystemNode[]; // Only present if type is "folder"
};
