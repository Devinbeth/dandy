create table if not exists users (
    id serial primary key,
    username varchar(180) not null,
    first_name varchar(180),
    last_name varchar(180),
    profile_picture text,
    facebook_auth text,
    github_auth text,
    google_auth text,
    microsoft_auth text,
);

select * from users;
