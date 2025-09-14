# Câu hỏi thường gặp

## Làm thế nào với các file nhiều cấp?

```javascript
const files = import.meta.glob(`@/app/views/*/**/*.vue`, { eager: true });
```
