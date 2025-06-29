
# README

/api/v1
認証
/auth/signup
/auth/signin
/auth/signout
/auth/refresh
/auth/me

+ /auth/change-password
+ /auth/forgot-password
+ /auth/verify-email
+ /auth/oauth/:provider

ユーザ
GET /users/me
PUT /users/me
POST /users/me/password
GET /users?query=name
GET /users/:publicId
GET /users/:publicId/posts
DELETE /users/me
GET /users/me/profile
PUT /users/me/profile
GET /users/me/logins

コンテンツ
GET /posts?query=name
POST /posts
GET /posts/:id
DELETE /posts/:id
PUT /posts/:id

通報
POST /reports

お問い合わせ
POST /contact

管理者
GET /admin/users/:id/logins
GET /admin/users
PUT /admin/users/:id/ban
GET /admin/contact
GET /admin/reports
DELETE /admin/posts/:id
