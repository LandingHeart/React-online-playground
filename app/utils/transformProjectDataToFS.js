/**
 * Transforms a project data object from an API response
 * into the FileSystemTree structure.
 * @param {object} projectData - The raw data from the API.
 * @returns {FileSystemTree} - The structured file system object.
 */
export const transformProjectDataToFS = (projectData) => {
  if (!projectData || !projectData.files) {
    return {};
  }

  const fileSystemTree = {};

  for (const file of projectData.files) {
    const pathParts = file.path.split("/");
    let currentLevel = fileSystemTree;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const isFile = i === pathParts.length - 1;

      if (isFile) {
        currentLevel[part] = {
          file: {
            contents: file.content
          }
        };
      } else {
        if (!currentLevel[part]) {
          currentLevel[part] = {
            directory: {}
          };
        }
        currentLevel = currentLevel[part].directory;
      }
    }
  }

  return fileSystemTree;
};
