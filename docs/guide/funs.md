# Phương thức toàn cục

## Duyệt đệ quy cấu trúc cây

depthForEach

```javascript
depthForEach([], Function, (children = "children"));
```

## Xây dựng cấu trúc cây

buildTree: Xây dựng cấu trúc cây dựa vào id và pid

```javascript
buildTree([], id, pid);
```

## Thêm động route

addRoutes

```javascript
addRoutes(ctx, []);
```

## Lấy khóa mã hóa

getCrypto

```javascript
getCrypto({ iv, key });
```

## Mã hóa đối xứng

encrypt

```javascript
encrypt(str, iv, key);
```

## Giải mã đối xứng

decrypt

```javascript
decrypt(str, iv, key);
```

## Loại bỏ dấu gạch chéo lặp lại

removeRepeatBias

```javascript
removeRepeatBias(str, false); // Nếu truyền vào là đường dẫn liên kết
```

## Sao chép văn bản

clipboardCopy

```javascript
clipboardCopy(str);
```

## Khắc phục lỗi trình duyệt

browserPatch: Giải quyết lỗi sự kiện trình duyệt, chỉ cần gọi ở file entry

```javascript
browserPatch();
```

## Deep Clone (Sao chép sâu)

deepClone

```javascript
deepClone(obj);
```

## Deep Merge (Hợp nhất sâu)

deepMerge

```javascript
deepMerge(target, source);
```

## Thêm tham số vào URL mà không reload

addParamsToUrl

```javascript
addParamsToUrl(url, params);
```
