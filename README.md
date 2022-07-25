# Teras

## Git branch naming convention

 master
└─develop
    ├─backend
    │  ├─feature/be-login
    │  ├─feature/be-signup
    │  ├─classroom
    ├─frontend
    │  ├─feature/fe-login
    │  └─feature/fe-signup


## Git merge request naming convention

title : ex) [FE] merge feature/fe-login to frontend

* "Delete source branch when merge request is accepted" 항목 체크 시 merge시킨 원래 브런치 삭제됨

    더 이상 필요없는 브랜치일 경우만 체크!

## Git commit naming convention

[FE/BE] (구현한 기능) (동사)

ex) [BE] login api add / [FE] signup page css update
