import supabase from "../../services/supabase";

const cabinReviews = [
  {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
    date: "2023-07-15",
    rate: 4,
    review: "Great cabin! Spacious rooms and beautiful surroundings.",
    likes: 25,
    dislikes: 2,
    productId: 1238,
  },
  {
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    date: "2023-08-02",
    rate: 5,
    review:
      "Absolutely fantastic experience! The cabin was cozy and clean. Will definitely come back again.",
    likes: 50,
    dislikes: 0,
    productId: 1238,
  },
  {
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2023-09-10",
    rate: 3,
    review:
      "The cabin was nice overall, but some appliances were outdated. Could use some improvements.",
    likes: 10,
    dislikes: 5,
    productId: 1238,
  },
  {
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "2023-10-20",
    rate: 4,
    review:
      "Lovely cabin! Enjoyed the peaceful atmosphere and the beautiful view.",
    likes: 35,
    dislikes: 1,
    productId: 1238,
  },
  {
    name: "David Wilson",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "2023-11-05",
    rate: 3,
    review:
      "Decent cabin. The amenities were adequate, but the location could be better.",
    likes: 15,
    dislikes: 3,
    productId: 1238,
  },
  {
    name: "Sarah Martinez",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "2023-12-15",
    rate: 4,
    review:
      "Had a wonderful time at this cabin. The staff was friendly and helpful.",
    likes: 20,
    dislikes: 0,
    productId: 1238,
  },
  {
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2023-08-15",
    rate: 5,
    review:
      "Outstanding cabin! Everything was perfect from the accommodations to the service.",
    likes: 50,
    dislikes: 0,
    productId: 1239,
  },
  {
    name: "Jessica Taylor",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    date: "2023-09-25",
    rate: 4,
    review:
      "Beautiful cabin with breathtaking views! A great place to relax and unwind.",
    likes: 40,
    dislikes: 2,
    productId: 1239,
  },
  {
    name: "Christopher Lee",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    date: "2023-11-10",
    rate: 4,
    review:
      "Enjoyed our stay at this cabin. Comfortable accommodations and friendly staff.",
    likes: 25,
    dislikes: 1,
    productId: 1239,
  },
  {
    name: "Amanda Robinson",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    date: "2023-07-20",
    rate: 4,
    review:
      "Great cabin for a family getaway. Plenty of activities and amenities for everyone.",
    likes: 30,
    dislikes: 3,
    productId: 1240,
  },
  {
    name: "Matthew White",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    date: "2023-10-05",
    rate: 3,
    review:
      "Decent cabin, but could use some improvements in terms of cleanliness.",
    likes: 15,
    dislikes: 5,
    productId: 1240,
  },
  {
    name: "Jennifer Garcia",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    date: "2023-12-20",
    rate: 4,
    review:
      "Absolutely loved our stay! The cabin exceeded our expectations in every way.",
    likes: 45,
    dislikes: 0,
    productId: 1240,
  },
  {
    name: "Daniel Martinez",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    date: "2023-08-12",
    rate: 4,
    review:
      "Nice cabin with comfortable furnishings. The surrounding nature is beautiful.",
    likes: 20,
    dislikes: 2,
    productId: 1241,
  },
  {
    name: "Sarah Lewis",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    date: "2023-09-30",
    rate: 5,
    review:
      "Exceptional cabin experience! Couldn't have asked for a better getaway.",
    likes: 55,
    dislikes: 1,
    productId: 1241,
  },
  {
    name: "Kevin Clark",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    date: "2023-11-18",
    rate: 4,
    review:
      "Fantastic cabin with top-notch amenities. Would definitely recommend.",
    likes: 40,
    dislikes: 3,
    productId: 1241,
  },
  {
    name: "Olivia Martinez",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    date: "2023-08-05",
    rate: 4,
    review:
      "Cozy cabin with a rustic charm. The surrounding nature was breathtaking.",
    likes: 25,
    dislikes: 2,
    productId: 1241,
  },
  {
    name: "Ethan Taylor",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    date: "2023-09-20",
    rate: 3,
    review:
      "Overall, a pleasant stay. The cabin had all the basic amenities and the location was convenient.",
    likes: 15,
    dislikes: 5,
    productId: 1241,
  },
  {
    name: "Ava Adams",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    date: "2023-11-10",
    rate: 4,
    review:
      "Had a great time at this cabin. It was clean and well-equipped for a comfortable stay.",
    likes: 30,
    dislikes: 3,
    productId: 1241,
  },
  {
    name: "Noah Roberts",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    date: "2023-12-28",
    rate: 4,
    review:
      "The cabin exceeded our expectations. The views from the balcony were spectacular.",
    likes: 40,
    dislikes: 1,
    productId: 1241,
  },
  {
    name: "Emily Hall",
    avatar: "https://randomuser.me/api/portraits/women/13.jpg",
    date: "2023-07-25",
    rate: 4,
    review:
      "Lovely cabin with a cozy atmosphere. Enjoyed every moment of our stay.",
    likes: 35,
    dislikes: 2,
    productId: 1242,
  },
  {
    name: "Andrew Young",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    date: "2023-10-10",
    rate: 3,
    review:
      "Average cabin experience. Some aspects could be improved for better comfort.",
    likes: 10,
    dislikes: 8,
    productId: 1242,
  },
  {
    name: "Jessica Adams",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    date: "2023-12-22",
    rate: 5,
    review:
      "Absolutely stunning cabin with breathtaking views. A truly unforgettable experience.",
    likes: 60,
    dislikes: 0,
    productId: 1242,
  },
  {
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    date: "2023-08-05",
    rate: 4,
    review:
      "Cozy cabin with beautiful surroundings. Enjoyed the tranquility of the location.",
    likes: 25,
    dislikes: 1,
    productId: 1243,
  },
  {
    name: "Laura Taylor",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    date: "2023-09-20",
    rate: 5,
    review:
      "Perfect getaway spot! The cabin was immaculate and the scenery was breathtaking.",
    likes: 45,
    dislikes: 0,
    productId: 1243,
  },
  {
    name: "David Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    date: "2023-11-12",
    rate: 3,
    review:
      "Decent cabin with all the necessary amenities. Some maintenance issues needed attention.",
    likes: 15,
    dislikes: 5,
    productId: 1243,
  },
  {
    name: "Michelle Garcia",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    date: "2023-07-18",
    rate: 4,
    review:
      "Enjoyed our stay at this lovely cabin. Clean and well-equipped for a comfortable experience.",
    likes: 30,
    dislikes: 3,
    productId: 1244,
  },
  {
    name: "James Martinez",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    date: "2023-10-05",
    rate: 4,
    review:
      "Great cabin in a peaceful location. Would definitely recommend for a relaxing getaway.",
    likes: 35,
    dislikes: 1,
    productId: 1244,
  },
  {
    name: "Amanda Hernandez",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    date: "2023-12-28",
    rate: 5,
    review:
      "Absolutely loved our stay! The cabin exceeded our expectations in every way.",
    likes: 55,
    dislikes: 0,
    productId: 1244,
  },
  {
    name: "Emily Wilson",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    date: "2023-08-10",
    rate: 4,
    review:
      "Spent a wonderful weekend at this charming cabin. It had everything we needed for a comfortable stay.",
    likes: 40,
    dislikes: 2,
    productId: 1245,
  },
  {
    name: "Daniel Lee",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    date: "2023-09-25",
    rate: 3,
    review:
      "Nice cabin with a rustic feel. The location was great for exploring the nearby trails.",
    likes: 20,
    dislikes: 10,
    productId: 1245,
  },
  {
    name: "Sarah Gonzalez",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    date: "2023-11-18",
    rate: 4,
    review:
      "Enjoyed our stay at this cozy cabin. The fireplace was a nice touch for chilly evenings.",
    likes: 30,
    dislikes: 5,
    productId: 1245,
  },
  {
    name: "Matthew Perez",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    date: "2023-07-22",
    rate: 5,
    review:
      "Exceptional cabin with stunning views. The interior design was tastefully done.",
    likes: 50,
    dislikes: 0,
    productId: 1246,
  },
  {
    name: "Jessica Scott",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    date: "2023-10-15",
    rate: 4,
    review:
      "Had a fantastic time at this beautiful cabin. It was well-maintained and had all the amenities we needed.",
    likes: 35,
    dislikes: 3,
    productId: 1246,
  },
  {
    name: "Christopher Lewis",
    avatar: "https://randomuser.me/api/portraits/men/27.jpg",
    date: "2023-12-05",
    rate: 4,
    review:
      "Lovely cabin in a peaceful setting. The outdoor deck was perfect for enjoying morning coffee.",
    likes: 45,
    dislikes: 1,
    productId: 1246,
  },
];

export async function generateReviews() {
  const { error: error1 } = await supabase
    .from("cabinsReviews")
    .delete()
    .gt("id", 0);

  if (error1) {
    console.error(error1.message);
    throw new Error("Reviews could not be deleted");
  }

  const { error: error2 } = await supabase
    .from("cabinsReviews")
    .insert(cabinReviews)
    .select();

  if (error2) {
    console.error(error2.message);
    throw new Error("there was error while generating reviews");
  }

  return null;
}
