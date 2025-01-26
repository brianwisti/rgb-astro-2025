serve:
  npm run dev

prep: build index test

build:
  npm run build
  mv dist/htaccess dist/.htaccess

index:
  npx pagefind --site dist

local:
  docker compose up

push:
  rsync --recursive --archive --update --verbose dist/ a2:public_html

links:
  linkcheck --skip-file=etc/linkcheck-skip.txt :8080 > linkcheck.log

links-all:
  linkcheck -e --skip-file=etc/linkcheck-skip.txt :8080 > linkcheck.log

test:
  npm test
