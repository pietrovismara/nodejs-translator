# nodejs-translator

A simple script to translate json files from any language to any language using Microsoft Translator Api.

### Setup

- Download the package
- Run `npm install`
- If you haven't already, create a translator app following instructions [here](https://msdn.microsoft.com/en-us/library/hh454950.aspx). It's free up to 2000000 characters translated per month.
- P.S: They don't specify it, but the client_id you set MUST be alphanumerical to work.
- Add your keys to the `settings.json` file.

<hr>

nodejs-translator supports json files composed like this:

```json
{
    "KEY": "string to translate"
}
```

It also supports namespaced keys:

```json
{
    "KEY": "string to translate",
    "NAMESPACED_KEYS": {
        "SUB_KEY": "another string to translate"
    }
}
```

You can run the script by
`node translator.js <input_file_path> <input_language> <output_language> <output_folder_path>`

If no `output_folder_path` is specified, the resulting json will be saved in the `output` folder.
