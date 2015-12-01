# ngOptions VS ngRepeat

🔗 [docs.angularjs.org/api/ng/directive/select](https://docs.angularjs.org/api/ng/directive/select)


## Performance

> In many cases, `ngRepeat` can be used on `<option>` elements instead of `ngOptions` to achieve a similar result. However, `ngOptions` provides some benefits, such as more flexibility in how the `<select>`'s model is assigned via the select as part of the comprehension expression, and **additionally in reducing memory and increasing speed by not creating a new scope for each repeated instance.**

You can get away with using `ngRepeat` for small lists but, for larger lists use `ngOptions`.


## Non-String Model

> Note that the value of a select directive used without `ngOptions` is always a string. When the model needs to be bound to a non-string value, you must either explicitly convert it using a directive (see example below) or use `ngOptions` to specify the set of options. This is because an option element can only be bound to string values at present.


🔗 Conversion directive example [plnkr.co/edit/Gub8jt9Hw0IcEFbjQyVg](http://plnkr.co/edit/Gub8jt9Hw0IcEFbjQyVg?p=preview)


🔗 Non-string model example [codepen.io/winkerVSbecks/pen/wKLOQo](http://codepen.io/winkerVSbecks/pen/wKLOQo?editors=101)