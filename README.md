# ✍ 개요

슬라임 장난감 정보와 판매처를 공유하기 위한 슬라임 전용 SNS애플리케이션을 제작

---

# 🎯 설계 목표

- Express에 **TypeScript를 적용**해서 보다 안정적으로 프로그램을 설계
- **vanillaJS에 OOP를 적극 활용**하여 프론트엔드 웹앱 설계
- ec2, rds, s3 등 다양한 **AWS 서비스 활용**
- **GIT CLI를 사용**한 프로젝트 버전 관리

---

# 🛠 주요 기능

- VanilaJS만으로 제작한 **새로고침 없는 웹앱**
- **SSL**이 적용된 웹서비스
- **세션 쿠키**를 통한 로그인 상태 관리
- 게시물 **생성, 조회, 삭제**
- 게시물 **태그 조회**
- **클라우드 스토리지**에 이미지 저장, 조회, 삭제

---
# 😎 트러블슈팅

- [routing-controller와 typedi를 활용](https://github.com/yoo-myeong/SlimeWorld-application/pull/13)하여 DIP를 유지하면서 백엔드의 OOP 코드를 정돈
- [프로젝트의 express-mysql-session 패키지 코드를 분석 및 수정](https://velog.io/@c-on/TS-express-%EC%84%B8%EC%85%98-%EC%9D%B8%EC%A6%9D#%EC%98%A4%EB%A5%98-2-mysql%EC%97%B0%EB%8F%99-%EC%98%A4%EB%A5%98)해서 MySQL 8.0.과 호환시킴
- nginx를 사용하여 [ALB 리다이렉팅에서 발생하는 method오류 해결](https://velog.io/@c-on/AWS-nodeJS%EC%95%B1-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%97%B0%EA%B2%B0-%EB%B0%8F-SSL%EC%84%A4%EC%A0%95Route53Certificate-Manager%EB%A1%9C%EB%93%9C%EB%B0%B8%EB%9F%B0%EC%8B%B1NGINX#%EC%98%A4%EB%A5%98)

---

# ⚗ 배운 것

- `routing-controllers`와 `typedi`를 활용하여 **백엔드의 코드를 객체지향으로 프로그래밍**
- `vanilaJS`에 `의존성주입`을 적용하여 **컴포넌트의 재사용성을 고려**해보면서, `OOP`의 이점을 갖기 위해 어떻게 설계해야하는지 고민하고 공부할 수 있었음
- `ALB`, `route53`, `certicication`로 **SSL을 적용해서 보안성을 강화**
- `AWS S3`로 이미지 서버를 구축하고, `multer-s3`와 `aws-sdk` 를 사용해서 **요청받은 이미지를 클라우드 서버에 저장하고 조회**
- `express-session`과 `express-mysql-session`을 활용해서 MySQL을 세션저장소로 사용한 세션쿠키 로그인을 구현했고, **JWT와 세션쿠키 각각의 장단점과 차이를 이해**함
- 인스턴스에 `nginx`를 설치해서 프록시 서버로 사용하고 **http→https 리다이렉션 기능을 구현**
- `pm2`를 사용해서 aws 인스턴스에 **무중단 node.js서버 구축**
- `netlify`에 프론트엔드 프로젝트를 배포해보고 **배포자동화의 편리함을 경험**

---
