CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "signatures" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'NOW()',
	"delivery_id" integer NOT NULL,
	"is_canceled" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"plan_id" integer NOT NULL,
	CONSTRAINT "signatures_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "products" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "deliveries" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"cep" TEXT NOT NULL,
	"day" varchar(1) NOT NULL,
	"complement" TEXT,
	CONSTRAINT "deliveries_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"type" varchar(1) NOT NULL,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" uuid NOT NULL,
	"user_id" integer NOT NULL,
	"is_expired" BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orders" (
	"signature_id" integer NOT NULL,
	"product_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "signatures" ADD CONSTRAINT "signatures_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "signatures" ADD CONSTRAINT "signatures_fk1" FOREIGN KEY ("delivery_id") REFERENCES "deliveries"("id");
ALTER TABLE "signatures" ADD CONSTRAINT "signatures_fk2" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("signature_id") REFERENCES "signatures"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("id");







