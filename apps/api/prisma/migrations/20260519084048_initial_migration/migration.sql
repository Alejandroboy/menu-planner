-- CreateEnum
CREATE TYPE "meal_type" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "gramsPerUnit" DOUBLE PRECISION,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processing_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "processing_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "unitId" INTEGER NOT NULL,
    "gramsPerUnit" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "lossCold" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "lossFry" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "lossBoil" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "lossBake" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "portionWeightG" INTEGER,
    "defaultServings" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredients" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "grossWeightG" INTEGER NOT NULL,
    "applyColdProcessing" BOOLEAN NOT NULL DEFAULT true,
    "processingTypeId" INTEGER NOT NULL,

    CONSTRAINT "recipe_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_plans" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "menu_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_plan_items" (
    "id" SERIAL NOT NULL,
    "menuPlanId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "mealType" "meal_type",
    "servings" INTEGER NOT NULL,

    CONSTRAINT "menu_plan_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_name_key" ON "units"("name");

-- CreateIndex
CREATE UNIQUE INDEX "processing_types_name_key" ON "processing_types"("name");

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_processingTypeId_fkey" FOREIGN KEY ("processingTypeId") REFERENCES "processing_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_plan_items" ADD CONSTRAINT "menu_plan_items_menuPlanId_fkey" FOREIGN KEY ("menuPlanId") REFERENCES "menu_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_plan_items" ADD CONSTRAINT "menu_plan_items_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
