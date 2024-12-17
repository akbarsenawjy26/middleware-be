model_name = 
model_attributes = 
model_path =
seed_name =
seed_path =

#MODEL
generate-model:
	@echo "Generating model $(model_name) with attributes $(model_attributes)..."
	npx sequelize-cli model:generate --name $(model_name) --attributes $(model_attributes)

#MIGRATION
migration:
	@echo "Migrating All Models"
	npx sequelize-cli db:migrate

migration-undo:
	@echo "Undo Migration Model"
	npx sequelize-cli db:migrate:undo:all

migration-undo-specific:
	@echo "Undo Migration to $(model_path)"
	npx sequelize-cli db:migrate:undo:all --to $(model_path)

#SEED
generate-seed:
	@echo "Generating Seed $(seed_name)"
	npx sequelize-cli seed:generate --name $(seed_name)

seed-running:
	@echo "Running All Seeds"
	npx sequelize-cli db:seed:all

seed-undo:
	@echo "Undo Seed One Step"
	npx sequelize-cli db:seed:undo

seed-undo-specific:
	@echo "Undo Seed to $(seed_path)"
	npx sequelize-cli db:seed:undo --seed $(seed_path)

seed-undo-all:
	@echo "Undo All Seed"
	npx sequelize-cli db:seed:undo:all