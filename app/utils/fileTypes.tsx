// A node representing a file's contents
interface FileNode {
  file: {
    contents: string | Uint8Array;
  };
}

// A node representing a directory, which contains other nodes
interface DirectoryNode {
  directory: FileSystemTree;
}

// The core type for the file system: an object with string keys
// and values that are files, directories, or a string shorthand for file contents.
export interface FileSystemTree {
  [name: string]: DirectoryNode | FileNode | string;
}
