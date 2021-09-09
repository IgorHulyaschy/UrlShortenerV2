START TRANSACTION;
  create table url_data(
    id serial PRIMARY KEY ,
    url_code varchar NOT NULL ,
    long_url varchar NOT NULL ,
    short_url varchar NOT NULL
  );

COMMIT;