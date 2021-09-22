import fs from "fs";
import path from "path";
function searchAFolder(folderPath: string) {
  return new Promise<fs.Dirent[]>((resolve, reject) => {
    fs.readdir(folderPath, {
      encoding: "utf-8",
      withFileTypes: true
    }, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
}

type FileType = "file" | "dir"
export interface IFileInfo {
  type: "file" | "dir"
  dirList: string[];//['abc','bbc'] // 不包含当前文件名的路径
  path: string;// abc/bbc/file.tsx
  name: string;// file.tsx
}

export async function deepTraverseFolder(folderPath: string, visitors: {
  file?: (info: IFileInfo) => void,
  dir?: (info: IFileInfo) => void
} = {}, curPaths: string[] = []) {
  const paths = await searchAFolder(path.join(folderPath, curPaths.join('/')));
  for (let i = 0; i < paths.length; i++) {
    const item = paths[i];
    let type: FileType | null = null
    if (item.isFile()) {
      type = 'file'
    } else if (item.isDirectory()) {
      type = 'dir'
    }
    if (type) {
      const pathList = [...curPaths];
      pathList.push(item.name)
      const info: IFileInfo = {
        type,
        dirList: [...curPaths],
        name: item.name,
        path: pathList.join('/')
      }
      const vistor = visitors[type];
      if (vistor) {
        vistor(info);
      }
      if (type === 'dir') {
        await deepTraverseFolder(folderPath, visitors, pathList)
      }
    }
  }
}

export async function getAllFiles(folderPath: string) {
  const fileList: IFileInfo[] = [];
  await deepTraverseFolder(folderPath, {
    file: (info) => {
      fileList.push(info)
    }
  })
  return fileList
}

export async function getFilesPathByExt(folderPath: string, extName: string) {
  const fileList = await getAllFiles(folderPath);
  return fileList
    .map((item) => {
      const extName = path.extname(item.name);
      return {
        ...item,
        extName,
      };
    })
    .filter((item) => {
      return item.extName === extName;
    })
    .map((item) => {
      const list = [...item.dirList];
      list.push(item.name.substr(0, item.name.length - item.extName.length));
      return list;
    });
}