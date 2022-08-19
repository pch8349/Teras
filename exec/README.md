# 배포환경

## JVM 버전

### 1.8 Julu

## AWS 진행 사항

### 기본 설정
방화벽 설정(ssh 허용, 방화성 활성화)
* sudo ufw allow ssh
* sudo ufw enable

***

### nginx
nginx 설치
* sudo apt-get install nginx

nginx 설정
* sudo vi /etc/nginx/sites-available/default
```
server_name localhost teras.site www.teras.site;
``` 

nginx 명령어
* 재부팅    : sudo service nginx reload
* 중지      : sudo systemctl stop nginx
* 시작      : sudo systemctl start nginx
* 재시작    : sudo systemctl restart nginx
* 비활성화  : sudo systemctl disable nginx
* 활성화    : sudo systemctl enable nginx

***

### https

certbot 설치
* sudo snap install --classic certbot

방화벽 설정
* sudo ufw allow 80/tcp

https 인증서 발급
* sudo certbot --nginx -d i7a706.p.ssafy.io

***

### mysql

mysql-server 설치
* sudo apt-get install mysql-server

방화벽 설정(mysql 허용)
* sudo ufw allow mysql
