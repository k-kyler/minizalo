create table "Users"
(
    "UserId"    uuid                     not null
        constraint "PK_Users"
            primary key,
    "UserName"  varchar(100)             not null,
    "Avatar"    text,
    "Email"     text                     not null,
    "Password"  text                     not null,
    "CreatedAt" timestamp with time zone not null
);

alter table "Users"
    owner to postgres;

INSERT INTO public."Users" ("UserId", "UserName", "Avatar", "Email", "Password", "CreatedAt") VALUES ('9661b17e-443d-48f6-bf1c-54291be7ad62', 'Quang Khai', '66368949.png', 'addaddad45@gmail.com', '$2a$11$JRfvbyXsBJNAN5JeV7fZuOt4PXofrtuKj6DuhDzPPhzYeB1lSeieq', '2021-11-13 11:18:22.866000 +00:00');
INSERT INTO public."Users" ("UserId", "UserName", "Avatar", "Email", "Password", "CreatedAt") VALUES ('99221c4b-1853-4740-a3e2-bcb82f5c2f7a', 'Vinh Khang', '148400239_1787160114795979_1608361134727682530_n.jpg', 'vinhkhang1969@gmail.com', '$2a$11$p3tM3Mg2DNfRXoqUAbG0fuq8Kr27.zGMLH8mIdHJK5lpOkr4zhbV2', '2021-11-12 10:26:58.743000 +00:00');
INSERT INTO public."Users" ("UserId", "UserName", "Avatar", "Email", "Password", "CreatedAt") VALUES ('1703caf4-4172-43d5-9ce5-100517f5d62f', 'Thuan Long', '67281185_1144370339104288_4585592498671321088_n.jpg', 'lungyu1810@gmail.com', '$2a$11$/hDERghfvdV5gUs7YmxwYekLf3Wr6HrdiDNNLUCu84jz5/1BBYVFi', '2021-11-12 10:23:51.897000 +00:00');