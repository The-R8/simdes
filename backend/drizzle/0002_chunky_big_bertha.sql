ALTER TABLE "villagers" ALTER COLUMN "jk" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."jk";--> statement-breakpoint
CREATE TYPE "public"."jk" AS ENUM('L', 'P');--> statement-breakpoint
ALTER TABLE "villagers" ALTER COLUMN "jk" SET DATA TYPE "public"."jk" USING "jk"::"public"."jk";