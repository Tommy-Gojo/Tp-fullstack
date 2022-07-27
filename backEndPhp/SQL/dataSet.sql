
-- DATA SET

INSERT INTO 
    `monster`(
        name_monster,
        life_monster,
        att_monster,
        def_monster,
        img_monster
    ) VALUES (
        "le baveu",
        140,
        15,
        6,
        "barzork_brave.png"
    ),(
        "le chetif",
        70,
        25,
        3,
        "barzork_chetif.png" 
    ),(
        "le bourrin",
        140,
        14,
        0,
        "barzork_bourrin.png"
    ),(
        "l'invisible",
        40,
        35,
        0,
        "barzork_invisible.png"
    );

INSERT INTO
    `boss`(
        name_boss,
        life_boss,
        att_boss,
        def_boss,
        img_boss
    ) VALUE (
        "l'admin",
        180,
        45,
        50,
        "barzork_admin.png"
    );
    
INSERT INTO
    `class`(
        name_class,
        life_class,
        att_class, 
        def_class, 
        img_class 
    ) VALUES (
        "Guerrier",
        100,
        60,
        3,
        ""
    );

INSERT INTO 
    `high_score`(
        player_name_high_score, 
        score_high_score,
        id_class, 
        date_high_score
    ) VALUES (
        "Guilhaume",
        82,
        1,
        '2022-06-10 09:27:54'
    ),(
        "Ruben",
        28,
        1,
        '2022-06-10 09:53:12'
    ),(
        "Tommy",
        54,
        1,
        '2022-06-10 09:12:30'
    ),(
        "Aycan",
        32,
        1,
        '2022-06-10 19:37:54'
    ),(
        "Fanny",
        99,
        1,
        '2022-06-10 14:00:00'
    ),(
        "Eric",
        20,
        1,
        '2022-04-10 12:10:40'
    )
    
-- ["le baveu", 140, 15, 6, "img/barzork_brave.png"],
-- ["le chetif", 70, 25, 3, "img/barzork_chetif.png"],
-- ["le bourrin", 140, 14, 0, "img/barzork_bourrin.png"],
-- ["l'invisible", 40, 35, 0, "img/barzork_invisible.png"],
-- ["l'admin", 180, 45, 50, "img/barzork_admin.png"],
