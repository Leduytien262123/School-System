---
outline: deep
---

# Ví dụ về API Runtime

Trang này trình bày cách sử dụng một số API runtime do VitePress cung cấp.

API chính `useData()` có thể được sử dụng để truy cập dữ liệu site, theme và trang cho trang hiện tại. Nó hoạt động trên cả file `.md` và `.vue`:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
