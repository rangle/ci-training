## Multiple Filter in Angular without using the Angular Filter

The multiple filter POC has been added to the gulp based project used as the `Project Ecosystem` example using two commits.

- [Filtering in angular without angular](https://github.com/rangle/ci-gulp-angular/commit/3751d86e6e8d9f6c49fa2fdcedbdf89f54ec59de) or `git checkout 3751d86e6e8d9f6c49fa2fdcedbdf89f54ec59de`
- [The Refactor](https://github.com/rangle/ci-gulp-angular/commit/03cf56d3fe24250894f18d60281025935881e6f7) or `git checkout 03cf56d3fe24250894f18d60281025935881e6f7`

At the end of this story we're left with a module which exposes a directive and uses a bunch of `value` `services` to provide data to a `multi-filter-list.service` which encapsulates all concerns of filtering based on the selected values and provides the filtered data to the controller.

The final wiring in [The Refactor](https://github.com/rangle/ci-gulp-angular/commit/03cf56d3fe24250894f18d60281025935881e6f7) commit can be considered a bit too excessive, as small pieces of data are scattered across multiple files, but it also serves as a good example of how angular apps can be modularized, if needed, so that data can be shared across multiple components.
