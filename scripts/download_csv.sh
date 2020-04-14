#!/bin/sh

curl https://covid19.isciii.es/resources/serie_historica_acumulados.csv --output public/data/dada.csv
echo "export default \"$(date -r public/data/dada.csv)\"" > src/last_updated.ts