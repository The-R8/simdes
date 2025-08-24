CREATE TABLE "villagers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "villagers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nik" varchar(16) NOT NULL,
	"name" varchar(100) NOT NULL,
	"alamat" text NOT NULL,
	"rt" integer NOT NULL,
	"rw" integer NOT NULL,
	"desa_id" integer NOT NULL,
	"jk" "jk",
	"tanggal_lahir" date NOT NULL,
	"agama_id" integer NOT NULL,
	"tempat_lahir" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"upadted_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "villagers_nik_unique" UNIQUE("nik")
);
