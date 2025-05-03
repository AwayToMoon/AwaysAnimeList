// Charaktere
const characters = [
    { name: "Margot Robbie", image: "https://imgix.ranker.com/user_node_img/1641/32800165/original/32800165-photo-u-1437653758?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Ana de Armas", image: "https://imgix.ranker.com/user_node_img/1551/31000870/original/ana-de-armas-photo-u26?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Scarlett Johansson", image: "https://imgix.ranker.com/user_node_img/100/1984943/original/scarlett-johansson-recording-artists-and-groups-photo-u166?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Jessica Alba", image: "https://imgix.ranker.com/user_node_img/65/1285612/original/1285612-photo-u-1041207549?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Alexandra Daddario", image: "https://imgix.ranker.com/user_node_img/1548/30955921/original/alexandra-daddario-photo-u109?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Gal Gadot", image: "https://imgix.ranker.com/user_node_img/53/1041357/original/1041357-photo-u2146145864?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Emma Watson", image: "https://image.gala.de/22628744/t/PZ/v5/w960/r0.6667/-/emma-watson-2021-10-17.jpg" },
    { name: "Sydney Sweeney", image: "https://imgix.ranker.com/user_node_img/1210/24194612/original/sydney-sweeney-u1895809208?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&bg=fff&h=300&w=300" },
    { name: "Zendaya", image: "https://www.hollywoodreporter.com/wp-content/uploads/2023/08/GettyImages-1497018169-H-2023.jpg?w=1296&h=730&crop=1" },
    { name: "Elizabeth Olsen", image: "https://imgix.ranker.com/user_node_img/1590/31793173/original/elizabeth-olsen-people-in-tv-photo-u16?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Emilia Clarke", image: "https://media.vogue.de/photos/5beeefec5c5243377bf1cb8a/2:3/w_2560%2Cc_limit/Emilia-Clarke-Aufmacher.jpg" },
    { name: "Megan Fox", image: "https://imgix.ranker.com/user_node_img/78/1558135/original/1558135-photo-u-30226905?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Anne Hathaway", image: "https://imgix.ranker.com/user_node_img/24/468745/original/anne-hathaway-photo-u352?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Jennifer Lawrence", image: "https://imgix.ranker.com/user_node_img/65/1281504/original/1281504-photo-u-1423690460?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Emma Stone", image: "https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_FMjpg_UX1000_.jpg" },
    { name: "Natalie Portman", image: "https://imgix.ranker.com/user_node_img/83/1648992/original/1648992-photo-u1088517660?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Selena Gomez", image: "https://i0.gmx.at/image/390/38731390,pd=2,f=size-l/selena-gomez.jpg" },
    { name: "Angelina Jolie", image: "https://image.gala.de/24334032/t/t4/v3/w960/r0.6667/-/25--wurde-ihr-sohn-zu-ihrem-mieter----1-1---spoton-article-1090595.jpg" },
    { name: "Blake Lively", image: "https://people.com/thmb/JWW3QV0Uzp2nbIyMOOLIuFreyKQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/blake-lively--time100-04242025-924466c63120434e80ab621e8856d1ec.jpg" },
    { name: "Lily Collins", image: "https://hips.hearstapps.com/hmg-prod/images/lily-collins-attends-the-devil-wears-prada-the-musical-news-photo-1733139409.jpg?crop=1xw:0.66699xh;center,top&resize=1200:*" },
    { name: "Nina Dobrev", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nina_Dobrev_at_PaleyFest2010.jpg/250px-Nina_Dobrev_at_PaleyFest2010.jpg" },
    { name: "Victoria Justice", image: "https://m.media-amazon.com/images/M/MV5BMzE3NjEzYmQtODNhZS00ZDU1LTg5NGMtMmVlNzRjNDFiMzQ5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "Madison Beer", image: "https://imgix.ranker.com/user_node_img/4035/80686523/original/madison-beer-photo-u16?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Ariana Grande", image: "https://image.gala.de/23910930/t/5Z/v5/w960/r0.6667/-/ariana-grande.jpg" },
    { name: "Hailee Steinfeld", image: "https://i0.gmx.at/image/382/37987382,pd=1,f=size-l/hailee-steinfeld.jpg" },
    { name: "Barbara Palvin", image: "https://i.pinimg.com/736x/34/6a/fd/346afde34a1cf7413e729ce6b822183e.jpg" },
    { name: "Kendall Jenner", image: "https://i0.gmx.at/image/234/39021234,pd=1/kendall-jenner.jpg" },
    { name: "Bella Hadid", image: "https://content5.promiflash.de/article-images/square600/bella-hadid-laechelt-4.jpg" },
    { name: "Dua Lipa", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Glasto24_28_300624_%28259_of_545%29_%2853838014719%29_%28cropped%29.jpg/1200px-Glasto24_28_300624_%28259_of_545%29_%2853838014719%29_%28cropped%29.jpg" },
    { name: "Lily James", image: "https://de.web.img3.acsta.net/pictures/210/432/21043227_20130923203108321.jpg" },
    { name: "Millie Bobby Brown", image: "https://image.gala.de/24310008/t/3g/v2/w1440/r1/-/millie-bobbie-brown-teaser.jpg" },
    { name: "Olivia Rodrigo", image: "https://image.gala.de/22494124/t/K2/v5/w960/r1/-/olivia-rodrigo.jpg" },
    { name: "Camila Mendes", image: "https://media.themoviedb.org/t/p/w500/pZAWRHdJtJlDcWuQHlgIwX12s02.jpg" },
    { name: "Emily Ratajkowski", image: "https://imgix.ranker.com/user_node_img/3102/62021533/original/emily-ratajkowski-photo-u117?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Dove Cameron", image: "https://fr.web.img6.acsta.net/pictures/18/01/08/13/57/3752878.jpg" },
    { name: "Taylor Swift", image: "https://i0.gmx.at/image/468/38837468,pd=1,f=size-l/taylor-swift.jpg" },
    { name: "Rihanna", image: "https://www.rollingstone.de/wp-content/uploads/2021/02/17/15/rihanna-gettyimages-821622848-scaled.jpg" },
    { name: "Beyoncé", image: "https://imageio.forbes.com/specials-images/imageserve/6760517984921923e8effbcd/0x0.jpg?format=jpg&crop=1736,1737,x834,y79,safe&height=416&width=416&fit=bounds" },
    { name: "Lady Gaga", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Lady_Gaga_at_the_White_House_in_2023_%283%29.jpg/250px-Lady_Gaga_at_the_White_House_in_2023_%283%29.jpg" },
    { name: "Katy Perry", image: "https://cdn1-production-images-kly.akamaized.net/MVCpPIEZaeUtcgInvwCIoOI_D1w=/800x1066/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4222292/original/002123100_1668100611-Katy_Perry-6.jpg" },
    { name: "Jennifer Lopez", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Jennifer_Lopez_at_the_2025_Sundance_Film_Festival_%28cropped_3%29.jpg/1200px-Jennifer_Lopez_at_the_2025_Sundance_Film_Festival_%28cropped_3%29.jpg" },
    { name: "Shakira", image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2902.jpg" },
    { name: "Salma Hayek", image: "https://imgix.ranker.com/user_node_img/99/1964570/original/salma-hayek-recording-artists-and-groups-photo-u54?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=500" },
    { name: "Sofia Vergara", image: "https://image.gala.de/24102332/t/bC/v5/w960/r0.6667/-/vergara-teaser.jpg" },
    { name: "Eva Mendes", image: "https://image.gala.de/24215244/t/qN/v4/w960/r0.6667/-/eva-mendes-teaser.jpg" },
    { 
        name: "Penélope Cruz", 
        image: "https://de.web.img3.acsta.net/pictures/18/03/23/15/18/0881779.jpg" 
    },
    { 
        name: "Monica Bellucci", 
        image: "https://media.vogue.de/photos/6156c7ca0abe9b3e33397efa/master/w_1600%2Cc_limit/GettyImages-2324787.jpg" 
    },
    { 
        name: "Kate Beckinsale", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Kate_Beckinsale_2011_Comic-Con_%28truer_color%29.jpg/1200px-Kate_Beckinsale_2011_Comic-Con_%28truer_color%29.jpg" 
    },
    { 
        name: "Charlize Theron", 
        image: "https://cloudfront-eu-central-1.images.arcpublishing.com/madsack/OXCSTDB4J5ASFF2GNMLH6WTZI4.jpeg" 
    },
    { 
        name: "Mila Kunis", 
        image: "https://de.web.img2.acsta.net/pictures/15/07/08/17/25/133690.jpg" 
    },
    { 
        name: "Adriana Lima", 
        image: "https://i0.gmx.at/image/706/36609706,pd=2/adriana-lima.jpg" 
    },
    { 
        name: "Florence Pugh", 
        image: "https://bmg-images.forward-publishing.io/2024/12/15/9cfba81c-e3ea-45eb-a007-dd991fbbac9b.jpeg?w=1024&auto=format" 
    },
    { 
        name: "Anya Taylor-Joy", 
        image: "https://cdn.book-family.de/stylebook/data/uploads/2022/11/gettyimages-1441297387.jpg?impolicy=channel&imwidth=992" 
    },
    { 
        name: "Jenna Ortega", 
        image: "https://i0.gmx.at/image/292/37563292,pd=3,f=sdata11/jenna-ortega.jpg" 
    },
    { 
        name: "Sophie Turner", 
        image: "https://static.wikia.nocookie.net/avengers/images/2/2c/Sophie_Turner.jpg/revision/latest?cb=20150125185607&path-prefix=de" 
    },
    { 
        name: "Maisie Williams", 
        image: "https://i2-prod.bristolpost.co.uk/incoming/article2765949.ece/ALTERNATES/s615/1_Game-Of-Thrones-Season-8-Screening-Red-Carpet-Arrivals.jpg" 
    },
    { 
        name: "Elle Fanning", 
        image: "https://static.wikia.nocookie.net/actors/images/a/a8/Elle_Fanning.jpg/revision/latest?cb=20210325232353&path-prefix=de" 
    },
    { 
        name: "Dakota Fanning", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Dakota_Fanning_SAG_AWARDS_2020.jpg/960px-Dakota_Fanning_SAG_AWARDS_2020.jpg" 
    },
    { 
        name: "Amanda Seyfried", 
        image: "https://i0.gmx.at/image/942/36609942,pd=2/amanda-seyfried.jpg" 
    },
    { 
        name: "Rachel McAdams", 
        image: "https://m.media-amazon.com/images/M/MV5BMTY5ODcxMDU4NV5BMl5BanBnXkFtZTcwMjAzNjQyNQ@@._V1_FMjpg_UX1000_.jpg" 
    },
    { 
        name: "Keira Knightley", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Keira_Knightley_2005.jpg/250px-Keira_Knightley_2005.jpg" 
    },
    { 
        name: "Carey Mulligan", 
        image: "https://static.epd-film.de/get/?daid=00010001QMxbhWowDUDPvx1Enkd1qihE2Cm_aWVJSZo_Y75aJVG_000000255725&dfid=i-103" 
    },
    { 
        name: "Danai Gurira", 
        image: "https://deadline.com/wp-content/uploads/2018/11/danai-gurira.jpg" 
    },
    { 
        name: "Letitia Wright", 
        image: "https://de.web.img3.acsta.net/c_310_420/pictures/19/04/25/23/54/1990890.jpg" 
    },
    { 
        name: "Gemma Chan", 
        image: "https://hips.hearstapps.com/hmg-prod/images/gemma-chan-64f797657c927.jpg?crop=0.927xw:0.942xh;0.0255xw,0.0579xh&resize=980:*" 
    },
    { 
        name: "Constance Wu", 
        image: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2025-03/250327-Constance-Wu-ch-1324-2075e7.jpg" 
    },
    { 
        name: "Priyanka Chopra", 
        image: "https://image.gala.de/22558192/t/ON/v4/w960/r0.6667/-/priyanka-chopra.jpg" 
    },
    { 
        name: "Deepika Padukone", 
        image: "https://image.gala.de/22580474/t/RJ/v4/w960/r0.6667/-/deepika-padukone.jpg" 
    },
    { 
        name: "Aishwarya Rai", 
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Aishwarya_Rai_Cannes_2017.jpg" 
    },
    { 
        name: "Freida Pinto", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqFTtMc9OQJgnaJL0JX-4yi_Fjux-KDE4cQ&s" 
    },
    { 
        name: "Mindy Kaling", 
        image: "https://www.antenne.nrw/media/cache/3/version/108163/hhscgr3rgc-v11-ax-s2048-v1.jpeg/29e7045fbe9eb7a80b6ccb912ad0bef9.jpg" 
    },
    { 
        name: "Lucy Liu", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Lucy_Liu_Cannes_2008.jpg/250px-Lucy_Liu_Cannes_2008.jpg" 
    },
    { 
        name: "Ming-Na Wen", 
        image: "https://static.wikia.nocookie.net/agentsofshield/images/0/07/Ming-Na-Wen.jpg/revision/latest?cb=20180114125039&path-prefix=de" 
    },
    { 
        name: "Jamie Chung", 
        image: "https://static.wikia.nocookie.net/fox-thegifted/images/e/e6/Jamie_Chung.png/revision/latest?cb=20180923002834" 
    },
    { 
        name: "Brenda Song", 
        image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Brenda_Song_021109-R293.jpg" 
    },
    { 
        name: "Lana Condor", 
        image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Lana_Condor_2015_%282%29.jpg" 
    },
    { 
        name: "Gigi Hadid", 
        image: "https://image.gala.de/24105912/t/5L/v6/w960/r0.6667/-/gigi-hadid.jpg" 
    },
    { 
        name: "Cara Delevingne", 
        image: "https://static.wikia.nocookie.net/dckinofilme/images/6/64/Cara_Delevingne.jpg/revision/latest/thumbnail/width/360/height/360?cb=20141203133240&path-prefix=de" 
    },
    { 
        name: "Karlie Kloss", 
        image: "https://hips.hearstapps.com/hmg-prod/images/karlie-kloss-1549565171.jpg?resize=640:*" 
    },
    { 
        name: "Miranda Kerr", 
        image: "https://image.gala.de/24088660/t/Et/v3/w960/r0.6667/-/miranda-kerr.jpg" 
    },
    { 
        name: "Rosie Huntington-Whiteley", 
        image: "https://cache.net-a-porter.com/content/images/story-head-content-SUBBED-1540568687092.jpeg/w1900_q65.jpeg" 
    },
    { 
        name: "Emily Ratajkowski", 
        image: "https://static.instyle.de/0x0:844x1206/844x1206/images/2025-02/bildschirmfoto_2025-02-28_um_11.49.52.png" 
    },
    { 
        name: "Kate Upton", 
        image: "https://i0.gmx.at/image/866/36639866,pd=1/kate-upton.jpg" 
    },
    { 
        name: "Chrissy Teigen", 
        image: "https://people.com/thmb/hlz9t6ueMm1kZhdS5gh4ZS99Ujk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(737x287:739x289)/chrissy-teigen-hate-comments-rant-031625-12b9416df24841069cd8ef57a5c929e3.jpg" 
    },
    { 
        name: "Tyra Banks", 
        image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Tyra_Banks_2012_Shankbone_5.JPG" 
    },
    { 
        name: "Naomi Campbell", 
        image: "https://image.gala.de/23939016/t/WS/v12/w960/r0.6667/-/naomi-campbell.jpg" 
    },
    { 
        name: "Gisele Bündchen", 
        image: "https://image.stern.de/8369300/t/9W/v3/w1440/r1/-/gisele.jpg" 
    },
    { 
        name: "Heidi Klum", 
        image: "https://image.gala.de/24315182/t/Gb/v3/w960/r0.6667/-/03--sie-testet-oscar-kleid-auf-dem-trampolin---1-1---spoton-article-1087949.jpg" 
    },
    { 
        name: "Alessandra Ambrosio", 
        image: "https://vipcheck.wageindicator.org/media/Alessandra.ambrosio.jpeg" 
    },
    { 
        name: "Candice Swanepoel", 
        image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Candice-Swanepoel_2010-03-31_VictoriasSecretStoreChicago_photo-by-Adam_Bielawski.jpg" 
    },
    { 
        name: "Behati Prinsloo", 
        image: "https://image.gala.de/22987930/t/nr/v9/w960/r0.6667/-/behati-prinsloo.jpg" 
    },
    { 
        name: "Lily Aldridge", 
        image: "https://m.media-amazon.com/images/M/MV5BMTQxNTQwNzU5MV5BMl5BanBnXkFtZTcwNjIzNDMwNw@@._V1_.jpg" 
    },
    { 
        name: "Elsa Hosk", 
        image: "https://i0.gmx.at/image/028/37874028,pd=1/elsa-hosk.jpg" 
    },
    { 
        name: "Jasmine Tookes", 
        image: "https://image.gala.de/22504978/t/vZ/v7/w960/r0.6667/-/jasmine-tookes.jpg" 
    },
    { 
        name: "Romee Strijd", 
        image: "https://www.tips.at/image/thumbcrop/news/896260/616375/1200x733x0/1692890474.1031-victoria-s-secret-model-romee-strijd-urlaubt-mit-familie-in-oesterreich-kPiS5w.jpg" 
    },
    { 
        name: "Sara Sampaio", 
        image: "https://i0.gmx.at/image/130/37041130,pd=1/sara-sampaio.jpg" 
    },
    { 
        name: "Taylor Hill", 
        image: "https://www.makeup.com/-/media/project/loreal/brand-sites/mdc/americas/us/articles/2019/07_july/29-taylor-hill-interview/mudc-hero-taylor-hill-ralph-lauren-beyond-romance-07292019.jpg?cx=0.49&cy=0.54&cw=705&ch=529&blr=False&hash=49937EFD6B86BC93C1DB2472A14EF1BB" 
    },
    { 
        name: "Grace Elizabeth", 
        image: "https://media.zenfs.com/en/cover_media_309/47bc2511af10d601d869e7ca7ce93e3a" 
    },
    { 
        name: "Barbara Palvin", 
        image: "https://contentf5.dailynewshungary.com/wp-content/uploads/2024/10/Barbara-Palvin-e1728039854746.jpg" 
    },
    { 
        name: "Lais Ribeiro", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Lais_Ribeiro_modeling.jpg/1200px-Lais_Ribeiro_modeling.jpg" 
    },
    { 
        name: "Devon Windsor", 
        image: "https://people.com/thmb/mxHi6AgfFUra-tm_s-Bj_yfBMEs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(757x0:759x2)/devon-windsor-1-43e01733cccd4ed8935cc29bdded8f80.jpg" 
    },
    { 
        name: "Stella Maxwell", 
        image: "https://assets.vogue.com/photos/5a208e77a2171b3fa480a492/master/pass/00-promo-stella-maxwell.jpg" 
    },
    { 
        name: "Megan Williams", 
        image: "https://i.mdel.net/i/db/2022/4/1684537/1684537-500w.jpg" 
    },
    { 
        name: "Alanna Arrington", 
        image: "https://i.mdel.net/i/db/2023/3/1915022/1915022-500w.jpg" 
    },
    { 
        name: "Imaan Hammam", 
        image: "https://fashionmagazine.mblycdn.com/fm/resized/2023/11/w768/Regimens_Product_Inline_9.jpg" 
    },
    { 
        name: "Jourdan Dunn", 
        image: "https://m.media-amazon.com/images/M/MV5BMjljMjMzZDItMGIxZC00YzdjLTlmNmYtYTIzNmI1ZGNiYzBmXkEyXkFqcGc@._V1_.jpg" 
    },
    { 
        name: "Joan Smalls", 
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Joan_Smalls_DVF_ss14-33.jpg" 
    },
    { 
        name: "Maria Borges", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cannes_2018_32.jpg/250px-Cannes_2018_32.jpg" 
    },
    { 
        name: "Lais Oliveira", 
        image: "https://images.squarespace-cdn.com/content/v1/58c5d9cf9de4bb5b7f5502ae/1533058771325-DQRB8BFWHWPERTZUT1BP/IMG_1188x.jpg" 
    },
    { 
        name: "Daniela Braga", 
        image: "https://images.squarespace-cdn.com/content/v1/5625065be4b04bb42a217643/1506645779123-MGISZH8YWOWKOYEJO13J/Daniela%2BBraga%2B2016%2BFuture%2BFashion%2BRunway%2BShow%2BGu7zIo5387Jx.jpg" 
    },
    { 
        name: "Bruna Lirio", 
        image: "https://www.modelwerk.de/image/513916.jpg?size=rmbig" 
    },
    { 
        name: "Fernanda Motta", 
        image: "https://veja.abril.com.br/wp-content/uploads/2020/02/fernanda-motta-modelo-2020.jpg?crop=1&resize=1212,909" 
    },
    { 
        name: "Izabel Goulart", 
        image: "https://www.grazia-magazin.de/images/3x4_870/2024-04/izabel-goulart-im-interview.jpg?h=862e88c4" 
    }
];

let availableCharacters = [...characters];

let droppedImages = 0;
const totalImages = 3;

// DOM-Elemente
const draggableImages = document.querySelectorAll('.draggable-image');
const dropZones = document.querySelectorAll('.drop-zone');
const nextBtn = document.getElementById('next-btn');

// Zufällige 3 Charaktere auswählen
function getRandomCharacters() {
    if (availableCharacters.length < 3) {
        // Wenn weniger als 3 übrig sind, Pool zurücksetzen
        availableCharacters = [...characters];
    }
    const shuffled = [...availableCharacters].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    // Entferne die gezogenen Charaktere aus dem Pool
    availableCharacters = availableCharacters.filter(c => !selected.includes(c));
    return selected;
}

// Bilder und Namen anzeigen
function displayCharacters() {
    const randomCharacters = getRandomCharacters();
    draggableImages.forEach((container, index) => {
        const character = randomCharacters[index];
        const img = container.querySelector('img');
        const name = container.querySelector('h2');
        
        if (character && img && name) {
            // Bild laden und Fehlerbehandlung
            img.onerror = function() {
                console.error('Bild konnte nicht geladen werden:', character.image);
                img.src = 'https://via.placeholder.com/200x300?text=Kein+Bild';
            };
            img.src = character.image;
            img.alt = character.name;
            name.textContent = character.name;
        }
    });
}

// Drag & Drop Event Handler
function handleDragStart(e) {
    const draggableImage = e.target.closest('.draggable-image');
    if (draggableImage) {
        draggableImage.classList.add('dragging');
        e.dataTransfer.setData('text/plain', draggableImage.dataset.index);
    }
}

function handleDragEnd(e) {
    const draggableImage = e.target.closest('.draggable-image');
    if (draggableImage) {
        draggableImage.classList.remove('dragging');
    }
}

function handleDragOver(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone) {
        dropZone.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    if (dropZone) {
        dropZone.classList.remove('drag-over');
        const draggedImage = document.querySelector('.dragging');
        if (draggedImage) {
            dropZone.classList.add('dropped');
            
            // Bild-Element in die Drop-Zone verschieben
            const imgClone = draggedImage.querySelector('img').cloneNode(true);
            imgClone.style.width = '80px';
            imgClone.style.height = '120px';
            imgClone.style.borderRadius = '8px';
            imgClone.style.marginBottom = '8px';
            dropZone.appendChild(imgClone);

            // Text in der Drop-Zone ausblenden
            const span = dropZone.querySelector('span');
            if (span) span.style.visibility = 'hidden';

            // Ergebnis-Text unterhalb anzeigen
            const type = dropZone.dataset.type;
            let resultId = '';
            let resultText = '';
            if (type === 'smash') {
                resultId = 'smash-result';
                resultText = 'Smash 💦';
            } else if (type === 'marry') {
                resultId = 'marry-result';
                resultText = 'Marry 👰🏽‍♀️';
            } else {
                resultId = 'kill-result';
                resultText = 'Kill ☠️';
            }
            document.getElementById(resultId).textContent = resultText;

            // Animation Emoji
    const emoji = document.createElement('div');
    emoji.className = 'animation-emoji';
            emoji.textContent = type === 'smash' ? '💦' : type === 'marry' ? '👰🏽‍♀️' : '☠️';
            dropZone.appendChild(emoji);
            
            // Bild als verschoben markieren
            draggedImage.style.opacity = '0.5';
            draggedImage.style.pointerEvents = 'none';
            droppedImages++;
            
            if (droppedImages === totalImages) {
                nextBtn.disabled = false;
            }
    
    setTimeout(() => {
                dropZone.classList.remove('dropped');
        emoji.remove();
    }, 700);
        }
    }
}

// Event Listener für den Weiter-Button
nextBtn.addEventListener('click', () => {
    droppedImages = 0;
    nextBtn.disabled = true;
    displayCharacters();
    
    // Bilder zurücksetzen
    draggableImages.forEach(image => {
        image.style.opacity = '1';
        image.style.pointerEvents = 'auto';
    });
    // Drop-Zonen leeren und Text wieder einblenden
    dropZones.forEach(zone => {
        Array.from(zone.querySelectorAll('img')).forEach(img => img.remove());
        const span = zone.querySelector('span');
        if (span) span.style.visibility = 'visible';
    });
    // Ergebnis-Texte leeren
    document.getElementById('smash-result').textContent = '';
    document.getElementById('marry-result').textContent = '';
    document.getElementById('kill-result').textContent = '';
});

// Event Listener hinzufügen
document.addEventListener('DOMContentLoaded', () => {
    // Drag & Drop Event Listener für Bilder
    draggableImages.forEach((image, index) => {
        image.dataset.index = index;
        image.setAttribute('draggable', 'true');
        image.addEventListener('dragstart', handleDragStart);
        image.addEventListener('dragend', handleDragEnd);
    });

    // Drop Zone Event Listener
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });

    // Initiale Anzeige
    displayCharacters();
});
