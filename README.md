# Apple health data export body mass to json
Node.js command line tool that reads body mass from Apple Health App XML export file and writes it to a JSON file. 

## Getting started

### Install

Install from the command line:

```
$ npm install @nikkiselev/apple-health-export-bodyweight-to-json@1.0.0
```

Install via package.json:

```
"@nikkiselev/apple-health-export-bodyweight-to-json": "1.0.0"
```

### Use

```
npx apple-health-data-body-mass-to-json --in export_cda.xml --out data.json
```

If the export file is too large, you might want to increase max memory size:

```
npx --node-arg=--max-old-space-size=8192 apple-health-data-body-mass-to-json --in export_cda.xml --out data.json
```


Note, that project doesn't have tests nor deal with the exceptions
