FROM postgres

ENV POSTGRES_DB my_database

COPY 1.UrlTable.sql /docker-entrypoint-initdb.d/