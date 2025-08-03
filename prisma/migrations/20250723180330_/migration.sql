/*
  Warnings:

  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `User` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PostType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PostType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("caption", "createdAt", "id", "imageUrl", "userId") SELECT "caption", "createdAt", "id", "imageUrl", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRole" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("created_at", "email", "firebase_uid", "id", "public_id", "updated_at", "username") SELECT "created_at", "email", "firebase_uid", "id", "public_id", "updated_at", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_public_id_key" ON "User"("public_id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_firebase_uid_key" ON "User"("firebase_uid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PostType_public_id_key" ON "PostType"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_public_id_key" ON "UserRole"("public_id");
