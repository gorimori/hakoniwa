# insert-tag

insert a tag to string

```typescript
import { insertTag } from "./insertTag";
// <strong>hoge</strong>
insertTag("hoge", {
  open: "<strong>",
  close: "</strong>",
  startIndex: 0,
  endIndex: 4,
});
```
