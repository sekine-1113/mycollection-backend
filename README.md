
# README

/api/v1
認証
/auth/signup
/auth/signin
/auth/me

ユーザ
GET /users/me
PUT /users/me
DELETE /users/me
GET /users/me/logins
GET /users/me/posts
GET /users?query=name
GET /users/:publicId
GET /users/:publicId/posts

コンテンツ
GET /posts?query=name
POST /posts
GET /posts/:id
PUT /posts/:id
DELETE /posts/:id

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
