## POST : /auth/login

<details>
<summary>로그인</summary>
<div markdown="1">

응답 : 202

```
{
    "email",
    "password",
}
```

</div>
</details>

<br>

## POST : /auth/signup

<details>
<summary>회원가입</summary>
<div markdown="1">

응답 : 201

```
{
    "email",
    "username",
    "password",
    "position",
}
```

</div>
</details>

<br>

## POST : /auth/logout

<details>
<summary>로그아웃</summary>
<div markdown="1">

응답 : 204

</div>
</details>

<br>

## GET : /auth/me

<details>
<summary>상태확인 요청</summary>
<div markdown="1">

응답 : 200

```
{
    "username",
    "position",
}
```

</div>
</details>

<br>
