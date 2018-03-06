create table if not exists characters (
    id serial primary key,
    user_id integer not null references users(id),
    name varchar(180),
    race integer not null references races(id),
    class integer not null references classes(id),
    level integer not null,
    experience_points integer not null,
    
);

select * from characters;
