import * as React from "react";

interface Options {
  multiple?: boolean;
  accept?: string;
}

type OnSelectType = (e: React.MouseEvent) => void;

type returnType = [OnSelectType, File[], string[]];

const { useState } = React;

export default ({ multiple, accept }: Options = {}): returnType => {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const removeElement = ($input: HTMLInputElement) => {
    $input.parentNode?.removeChild($input);
  };

  const onChange = async (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files?.length) return;

    const promises = [].map.call(
      files,
      (file: File) =>
        new Promise((resolve) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve([file, fileReader.result as string]);
          };
        })
    ) as Promise<[File, string]>[];

    const result = await Promise.all(promises);
    setFiles(result.map((arr) => arr[0]));
    setResults(result.map((arr) => arr[1]));
  };

  const onSelect: OnSelectType = (e) => {
    const $input = document.createElement("input");

    if (!!multiple) $input.multiple = multiple;
    if (!!accept) $input.accept = accept;

    $input.type = "file";
    $input.style.display = "none";
    $input.onchange = onChange;

    document.body.appendChild($input);
    $input.click();

    (e.currentTarget as HTMLElement).onblur = () => removeElement($input);
  };

  return [onSelect, files, results];
};
