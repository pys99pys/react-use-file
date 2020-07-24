# react-use-file

File object management with react hooks

### Demo

click [here](https://pys99pys.github.io/demo-pages/?page=react-use-file)

### Usage

##### add package

```
$ yarn add react-use-file
```

##### use

```
const App: React.FC = () => {
  const [onSlelect, files, results] = useFile({
    // options
  });

  return (
    <div>
      // file selector button
      <button onClick={onSlelect}>Select file</button>

      // preview images
      <ul>
        {results.map((result) => (
          <li key={result}>
            <img src={result} alt="result" />
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Options

| option name | type    | default | description             |
| ----------- | ------- | ------- | ----------------------- |
| multiple    | boolean | false   | multiple file selection |
| accept      | string  | ''      | file extentions         |
