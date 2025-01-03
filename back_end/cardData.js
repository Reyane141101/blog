const Subjects =["Data", "Artificial Intelligence", "DevOps", "Cloud"]
const cardData = 
[
    {
      id:1,
      img: 'https://picsum.photos/800/450?random=1',
      tag: Subjects[0],
      title: 'How to setup Spark and the understanding behind it',
      description:
        'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
      authors: [
        { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
        { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
      ],
      url:"articles/SetupSpark"
    },
    {
      id:2,
      img: 'https://picsum.photos/800/450?random=2',
      tag: Subjects[1],
      title: 'Work in progess',
      description:
        'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
      authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
      url:"articles/SetupSpark"
    },
    {
      id:3,
      img: 'https://picsum.photos/800/450?random=3',
      tag: Subjects[3],
      title: 'Designing for the future: trends and insights',
      description:
        'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
      authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
      url:"articles/SetupSpark"
    },
    {
      id:4,
      img: 'https://picsum.photos/800/450?random=4',
      tag: Subjects[2],
      title: "Our company's journey: milestones and achievements",
      description:
        "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
      authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
      url:"articles/SetupSpark"
    },
    {
      id:5,
      img: 'https://picsum.photos/800/450?random=45',
      tag: Subjects[0],
      title: 'Pioneering sustainable engineering solutions',
      description:
        "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
      authors: [
        { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
        { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
      ],
      url:"articles/SetupSpark"
    },
    {
      id:6,
      img: 'https://picsum.photos/800/450?random=6',
      tag: Subjects[0],
      title: 'Maximizing efficiency with our latest product updates',
      description:
        'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
      authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
      url:"articles/SetupSpark"
    },
  ];

module.exports = cardData;