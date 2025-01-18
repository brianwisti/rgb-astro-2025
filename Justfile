serve:
  npm run dev

build:
  npm run build
  mv dist/htaccess dist/.htaccess

local:
  cp -Rv dist/* /opt/homebrew/opt/httpd/docs/randomgeekery.test/

push:
  rsync --recursive --archive --update --verbose dist/ a2:public_html

links:
  linkcheck -e --skip-file=etc/linkcheck-skip.txt :8080

test:
  npm test
