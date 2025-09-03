-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'FARMER');

-- AlterTable
ALTER TABLE "public"."admins" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "public"."farmers" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'FARMER';
