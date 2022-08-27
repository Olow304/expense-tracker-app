-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://gravatar.com/avatar/placeholder?s=200';
