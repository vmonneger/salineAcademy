const data = {

    roles: [
        { name: 'USER' },
        { name: 'TEACHER' },
        { name: 'STUDENT' },
        { name: 'ADMIN' },
    ],

    videos: [
        {
            url: 'https://youtu.be/2DNQciW0-eM?si=hjEWNu0718cPUCoP', 
            title: 'PIANO masterclass by Stephen Kovacevich | Ballade No. 4 in F Minor, Op. 52. by Frédéric Chopin',
            description: 'In this masterclass, Professor Stephen Kovacevich works with student Rodolphe Menguy on style, melody, and balance in the Four Impromptus, D935 by Franz Schubert. He helps the student find the most effective tempo from the beginning and then maintain it throughout. Professor Kovacevich encourages the student to pay equal attention to both his hands simultaneously so he is always aware of the balance and sense of duet. He also offers numerous suggestions on phrasing, articulation, and dynamics with the goal in mind of playing in the correct style and creating flowing, melodic lines. He cautions against playing in too Classical of a style or becoming too concerned with individual notes rather than longer phrases. Finally, Professor Kovacevich helps the student highlight some of the more surprising moments and character changes to create the most engaging interpretation possible.</br> What we learn : </br> - Choosing and maintaining the best tempo.</br> - Avoiding too much emphasis on individual notes rather than melodic lines.</br> - Achieving a duet between the two hands.</br> - Playing articulation and dynamic markings in the correct style.</br> - Bringing out the character changes.',
            compositeur: 'Frédéric Chopin', format: 'Masterclass', instrument : 'Piano', langue: 'Anglais', masters: 'Stephen Kovacevich', sousTitre: 'Français'
        },
        {
            url: 'https://youtu.be/2DNQciW0-eM?si=hjEWNu0718cPUCoP', 
            title: 'VIOLIN masterclass by Miriam FRIED | Mozart, Concerto No. 5 in A Major, 1st movement',
            description: "Miriam Fried opens this masterclass with a discourse on Anatol Janos Toth's interpretation of a cadenza, underlining the importance of playing a clear ending by setting a trajectory from the very beginning. With this, they discuss the jovial and humorous character of the composition, and how to express this in student’s playing. Miriam Fried articulates that one should not ‘try too hard' and focus on simplicity in order to truly capture the comical nature of this concerto. Additionally, the professor and student touch upon harmony, the traditional classical shape of a phrase, bowing distribution, and the value of reflecting upon the kind of sound one needs to assert in order to communicate clear ideas to the orchestra and to the audience. </br> What we learn: </br> • Setting a clear trajectory. </br> • Expressing the character of a piece.</br> • Staying open-minded to new possibilities.</br> • Bowing distribution.</br> • Developing the right sound.",
            compositeur: 'Mozart', format: 'Masterclass', instrument : 'Violon', langue: 'Français', masters: 'Miriam Fried', sousTitre: 'Anglais'
        }
    ],

    users: [
        { firstName: 'Jean', lastname: 'Delay', email: 'jean.d@gmail.com', password: 'Azerty8!', premium: false, abonnementId: null, roleName: 'TEACHER' }
    ]
}

module.exports = data
