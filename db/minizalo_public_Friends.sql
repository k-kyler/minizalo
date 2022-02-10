create table "Friends"
(
    "FriendId"   uuid      not null
        constraint "PK_Friends"
            primary key,
    "BeFriendAt" timestamp not null,
    "UserRefId"  uuid      not null,
    "UserId"     uuid
        constraint "FK_Friends_Users_UserId"
            references "Users"
            on delete restrict
);

alter table "Friends"
    owner to postgres;

create index "IX_Friends_UserId"
    on "Friends" ("UserId");

INSERT INTO public."Friends" ("FriendId", "BeFriendAt", "UserRefId", "UserId", "ColumnId") VALUES ('99221c4b-1853-4740-a3e2-bcb82f5c2f7a', '2021-12-07 18:20:37.517008', '1703caf4-4172-43d5-9ce5-100517f5d62f', null, '2abc1bf9-6f50-4d2d-ab91-e53070a8dcdd');
INSERT INTO public."Friends" ("FriendId", "BeFriendAt", "UserRefId", "UserId", "ColumnId") VALUES ('99221c4b-1853-4740-a3e2-bcb82f5c2f7a', '2021-12-07 18:51:21.302772', '9661b17e-443d-48f6-bf1c-54291be7ad62', null, 'fdbfe07c-e195-429d-93ca-00551dec1116');