/*
  Warnings:

  - You are about to drop the column `Desc` on the `Art` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Art" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Art_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Art" ("createdAt", "id", "imageUrl", "title", "updatedAt", "userId") SELECT "createdAt", "id", "imageUrl", "title", "updatedAt", "userId" FROM "Art";
DROP TABLE "Art";
ALTER TABLE "new_Art" RENAME TO "Art";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
