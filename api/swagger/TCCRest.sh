java -jar swagger-codegen-cli.jar generate \
  -i swagger.json \
  -l jaxrs \
  -o tccswagger \
  -c TCCRestConf.json