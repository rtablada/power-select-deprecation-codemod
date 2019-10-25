# power-select-deprecation-codemod


A collection of codemod's to help work through Ember Power Select Deprecations

## Usage

To run a specific codemod from this project, you would run the following:

```
npx power-select-deprecation-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.hbs

# or

yarn global add power-select-deprecation-codemod
power-select-deprecation-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.hbs
```

## Transforms

<!--TRANSFORMS_START-->
* [camelcase-actions](transforms/camelcase-actions/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
