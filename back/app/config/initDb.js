const bcrypt = require('bcrypt');

const datas = {

    roles: [
        { name: 'USER' },
        { name: 'TEACHER' },
        { name: 'STUDENT' },
        { name: 'ADMIN' },
    ],

    videos: [
        {
            format: "Masterclass",
            title: "PIANO masterclass by Stephen Kovacevich | Ballade No. 4 in F Minor, Op. 52. by Frédéric Chopin",
            url: "https://www.youtube.com/embed/2DNQciW0-eM?si=TOizRrfwFl7SFdCW",
            sousTitre: "Français",
            langue: "Anglais",
            master: "Stephen Kovacevich",
            instrument: "Piano",
            compositeur: "Frédéric Chopin",
            description: "In this masterclass, Professor Stephen Kovacevich works with student Rodolphe Menguy on style, melody, and balance in the Four Impromptus, D935 by Franz Schubert. He helps the student find the most effective tempo from the beginning and then maintain it throughout. Professor Kovacevich encourages the student to pay equal attention to both his hands simultaneously so he is always aware of the balance and sense of duet. He also offers numerous suggestions on phrasing, articulation, and dynamics with the goal in mind of playing in the correct style and creating flowing, melodic lines. He cautions against playing in too Classical of a style or becoming too concerned with individual notes rather than longer phrases. Finally, Professor Kovacevich helps the student highlight some of the more surprising moments and character changes to create the most engaging interpretation possible. What we learn : - Choosing and maintaining the best tempo. - Avoiding too much emphasis on individual notes rather than melodic lines. - Achieving a duet between the two hands. - Playing articulation and dynamic markings in the correct style. - Bringing out the character changes."
        },          
        {
            format: "Masterclass",
            title: "VIOLIN masterclass by Miriam FRIED | Mozart, Concerto No. 5 in A Major, 1st movement",
            url: "https://www.youtube.com/embed/2DNQciW0-eM?si=kEnHTdeKfGxlshX3",
            sousTitre: "Anglais",
            langue: "Français",
            master: "Miriam Fried",
            instrument: "Violon",
            compositeur: "Mozart",
            description: "Miriam Fried ouvre cette masterclass avec un discours sur l'interprétation d'une cadence par Anatol Janos Toth, soulignant l'importance de jouer une fin claire en fixant une trajectoire dès le début. Ils discutent ainsi du caractère jovial et humoristique de la composition et de la manière de l’exprimer dans le jeu des élèves. Miriam Fried explique qu'il ne faut pas « faire trop d'efforts » et se concentrer sur la simplicité afin de véritablement capturer la nature comique de ce concerto. De plus, le professeur et l'étudiant abordent l'harmonie, la forme classique traditionnelle d'une phrase, la distribution des coups d'archet et l'importance de réfléchir au type de son qu'il faut affirmer afin de communiquer des idées claires à l'orchestre et au public. Ce que nous apprenons : • Définir une trajectoire claire. • Exprimer le caractère d'un morceau. • Rester ouvert d'esprit aux nouvelles possibilités. • Distribution d'archet. • Développer le bon son."
        },
        {
            format: "Masterclass",
            title: "Cello masterclass by Peter Bruns | Cello Sonata No.2 by Beethoven",
            url: "http://www.youtube.com/embed/Xm-fwfdHVDg?si=TandS3gAVJRQH6sx",
            sousTitre: "Français",
            langue: "Français",
            master: "Peter Bruns",
            instrument: "Cello",
            compositeur: "Ludwig van Beethoven",
            description: "In this masterclass, professor Peter Bruns is accompanied by young South-Korean student Jungin Huh, who will be playing Beethoven's second Cello Sonata, Opus five, number two. After listening with great attention to his young student's performance, Professor Peter Bruns emphasizes the importance of articulation and rhythm in the first adagio. He also insists on vibrato and dynamic control, for they are crucial in certain sections of the piece. Professor Bruns reminds young cellist Jungin Huh she should relate more to the bass line for a better overall sound as well as aiming for fewer bow changes and finding the right tension and character, for that is quite important!"
        },
        {
            format: "Masterclass",
            title: "VOICE masterclass by François LE ROUX | Albert ROUSSEL, Deux poèmes chinois",
            url: "https://www.youtube.com/embed/5koUocxAEYQ?si=f_gm74fKu05GWuoY",
            sousTitre: "Français",
            langue: "Anglais",
            master: "François Le Roux",
            instrument: "Voice",
            compositeur: "Albert Roussel",
            description: "About this voice masterclass:\n\nDeux poèmes chinois by Albert Roussel\nRecorded with Albert Roussel and Tomoyo Harada in April 2021.\n\nFrançois Le Roux and Tomoyo Harada explore the comic nature of Roussel's piece, the context, and the silences.\n\n0:00 Intro and playing part\n1:55 Advice part\n\nProfessor François Le Roux and student Tomoyo Harada take on Albert Roussel’s Deux poèmes Chinois, Op. 12, À un jeune gentilhomme and Amoureux séparés.\n\nHarada is instructed to work on her diction and articulation, as well as her breathing. She is also encouraged to approach the piece with more gaiety and sing it like a play. Roussel adapted Chinese-to-English-to-French texts to showcase China as a mythical and mysterious country, as seen from the European perspective of the 1920s.\n\nMoreover, Harada is cautioned against ending her sentences too quickly and rushing them. Le Roux suggests she practices first by speaking the lyrics before singing them.\n\nWhat we learn:\n- Remaining relaxed and avoid rushing\n- Breathing techniques\n- Diction.\n- Practicing strategies.\n- Understanding the historical context of the piece."
        },
        {
            format: "Masterclass",
            title: "VIOLON masterclass par Ning Feng | Sonate pour violon n° 1 en sol mineur de Johann Sebastian Bach",
            url: "https://www.youtube.com/embed/tkWuuj8R_Vs?si=Iv6-Lu1bjWDytzKv",
            description: "Dans cette masterclass, le professeur Ning Feng est accompagné de la jeune étudiante en violon Aijia Li, qui interprétera la première sonate de Bach (n° 1 en sol mineur, BWV 1001). Elle jouera spécifiquement les deux dernières parties, Siciliana et Presto, extraites d'un ensemble de six œuvres composées par Johann Sebastian Bach. En anglais, elles sont souvent désignées sous le nom de \"sonates et partitas pour violon solo\". Le professeur Ning Feng écoute son interprétation très attentivement et la félicite tout en partageant quelques ajustements qu'elle peut apporter. Il apprécie beaucoup son tempo et sa manière de danser avec la musique, cependant, son émotion ne doit pas éclipser ce que Bach exprime dans cette pièce spécifique. Il y a un chemin naturel dans ce mouvement que l'émotion personnelle peut emprunter. Il devient alors difficile de comprendre les annotations ou toute autre spécification ou mention du compositeur. Feng nous rappelle à quel point il est nécessaire de prendre du recul et de s'assurer que notre compréhension de la composition n'est pas obscurcie par un jugement émotionnel.\n\nCe que nous apprenons :\n\n- Rester concentré,\n- Comprendre les changements subtils suggérés par des annotations telles que \"pochissimo\",\n- Comment obtenir un son plus naturel,\n- L'articulation pour un résultat plus fluide,\n- Comment éviter de répéter certains schémas.",
            sousTitre: "Français",
            langue: "Francais",
            master: "Ning Feng",
            instrument: "Violon",
            compositeur: "Johann Sebastian Bach"
        },
        {
            format: "Masterclass",
            title: "Cello masterclass by Sung-Won Yang | Cello Concerto in B minor, Op. 104 by Antonín Dvořák",
            url: "https://www.youtube.com/embed/rYnDmh8gyC8?si=rs9Td62mvg9xZTXX",
            description: "In this masterclass, Professor Sung-Won Yang is accompanied by young cellist Jiyoung Noh who works on improving her performance of the first and second movement of the Cello Concerto in B minor, Op. 104, B. 191, the last solo concerto by Antonín Dvořák. It was written in 1894 and was premiered in London on March 19, 1896.\nDifficulties discussed include intonation, technique, imagination, and knowing the score written for the orchestra. Understanding the structure of the piece, including the different tempo markings, is emphasized as crucial to expressing the music fully. Specific sections, such as the opening of the second theme, are worked on with a focus on rhythm, phrasing, and articulation. Professor Yang stresses the importance of phrasing, breathing, and understanding the structure, as well as exploring different sections of the piece to develop a clear understanding.",
            sousTitre: "Anglais",
            langue: "Anglais",
            master: "Sung-Won Yang",
            instrument: "Violoncelle",
            compositeur: "Antonín Dvořák"
        },
        {
            format: "Masterclass",
            title: "OBOE masterclass by Alexei Ogrintchouk | Oboe Concerto, TrV 292, 1st movement by Richard Strauss",
            url: "https://www.youtube.com/embed/kPkuSiiXH4Q?si=eewL9-xldirbsbuY",
            description: "In this masterclass, Alexei Ogrintchouk works with Josef Vik to capture the long lines and expressivity in the first movement of Strauss’ Oboe Concerto. He begins with mentioning the unusually light quality of this work by Strauss, and thus the importance of bringing that quality out. He helps the student achieve long, legato musical lines that lack unwanted accents. He encourages the student to relax and play stress-free, as that is what the music calls for. He cautions the student against shortening slurred notes, as this detracts from the music. He also demonstrates how to articulate clearly and cleanly without adding unwanted heaviness to the front of articulated notes. Much of the class is spent on phrasing. The student learns to have musical direction at all times, particularly on notes with long values, which must always be leading toward or away from somewhere. Ogrintchouk helps the student find the tension and release in the phrases and therefore sound more intentional in his musical ideas.",
            sousTitre: "Anglais",
            langue: "Anglais",
            master: "Alexei Ogrintchouk",
            instrument: "Hautbois",
            compositeur: "Richard Strauss"
        },
        {
            format: "Masterclass",
            title: "PIANO masterclass by Olivier Gardon | Vallée d'Obermann (Années de pèlerinage) by Franz Liszt",
            url: "https://www.youtube.com/embed/7XyqgZNTLA8?si=x50Ck2cpAICCPaiM",
            description: "In this masterclass, Professor Gardon explains the difficulty of sharing emotions while playing and congratulates his student on his beautiful understanding of Liszt's work. It is not enough to feel it deeply, hoping audiences will pick up on it, he says. It is the work of the musician to share and transmit emotions and perceptions. While being emotive or sensible during interpretation doesn't hinder it, one should not succumb to emotions and should always try to keep a clear head. He then proceeds to extensively guide Hugo towards a better understanding of technical annotations and other various alterations on the piano, for this kind of focus is an efficient way to keep a calm mind while playing.",
            sousTitre: "Anglais",
            langue: "Anglais",
            master: "Olivier Gardon",
            instrument: "Piano",
            compositeur: "Franz Liszt"
        },
        {
            format: "Masterclass",
            title: "piano masterclass by michel dalberto | beethoven, piano concerto no. 4 in g major, op. 58",
            url: "https://www.youtube.com/embed/KCCTccR4OiM?si=dZ6YK34JzqmNc-ZL",
            description: "professor michel dalberto gives a historical overview that provides insight on how to play beethoven’s fourth piano concerto, including the emotional state beethoven was in, how others have performed the piece, as well as the italian influence in the music. dalberto works with student virgile roche to find the right sound quality and timing in the difficult opening, in which the piano begins the piece alone. he discusses how to play the grace notes and trills in the way that best reflects the style of the piece, and offers suggestions for pedal use and efficient fingerings. as someone with experience playing the piece with orchestra, dalberto also shares the musical decisions, especially in regard to dynamics and phrasing, that he has found to work best with the accompaniment.",
            sousTitre: "anglais",
            langue: "anglais",
            master: "michel dalberto",
            instrument: "piano",
            compositeur: "ludwig van beethoven"
        },
        {
            format: "Masterclass",
            title: "flute masterclass by philippe bernold | undine sonata in e minor, op. 167, 1st mov by carl reinecke",
            description: "in this masterclass, philippe bernold discusses intonation and storytelling in the first movement of reinecke’s undine sonata. first, he gives a demonstration on how to properly tune the flute prior to beginning a performance. additionally, throughout the class, he works with the student to improve his intonation through managing the lips, air pressure, and air column. these elements also apply when controlling the quality of sound and dynamics. bernold also describes the story, which the work is based on and helps the student bring out certain characteristics that will better reflect this story. he demonstrates the three major themes in the first movement and works with the student to find a sound, dynamic, and character that matches each of them. finally, he encourages the student to be a more active listener and partner so there is a true dialogue between the flute and the piano.",
            sousTitre: "anglais",
            langue: "anglais",
            master: "philippe bernold",
            instrument: "flute",
            compositeur: "carl reinecke",
            url: "https://www.youtube.com/embed/xWEBbAQPzTU?si=nVMMNW5V_AcolVxI"
        }    
    ],

    users: [
        { roleName : 'ADMIN', userData: { first_name: 'Admin', last_name: 'User', email: 'admin@gmail.com', password: bcrypt.hashSync('rootAdmin8!', 8), premium: true, roleId: null, abonnementId: null, schoolId: null }},
        { roleName: 'USER', userData: { first_name: 'Jean', last_name: 'Du jardin', email: 'user@gmail.com', password: bcrypt.hashSync('rootUser8!', 8), premium: false, abonnementId: null, roleId: null, schoolId: null }},
        { roleName: 'TEACHER', userData: { first_name: 'Teacher', last_name: 'User', email: 'teacher@gmail.com', password: bcrypt.hashSync('rootTeacher8!', 8), premium: true, abonnementId: null, roleId: null, schoolId: null }},
        { roleName: 'STUDENT', userData: { first_name: 'Student', last_name: 'User', email: 'student@gmail.com', password: bcrypt.hashSync('rootStudent8!', 8), premium: true, abonnementId: null, roleId: null, schoolId: null }},
    ]
}

module.exports = datas
