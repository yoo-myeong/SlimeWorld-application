## GET : /slime

<details>
<summary>게시물 가져오기</summary>
<div markdown="1">

응답 : 201

```
[
    {
        "id": 1,
        "createdAt",
        "title",
        "media",
        "mediaURL",
        "description",
        "saleSite",
        "userId",
    }, ...
]
```

</div>
</details>

<br>

## POST : /slime

<details>
<summary>이미지 게시물 업로드</summary>
<div markdown="1">

요청 :

```
{
    "title" ,
    "media",
    "image" ,
    "description" ,
    "saleSite",
    "options",
}
```

응답 : 200

</div>
</details>

<details>
<summary>비디오 게시물 업로드</summary>
<div markdown="1">

요청 :

```
{
    "title" ,
    "media",
    "mediaURL" ,
    "description" ,
    "saleSite",
    "options",
}
```

응답 : 200

</div>
</details>

<br>

## DELETE : /slime/:id

<details>
<summary>게시물 삭제</summary>
<div markdown="1">

응답 : 204

</div>
</details>

<br>

## GET : /tag/:id

<details>
<summary>게시물 태그 가져오기</summary>
<div markdown="1">

응답 : 200

```
[
    {
        "option"
    }, ...
]
```

</div>
</details>
