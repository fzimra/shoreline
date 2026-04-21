export const mockPlan = {
  title: "Kandy Highlands Expedition",
  description:
    "Curating your journey through the misty peaks and ancient temples of the cultural capital.",
  destinations: [
    {
      id: "temple-of-the-sacred-tooth-relic",
      order: "01",
      name: "Temple of the Sacred Tooth Relic",
      description:
        "Spiritual heart of Kandy, housing Sri Lanka's most important Buddhist relic.",
      duration: "2-3 Hours",
      category: "Culture",
      travel: "15 mins travel (4.2 km)",
      image: "/mock/pagoda.svg",
    },
    {
      id: "royal-botanical-gardens",
      order: "02",
      name: "Royal Botanical Gardens",
      description:
        "Famous for its collection of orchids and the giant Javan fig tree.",
      duration: "2 Hours",
      category: "Nature",
      travel: "25 mins travel (6.8 km)",
      image: "/mock/forest.svg",
    },
    {
      id: "kandy-lake-view-point",
      order: "03",
      name: "Kandy Lake View Point",
      description:
        "The best spot for sunset views over the lake and the city skyline.",
      duration: "45 Mins",
      category: "Scenic",
      image: "/mock/hero-coast.svg",
    },
  ],
  summary: {
    totalDestinations: "03",
    estimatedDistance: "11.0 km",
    driveTime: "40 mins",
    routeName: "The City Loop",
    routeDescription: "Optimized for sunset views",
    routeHref: "https://maps.google.com/?q=Kandy",
  },
  tip: "Start your day at the Temple of the Tooth before 8 AM to avoid the largest crowds.",
};
