import mock from "../mock";

const data = {
  // blog list
  blogList: [
    {
      img: "https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg",
      title: "SimpleText allows text editing and text formatting .",
      id: 1,
      avatar: "a",
      userFullName: "Ghani Pradita",
      blogPosted: "Jan 10, 2025",
      tags: ["Style", "Fashion"],
      excerpt:
        "It can be considered similar to Windows' WordPad application. In later versions it also gained additional read only display capabilities for PICT files.",
      comment: 76,
    },
    {
      img: "https://cdn.pixabay.com/photo/2023/10/19/21/08/ai-generated-8327632_1280.jpg",
      title:
        "SimpleText superseded TeachText, which was included in System Software ",
      id: 2,
      avatar: "s",
      userFullName: "Jorge Griffin",
      blogPosted: "Jan 10, 2020",
      tags: ["Gaming", "Video"],
      excerpt:
        "The key improvement of SimpleText over TeachText was the addition of text styling. The underlying OS",
      comment: 2100,
    },
    {
      img: "https://cdn.pixabay.com/photo/2023/12/08/23/46/cat-8438334_1280.jpg",
      title: "SimpleText could support multiple fonts and font sizes",
      id: 3,
      avatar: "b",
      userFullName: "Claudia Neal",
      blogPosted: "Jan 10, 2020",
      tags: ["Gaming", "Food"],
      excerpt:
        "Like TeachText, SimpleText was also limited to only 32 kB of text in a document,[2] although images could increase the total file size",
      comment: 243,
    },
    {
      img: "https://media.istockphoto.com/id/935705948/photo/tropical-beach-with-rocks-and-big-crashing-waves.jpg?s=2048x2048&w=is&k=20&c=cZ4NDlSOnEGR1rHHMz0hXA86xp6lP3YhZ0965Te0caI=",
      title: "SimpleText is replaced by the more powerful",
      id: 4,
      avatar: "w",
      userFullName: "Fred Boone",
      blogPosted: "Jan 10, 2020",
      tags: ["Video"],
      excerpt:
        "Apple has released the source code for a Carbon version of SimpleText in the Mac OS X Panther (10.3) Developer Tools. If the 10.3 Developer Tools are installed,",
      comment: 10,
    },
  ],

  // sidebar
  blogSidebar: {
    recentPosts: [
      {
        img: require("@src/assets/images/banner/banner-22.jpg").default,
        title: "Why Should Forget Facebook?",
        id: 7,
        createdTime: "Jan 14 2020",
      },
      {
        img: require("@src/assets/images/banner/banner-27.jpg").default,
        title: "Publish your passions, your way",
        id: 8,
        createdTime: "Mar 04 2020",
      },
      {
        img: require("@src/assets/images/banner/banner-39.jpg").default,
        title: "The Best Ways to Retain More",
        id: 9,
        createdTime: "Feb 18 2020",
      },
      {
        img: require("@src/assets/images/banner/banner-35.jpg").default,
        title: "Share a Shocking Fact or Statistic",
        id: 10,
        createdTime: "Oct 08 2020",
      },
    ],
    categories: [
      { category: "Fashion", icon: "Watch" },
      { category: "Food", icon: "ShoppingCart" },
      { category: "Gaming", icon: "Command" },
      { category: "Quote", icon: "Hash" },
      { category: "Video", icon: "Video" },
    ],
  },

  // detail
  blogDetail: {
    blog: {
      img: "https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg",
      title: "SimpleText allows text editing and text formatting ",
      avatar: "a",
      userFullName: "Ghani Pradita",
      createdTime: "Jan 10, 2020",
      tags: ["Gaming", "Video"],
      content:
        '<p class="card-text mb-2">Before you get into the nitty-gritty of coming up with a perfect title, start with a rough draft: your working title. What is that, exactly? A lot of people confuse working titles with topics. Let\'s clear that Topics are very general and could yield several different blog posts. Think "raising healthy kids," or "kitchen storage." A writer might look at either of those topics and choose to take them in very, very different directions.A working title, on the other hand, is very specific and guides the creation of a single blog post. For example, from the topic "raising healthy kids," you could derive the following working title See how different and specific each of those is? That\'s what makes them working titles, instead of overarching topics.</p><h4>Unprecedented Challenge</h4><ul><li>Preliminary thinking systems</li><li>Bandwidth efficient</li><li>Green space</li><li>Social impact</li><li>Thought partnership</li><li>Fully ethical life</li></ul>',
      comments: 19100,
      bookmarked: 139,
    },
    comments: [
      {
        avatar: "h",
        userFullName: "Chad Alexander",
        commentedAt: "May 24, 2020",
        commentText:
          "A variation on the question technique above, the multiple-choice question great way to engage your reader.",
      },
    ],
  },

  // edit
  blogEdit: {
    avatar:
      "https://cdn.pixabay.com/photo/2024/01/27/18/24/squirrel-8536537_1280.jpg",
    userFullName: "Chad Alexander",
    createdTime: "May 24, 2020",
    blogTitle: "The Best Features Coming to iOS and Web design",
    blogCategories: [
      { value: "fashion", label: "Fashion" },
      { value: "gaming", label: "Gaming" },
    ],
    slug: "the-best-features-coming-to-ios-and-web-design",
    status: "Published",
    excerpt:
      "<p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p><p><br></p><p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>",
    featuredImage: require("@src/assets/images/slider/03.jpg").default,
  },
};

mock.onGet("/blog/list/data").reply(() => [200, data.blogList]);
mock.onGet("/blog/list/data/sidebar").reply(() => [200, data.blogSidebar]);
mock.onGet("/blog/list/data/detail").reply(() => [200, data.blogDetail]);
mock.onGet("/blog/list/data/edit").reply(() => [200, data.blogEdit]);
