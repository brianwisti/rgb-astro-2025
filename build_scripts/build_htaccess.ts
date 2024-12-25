import fs from "node:fs";
import glob from "fast-glob";
import * as matter from "gray-matter";

const contentDir = "src";
const contentFiles = await glob(`${contentDir}/**/*.mdoc`);

const aliases = contentFiles
  .map((file: string) => {
    const text = fs.readFileSync(file, "utf8");
    const { data: frontMatter } = matter.default(text);
    const aliases = frontMatter.aliases;

    if (aliases === undefined) {
      return [];
    }

    const permalink = file
      .replace(`${contentDir}/`, "")
      .replace(/\.mdoc?$/, "/")
      .replace("posts/", "/post/");

    const directives = aliases
      .filter((alias: string) => alias !== permalink)
      .map((alias: string) => `Redirect 301 ${alias} ${permalink}`);
    return directives;
  })
  .flat();
console.log(`Adding ${aliases.length} redirects`);
const htaccess = aliases.join("\n");
fs.writeFileSync("dist/.htaccess", htaccess);
