IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'[ie].[RecipeIngredient]') AND type in (N'U'))
BEGIN

	CREATE TABLE [ie].[RecipeIngredient] (
		[recipe_id] INT NOT NULL,
		[ingredient_id] INT NOT NULL,
		[unit_id] TINYINT NOT NULL,
		[amount] DECIMAL(7, 3) NOT NULL,
		[description] VARCHAR(255) NULL,
		CONSTRAINT [pk_ie_RecipeIngredient_recipe_id_ingredient_id] PRIMARY KEY ([recipe_id], [ingredient_id])
	)

END
GO

ALTER TABLE [ie].[RecipeIngredient] ADD CONSTRAINT [fk_ie_RecipeIngredient_recipe_id_recipe_id] FOREIGN KEY ([recipe_id]) REFERENCES [ie].[Recipe] ([id])
ALTER TABLE [ie].[RecipeIngredient] ADD CONSTRAINT [fk_ie_RecipeIngredient_ingredient_id_ingredient_id] FOREIGN KEY ([ingredient_id]) REFERENCES [ie].[Ingredient] ([id])
ALTER TABLE [ie].[RecipeIngredient] ADD CONSTRAINT [fk_ie_RecipeIngredient_unit_id_unit_id] FOREIGN KEY ([unit_id]) REFERENCES [ie].[Unit] ([id])