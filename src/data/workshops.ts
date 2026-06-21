export interface WorkshopData {
  id: string;
  title: string;
  time: string;
  date: Date;
  duration: string;
  track: string;
  level: string;
  description: string;
  isActive: boolean;
  facilitator: {
    name: string;
    role: string;
    bio: string;
    avatar?: string;
  };
  syllabus: { topic: string; detail: string }[];
  takeaways: string[];
}

export const workshops: WorkshopData[] = [
  {
    id: "ws-may-2026",
    title: "Must You Become an Entrepreneur to Build Something Meaningful?",
    date: new Date(2026, 4, 29, 20, 0), // May 29, 2026 8:00 PM
    time: "Friday, May 29, 2026 | 8:00 PM - 9:00 PM",
    duration: "60 Minutes",
    track: "Career & Leadership",
    level: "All Levels",
    description: "This session challenges the societal pressure surrounding entrepreneurship and explores how professionals, leaders, creators, and entrepreneurs all contribute meaningfully to society in different ways.",
    isActive: true,
    facilitator: {
      name: "Mercy Duru",
      role: "Human Capital Developer & Strategist",
      bio: "Mercy Duru is a Human Capital Developer and Strategist with a unique voice that blends analytical logic with timeless career strategy.",
      avatar: "/images/mercy_duru.jpg",
    },
    syllabus: [
      { topic: "Why entrepreneurship is glorified today", detail: "Understanding the modern media narratives" },
      { topic: "The hidden realities of entrepreneurship", detail: "An honest analysis of starting and scaling" },
      { topic: "The power of professionals and institutional builders", detail: "How employment drives massive impact" },
      { topic: "Entrepreneurship vs employment: the wrong debate", detail: "Redefining success metrics" },
      { topic: "Discovering where you thrive best", detail: "Identifying your optimal career path" }
    ],
    takeaways: [
      "Why entrepreneurship is glorified today",
      "The hidden realities of entrepreneurship",
      "The power of professionals and institutional builders",
      "Entrepreneurship vs employment: the wrong debate",
      "Discovering where you thrive best"
    ]
  },
  {
    id: "ws-june-2026",
    title: "Building in an Era of AI",
    date: new Date(2026, 5, 26, 20, 0), // June 26, 2026 8:00 PM
    time: "Friday, June 26, 2026 | 8:00 PM - 9:00 PM",
    duration: "60 Minutes",
    track: "Technology & Innovation",
    level: "All Levels",
    description: "This session explores how Artificial Intelligence is transforming industries, redefining the future of work, and creating new opportunities for innovation, entrepreneurship, and career growth. Participants will gain practical insights into how AI is influencing businesses while learning how to position themselves to thrive and build relevant solutions in an AI-driven world.",
    isActive: true,
    facilitator: {
      name: "Samuel Ufere",
      role: "AI Integration Expert",
      bio: "Samuel Ufere is a forward-thinking technologist specializing in AI implementation for modern businesses and careers.",
      avatar: "",
    },
    syllabus: [
      { topic: "Understanding the AI Revolution", detail: "Core concepts and the current landscape" },
      { topic: "AI across industries", detail: "Real-world applications and transformations" },
      { topic: "Building Businesses in the age of AI", detail: "Leveraging AI for startup growth and scale" },
      { topic: "The Future of work and Professional Relevance", detail: "Adapting skillsets for the AI era" },
      { topic: "AI for Founders and Builders", detail: "Practical tools and strategies for immediate use" }
    ],
    takeaways: [
      "Understanding the AI Revolution",
      "AI across industries",
      "Building Businesses in the age of AI",
      "The Future of work and Professional Relevance",
      "AI for Founders and Builders"
    ]
  },
  {
    id: "ws-july-2026",
    title: "Burnout Culture I: Worklife balance and your Mental Health",
    date: new Date(2026, 6, 31, 20, 0),
    time: "Friday, July 31, 2026 | 8:00 PM - 9:00 PM",
    duration: "60 Minutes",
    track: "Health & Wellness",
    level: "All Levels",
    description: "This session discusses the possibilities of work-life balance at the early stage of building and its effect on the mental health.",
    isActive: false,
    facilitator: {
      name: "Confidence Emmanuel",
      role: "Mental Health Professional",
      bio: "Confidence Emmanuel focuses on mental health advocacy and practical routines for high-performing professionals.",
      avatar: "",
    },
    syllabus: [
      { topic: "Effects of Burnout", detail: "Understanding the physical and psychological toll" },
      { topic: "Symptoms of poor mental health", detail: "Identifying early warning signs" },
      { topic: "Mental Health Care Routines", detail: "Building sustainable habits for resilience" }
    ],
    takeaways: [
      "Effects of Burnout",
      "Symptoms of poor mental health",
      "Mental Health Care Routines"
    ]
  },
  {
    id: "ws-august-2026",
    title: "Burnout Culture II: Nutrition and Physical Health for Professionals",
    date: new Date(2026, 7, 28, 20, 0),
    time: "Friday, August 28, 2026 | 8:00 PM - 9:00 PM",
    duration: "60 Minutes",
    track: "Health & Wellness",
    level: "All Levels",
    description: "This session discusses the possibilities of healthy nutrition for professionals and maintaining optimum physical health.",
    isActive: false,
    facilitator: {
      name: "Lois - Gojen Health",
      role: "Nutrition & Physical Health Expert",
      bio: "Lois from Gojen Health specializes in creating accessible health routines for busy founders and builders.",
      avatar: "",
    },
    syllabus: [
      { topic: "Dieting", detail: "Sustainable eating habits for energy and focus" },
      { topic: "Physical Activity", detail: "Integrating movement into a busy schedule" },
      { topic: "Healthcare Routines", detail: "Preventative care and physical maintenance" }
    ],
    takeaways: [
      "Dieting",
      "Physical Activity",
      "Healthcare Routines"
    ]
  },
  {
    id: "ws-september-2026",
    title: "Legal Protection for Early Stage Innovators",
    date: new Date(2026, 8, 25, 20, 0),
    time: "Friday, September 25, 2026 | 8:00 PM - 9:00 PM",
    duration: "60 Minutes",
    track: "Legal & Business",
    level: "All Levels",
    description: "This session discusses the necessary legal protection every early stage innovator should secure before scaling.",
    isActive: false,
    facilitator: {
      name: "Ifeoma",
      role: "Legal Counsel",
      bio: "Ifeoma provides expert legal guidance to startups, focusing on early-stage protection and compliance.",
      avatar: "",
    },
    syllabus: [
      { topic: "CAC", detail: "Navigating corporate registration and compliance" },
      { topic: "Legal Counsel", detail: "When and how to effectively engage legal help" },
      { topic: "NDA's", detail: "Protecting intellectual property and ideas" }
    ],
    takeaways: [
      "CAC",
      "Legal Counsel",
      "NDA's"
    ]
  },
  {
    id: "ws-october-2026",
    title: "Intrapreneurship",
    date: new Date(2026, 9, 30, 20, 0),
    time: "Friday, October 30, 2026 | 8:00 PM - 9:00 PM",
    duration: "60 Minutes",
    track: "Career & Leadership",
    level: "All Levels",
    description: "This session introduces the concept of intrapreneurship and visionary professionalism.",
    isActive: false,
    facilitator: {
      name: "TBA",
      role: "Industry Expert",
      bio: "Facilitator details will be announced soon.",
      avatar: "",
    },
    syllabus: [
      { topic: "Building influence within organizations", detail: "Strategies for internal leadership" },
      { topic: "Leadership without ownership", detail: "Driving initiatives as an employee" },
      { topic: "Driving innovation internally", detail: "Creating new value streams" },
      { topic: "Becoming indispensable professionally", detail: "Securing your role through impact" },
      { topic: "Career growth with purpose", detail: "Aligning organizational goals with personal vision" },
      { topic: "Organizational impact", detail: "Measuring and demonstrating value" }
    ],
    takeaways: [
      "Building influence within organizations",
      "Leadership without ownership",
      "Driving innovation internally",
      "Becoming indispensable professionally",
      "Career growth with purpose",
      "Organizational impact"
    ]
  }
];

export const allWorkshops = workshops;

export const getActiveWorkshop = (): WorkshopData => {
  return workshops.find(w => w.id === "ws-june-2026") || workshops[1];
};

export const getWorkshopById = (id: string): WorkshopData | undefined => {
  return workshops.find(w => w.id === id);
};

export const getOtherWorkshops = (excludeId: string): WorkshopData[] => {
  return workshops.filter(w => w.id !== excludeId);
};
