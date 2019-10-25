# camelcase-actions


## Usage

```
npx power-select-deprecation-codemod camelcase-actions path/of/files/ or/some**/*glob.hbs

# or

yarn global add power-select-deprecation-codemod
power-select-deprecation-codemod camelcase-actions path/of/files/ or/some**/*glob.hbs
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.hbs](transforms/camelcase-actions/__testfixtures__/basic.input.hbs)</small>):
```hbs
{{power-select onchange=(action "foo") onclose=(action this.bar) onopen=(action (mut this.manager))}}

{{#power-select onchange=(action "foo") onclose=(action this.bar) onopen=(action (mut this.manager))}}
  {{some-other-component onchange=(action "foo")}}
{{/power-select}}

<PowerSelect onchange={{this.someValue}} @onclose={{action this.bar}} @onopen={{action (mut this.manager)}} />
<PowerSelect @onotherAction={{this.dontchange}} onchange={{this.someValue}} @onclose={{action this.bar}} @onopen={{action (mut this.manager)}}>
  <SomeOtherComponent @onchange={{action "foo"}} />
</PowerSelect>

```

**Output** (<small>[basic.output.hbs](transforms/camelcase-actions/__testfixtures__/basic.output.hbs)</small>):
```hbs
{{power-select onChange=(action "foo") onClose=(action this.bar) onOpen=(action (mut this.manager))}}

{{#power-select onChange=(action "foo") onClose=(action this.bar) onOpen=(action (mut this.manager))}}
  {{some-other-component onchange=(action "foo")}}
{{/power-select}}

<PowerSelect onchange={{this.someValue}} @onClose={{action this.bar}} @onOpen={{action (mut this.manager)}} />
<PowerSelect @onotherAction={{this.dontchange}} onchange={{this.someValue}} @onClose={{action this.bar}} @onOpen={{action (mut this.manager)}}>
  <SomeOtherComponent @onchange={{action "foo"}} />
</PowerSelect>

```
<!--FIXTURES_CONTENT_END-->
