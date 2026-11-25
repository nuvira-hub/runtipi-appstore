import { expect, test, describe } from "bun:test";
import { appInfoSchema } from "@runtipi/common/schemas";
import { type } from "arktype";
import jsyaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

const appsDir = path.join(process.cwd(), "apps");
const apps = fs.readdirSync(appsDir).filter((app) => fs.statSync(path.join(appsDir, app)).isDirectory());
const read = (app: string, file: string) => {
  const p = path.join(appsDir, app, file);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : null;
};

describe("each app has the required files", () => {
  for (const app of apps) {
    for (const file of ["config.json", "docker-compose.yml", "metadata/logo.jpg", "metadata/description.md"]) {
      test(`${app}: ${file}`, () => expect(read(app, file)).not.toBeNull());
    }
  }
});

describe("each app has a valid config.json", () => {
  for (const app of apps) {
    test(app, () => {
      const config = JSON.parse(read(app, "config.json") || "{}");
      const parsed = appInfoSchema.omit("urn")(config);
      if (parsed instanceof type.errors) console.error(`${app}/config.json: ${parsed.summary}`);
      expect(parsed instanceof type.errors).toBe(false);
      expect(config.id).toBe(app);
      expect(config.dynamic_config).toBe(true);
    });
  }
});

describe("each app has a valid docker-compose.yml", () => {
  for (const app of apps) {
    test(app, () => {
      const compose = jsyaml.load(read(app, "docker-compose.yml") || "") as any;
      const config = JSON.parse(read(app, "config.json") || "{}");
      expect(compose["x-runtipi"]?.schema_version).toBe(2);
      const services = Object.entries(compose.services || {}) as [string, any][];
      const main = services.filter(([, s]) => s["x-runtipi"]?.is_main);
      expect(main.length).toBe(1);
      expect(Number(main[0][1]["x-runtipi"].internal_port)).toBeGreaterThan(0);
      for (const [name, s] of services) {
        // Images are pinned to a version, never "latest".
        expect(s.image, name).toMatch(/:[0-9][^:]*$/);
        if (s.image.includes("nuvira-server")) expect(s.image.endsWith(`:${config.version}`)).toBe(true);
      }
    });
  }
});
