-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isProcessing" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "caption" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "post_source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "public_id" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "post_source_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "post_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "post_source_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isProcessing" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "report_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_profile" (
    "user_id" INTEGER NOT NULL,
    "icon_url" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "deleted_user" (
    "firebase_uid" TEXT NOT NULL,
    "deleted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "deleted_user_firebase_uid_fkey" FOREIGN KEY ("firebase_uid") REFERENCES "user" ("firebase_uid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_login_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "logged_in_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_login_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "post_type_public_id_key" ON "post_type"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_public_id_key" ON "post"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_source_public_id_key" ON "post_source"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_public_id_key" ON "user"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_firebase_uid_key" ON "user"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_public_id_key" ON "user_role"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "deleted_user_firebase_uid_key" ON "deleted_user"("firebase_uid");
