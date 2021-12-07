create table "Inboxes"
(
    "InboxId"    uuid      not null
        constraint "PK_Inboxes"
            primary key,
    "Name"       text,
    "CreatedAt"  timestamp not null,
    "Background" text,
    "Type"       text      not null,
    "OwnerId"    text,
    "MemberIds"  uuid[]
);

alter table "Inboxes"
    owner to postgres;

INSERT INTO public."Inboxes" ("InboxId", "Name", "CreatedAt", "Background", "Type", "OwnerId", "MemberIds") VALUES ('0edde4ba-c003-4bc7-9ae4-8b33ce3cd07f', '', '2021-11-15 08:03:56.241000', '', 'personal', '', '{9661b17e-443d-48f6-bf1c-54291be7ad62,1703caf4-4172-43d5-9ce5-100517f5d62f}');
INSERT INTO public."Inboxes" ("InboxId", "Name", "CreatedAt", "Background", "Type", "OwnerId", "MemberIds") VALUES ('9a49f5a1-426a-4c2b-b2a8-a07d3e89ac91', '', '2021-11-15 08:03:30.241000', '', 'personal', '', '{9661b17e-443d-48f6-bf1c-54291be7ad62,99221c4b-1853-4740-a3e2-bcb82f5c2f7a}');
INSERT INTO public."Inboxes" ("InboxId", "Name", "CreatedAt", "Background", "Type", "OwnerId", "MemberIds") VALUES ('48334e6d-af86-4c6c-8d17-65483ea86760', 'kkyler and his friends', '2021-11-15 11:37:38.702000', '9cbe5b3c392910f8729bb8871c2c35cf.png', 'group', '9661b17e-443d-48f6-bf1c-54291be7ad62', '{9661b17e-443d-48f6-bf1c-54291be7ad62,99221c4b-1853-4740-a3e2-bcb82f5c2f7a,1703caf4-4172-43d5-9ce5-100517f5d62f}');
INSERT INTO public."Inboxes" ("InboxId", "Name", "CreatedAt", "Background", "Type", "OwnerId", "MemberIds") VALUES ('acbf4b18-0014-44e3-8a1c-8ad536cbc0ee', 'wolf gang', '2021-12-04 00:03:48.913090', 'wolf-moon-210348908.png', 'group', '9661b17e-443d-48f6-bf1c-54291be7ad62', '{99221c4b-1853-4740-a3e2-bcb82f5c2f7a,1703caf4-4172-43d5-9ce5-100517f5d62f,9661b17e-443d-48f6-bf1c-54291be7ad62}');
INSERT INTO public."Inboxes" ("InboxId", "Name", "CreatedAt", "Background", "Type", "OwnerId", "MemberIds") VALUES ('35cb61d7-420e-4322-b91c-44e3b0c34fd7', 'My friends', '2021-12-07 19:12:52.239832', 'astronaut-211252238.png', 'group', '9661b17e-443d-48f6-bf1c-54291be7ad62', '{99221c4b-1853-4740-a3e2-bcb82f5c2f7a,9661b17e-443d-48f6-bf1c-54291be7ad62}');
INSERT INTO public."Inboxes" ("InboxId", "Name", "CreatedAt", "Background", "Type", "OwnerId", "MemberIds") VALUES ('2ef1a192-08b8-4645-9e12-600bb18e0e85', null, '2021-12-07 19:41:03.753371', 'No background', 'personal', null, '{1703caf4-4172-43d5-9ce5-100517f5d62f,99221c4b-1853-4740-a3e2-bcb82f5c2f7a}');