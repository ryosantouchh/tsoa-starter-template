import { FileMigrationProvider, Migrator } from "kysely";
import { promises as fs } from "fs";
import path from "path";
import { db } from './kysely'

async function runner() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.resolve("src/infra/database/migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  if (!error && results && results.length === 0) {
    console.log(`everything is up to date, there is no migrations to run`);
  }

  results?.forEach((r) => {
    if (r.status === "Success") {
      console.log(`migration "${r.migrationName}" ran successfully`);
    } else if (r.status === "Error") {
      console.error(`migration "${r.migrationName}" failed`);
    }
  });

  if (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  await db.destroy();
}

runner();
