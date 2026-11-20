export interface ServiceProgram {
  id: string;
  index: string;
  kicker: string;
  title: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  ctaLabel: string;
  duration: string;
  idealFor: string;
  deliverables: string[];
}

export interface TransformationCase {
  id: string;
  indexLabel: string;
  category: string;
  headline: string;
  clientName: string;
  timeframe: string;
  beforeSummary: string;
  afterSummary: string;
  quote: string;
  metrics: { label: string; value: string }[];
  beforeImage: string;
  afterImage: string;
  beforeCaption: string;
  afterCaption: string;
}

export interface WhyChooseUsItem {
  index: string;
  title: string;
  description: string;
  iconName: 'Award' | 'SlidersHorizontal' | 'Dumbbell' | 'Compass' | 'CalendarClock' | 'TrendingUp';
}

export interface BlogArticle {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedDate: string;
  author: string;
  content: string[];
  keyTakeaways: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteConfig {
  businessName: string;
  brandInitials: string;
  brandLocation: string;
  tagline: string;
  footerDescription: string;
  trainerName: string;
  trainerRole: string;
  trainerHeadlinePrimary: string;
  trainerHeadlineAccent: string;
  trainerIntro: string;
  trainerBio: string[];
  trainerStats: { value: string; label: string }[];
  trainerCredentials: { title: string; subtitle: string }[];
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    cityPostal: string;
    googleMapsUrl: string;
    instagramHandle: string;
    instagramUrl: string;
    facebookHandle: string;
    facebookUrl: string;
    openingHours: { days: string; hours: string }[];
    placeholderNotice: string;
  };
  hero: {
    kicker: string;
    headlineLines: [string, string, string];
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    whatsappCta: string;
    backdropImage: string;
    floatingFrames: {
      image: string;
      caption: string;
      alt: string;
    }[];
  };
  services: ServiceProgram[];
  transformations: TransformationCase[];
  whyChooseUs: WhyChooseUsItem[];
  blogArticles: BlogArticle[];
  faqs: FaqItem[];
}

/**
 * Centralized editable business configuration.
 * Replace placeholder studio details, pricing, and social links here to customize
 * the entire site for any fitness coach or gym facility.
 */
export const siteConfig: SiteConfig = {
  businessName: 'KORS PERFORMANCE',
  brandInitials: 'KP',
  brandLocation: 'PERFORMANCE STUDIO · NEW YORK',
  tagline: 'Strength. Conditioning. Longevity.',
  footerDescription:
    'Private strength coaching, structured hybrid programming, and practical performance nutrition built around demanding schedules.',
  trainerName: 'Marcus Vance',
  trainerRole: 'Head Coach & Performance Director',
  trainerHeadlinePrimary: 'A COACH IN YOUR CORNER.',
  trainerHeadlineAccent: 'NOT IN YOUR WAY.',
  trainerIntro:
    "I'm Marcus. I help busy professionals and dedicated athletes build measurable strength without putting the rest of life on hold.",
  trainerBio: [
    'You do not need another short-lived 6-week extreme challenge. You need progressive strength programming that respects your joints, nutrition habits you can actually sustain, and accountable coaching when work gets hectic.',
    'Over the past decade coaching in private strength studios, our approach has remained constant: master foundational mechanics, track meaningful load progression, and build habits that hold up on your busiest weeks.',
  ],
  trainerStats: [
    { value: '11+ yrs', label: 'Coaching Experience' },
    { value: '480+', label: 'Clients Coached' },
    { value: '94%', label: '6-Month Retention' },
  ],
  trainerCredentials: [
    {
      title: 'CSCS Strength & Conditioning',
      subtitle: 'Barbell biomechanics, hypertrophy, and athletic programming',
    },
    {
      title: 'Performance Nutrition Coaching',
      subtitle: 'Macro structure and sustainable dining habits without rigid bans',
    },
    {
      title: 'Client-First Private Facility',
      subtitle: 'Unrushed 1-on-1 coaching environment with calibrated equipment',
    },
  ],
  contact: {
    phoneDisplay: '+1 (555) 014-8920',
    phoneHref: 'tel:+15550148920',
    whatsappNumber: '15550148920',
    whatsappDefaultMessage:
      'Hello, I am interested in your fitness programs. Please share more information.',
    email: 'coaching@korsperformance.example',
    addressLine1: '418 Mercer Street, Studio 2B',
    addressLine2: 'Performance District',
    cityPostal: 'New York, NY 10013',
    googleMapsUrl: 'https://maps.google.com/?q=418+Mercer+Street+New+York+NY+10013',
    instagramHandle: '@korsperformance',
    instagramUrl: 'https://instagram.com/korsperformance',
    facebookHandle: 'Kors Performance Studio',
    facebookUrl: 'https://facebook.com/korsperformance',
    openingHours: [
      { days: 'Monday – Friday', hours: '06:00 AM – 09:00 PM' },
      { days: 'Saturday', hours: '07:30 AM – 06:00 PM' },
      { days: 'Sunday', hours: '09:00 AM – 03:00 PM' },
    ],
    placeholderNotice:
      'Editable studio placeholder details configured in src/config/siteConfig.ts.',
  },
  hero: {
    kicker: 'PRIVATE STRENGTH STUDIO & ONLINE COACHING',
    headlineLines: ['YOUR BODY.', 'YOUR STRENGTH.', 'YOUR NEXT LEVEL.'],
    supportingText:
      'Build strength. Improve performance. Transform your lifestyle with expert fitness coaching.',
    primaryCta: 'EXPLORE PROGRAMS',
    secondaryCta: 'BOOK YOUR FREE CONSULTATION',
    whatsappCta: 'WhatsApp Consultation',
    backdropImage: '/assets/images/transformation-deadlift.jpg',
    floatingFrames: [
      {
        image: '/assets/images/service-personal-training.jpg',
        caption: 'CONTROLLED STRENGTH',
        alt: 'Coach demonstrating controlled dumbbell curl form in studio',
      },
      {
        image: '/assets/images/blog-consistency.jpg',
        caption: 'CONDITIONING & ENDURANCE',
        alt: 'Athlete running along city waterfront at sunrise',
      },
      {
        image: '/assets/images/blog-strength.jpg',
        caption: 'PROGRESSIVE OVERLOAD',
        alt: 'Close-up of athlete gripping steel dumbbell on gym floor',
      },
      {
        image: '/assets/images/transformation-deadlift.jpg',
        caption: 'ONE REP AT A TIME',
        alt: 'Athlete setting up for heavy barbell deadlift in dark strength studio',
      },
    ],
  },
  services: [
    {
      id: 'personal-training',
      index: '01',
      kicker: 'IN STUDIO · PRIVATE COACHING',
      title: 'Personal Training',
      price: '$95',
      unit: '/ session (starting)',
      description:
        'Your goals, your pace, full coaching attention. Build technical mastery, lean muscle, and lasting confidence.',
      features: [
        '60-minute private coached session',
        'Custom strength & mobility block',
        'Real-time form & tempo feedback',
      ],
      image: '/assets/images/service-personal-training.jpg',
      imageAlt: 'Personal trainer guiding strength training session with dumbbells',
      ctaLabel: 'Book Personal Training',
      duration: '60 Minutes · 2–4x Weekly',
      idealFor:
        'Executives, beginners, or experienced lifters wanting hands-on technique refinement and structured accountability.',
      deliverables: [
        'Comprehensive movement & posture screen during session one',
        'Periodized 12-week progressive overload roadmap',
        'Access to private studio locker rooms and recovery tools',
        'Bi-weekly body composition and strength benchmark check-ins',
      ],
    },
    {
      id: 'gym-membership',
      index: '02',
      kicker: 'OPEN FLOOR · CALIBRATED GEAR',
      title: 'Gym Membership',
      price: '$145',
      unit: '/ month (starting)',
      description:
        'Unrestricted access to our private strength floor, calibrated competition racks, sled turf, and recovery lounge.',
      features: [
        'Capped member capacity — zero rack waits',
        'Competition barbells, turf & ergometers',
        'Monthly baseline strength review',
      ],
      image: '/assets/images/blog-strength.jpg',
      imageAlt: 'Calibrated steel dumbbell on dark rubberized gym floor',
      ctaLabel: 'Reserve Membership Tour',
      duration: 'Monthly Rolling · No Annual Lock-In',
      idealFor:
        'Self-directed lifters tired of crowded commercial gyms who value precision equipment and focused atmosphere.',
      deliverables: [
        'Keyless studio entry from 06:00 AM to 09:00 PM weekdays',
        'Eleiko & Rogue power racks, specialty bars, and calibrated plates',
        'Complimentary quarterly program audit with a floor coach',
        'Towel service, filtered hydration, and cold-plunge access',
      ],
    },
    {
      id: 'online-coaching',
      index: '03',
      kicker: 'ANYWHERE · YOUR SCHEDULE',
      title: 'Online Coaching',
      price: '$210',
      unit: '/ 4-week block (starting)',
      description:
        'Structured coaching that travels with you. Train around flights, gym access, and family commitments with weekly coach feedback.',
      features: [
        'Tailored gym or home training plan',
        'Weekly video form review & adjustments',
        'Direct coach messaging accountability',
      ],
      image: '/assets/images/service-online-coaching.jpg',
      imageAlt: 'Training block programming on laptop beside gym weights',
      ctaLabel: 'Start Online Coaching',
      duration: '4-Week Rolling Cycles',
      idealFor:
        'Frequent travelers and remote athletes who want expert programming and video technique feedback anywhere.',
      deliverables: [
        'Individualized weekly training split via dedicated coaching app',
        '48-hour turnaround on lifted-set video form breakdowns',
        'Travel hotel-gym swaps whenever your schedule shifts',
        'Sunday check-in adjustments based on fatigue and progress',
      ],
    },
    {
      id: 'nutrition-plans',
      index: '04',
      kicker: 'REAL FOOD · SUSTAINABLE HABITS',
      title: 'Nutrition Plans',
      price: '$115',
      unit: '/ personalized plan (starting)',
      description:
        'Fuel training and recovery without crash dieting. Practical meal frameworks built around your tastes and dining schedule.',
      features: [
        'Calorie & protein targets tailored to goals',
        'Repeatable weekday meal & prep templates',
        'Bi-weekly macro adjustments & support',
      ],
      image: '/assets/images/service-nutrition.jpg',
      imageAlt: 'Balanced high-protein meal bowl with grilled chicken, quinoa, and avocado',
      ctaLabel: 'Build Your Plan',
      duration: 'Initial Blueprint + 4-Week Follow-Up',
      idealFor:
        'Professionals seeking steady fat loss, lean muscle gain, and sharper afternoon energy without cutting out restaurants.',
      deliverables: [
        'Evidence-based energy & protein targets calibrated to training load',
        '15-minute weekday meal templates and grocery checklists',
        'Restaurant & travel ordering framework',
        'Two structured follow-up coaching calls to refine adherence',
      ],
    },
  ],
  transformations: [
    {
      id: 'claire-deadlift',
      indexLabel: '01',
      category: 'STRENGTH & CONFIDENCE · SAMPLE CASE',
      headline: 'From desk-bound stiffness to pulling a 115 kg deadlift.',
      clientName: 'Claire M., Product Architect (Illustrative Demo Profile)',
      timeframe: '16 Weeks · 3x Weekly Personal Training',
      beforeSummary:
        '10-hour desk days, recurring lower-back tightness, and zero structured weight room experience.',
      afterSummary:
        'Three focused 55-minute strength sessions per week, steady protein habits, and confident barbell mastery.',
      quote:
        'The real shift wasn’t just dropping two dress sizes—it was walking into the weight room knowing every movement had a purpose.',
      metrics: [
        { label: 'Deadlift 1RM', value: '45 kg → 115 kg' },
        { label: 'Body Fat Change', value: '-8.4% (16 wks)' },
        { label: 'Weekly Adherence', value: '96%' },
      ],
      beforeImage: '/assets/images/blog-consistency.jpg',
      afterImage: '/assets/images/transformation-deadlift.jpg',
      beforeCaption: 'WEEK 01 · BASELINE CONDITIONING & MOBILITY SCREEN',
      afterCaption: 'WEEK 16 · BARBELL STRENGTH PROGRESSION',
    },
    {
      id: 'daniel-recomp',
      indexLabel: '02',
      category: 'BODY RECOMPOSITION · SAMPLE CASE',
      headline: 'Rebuilding athletic lean mass during a demanding executive travel year.',
      clientName: 'Daniel K., Managing Partner (Illustrative Demo Profile)',
      timeframe: '20 Weeks · Hybrid Studio + Online Coaching',
      beforeSummary:
        'Frequent flights, skipped lunches, late client dinners, and declining upper-body strength.',
      afterSummary:
        'Hotel-adaptable dumbbell splits paired with high-protein travel dining rules and two studio sessions weekly.',
      quote:
        'Having a coach adjust my workouts around 6 a.m. flights kept momentum alive when I used to quit every October.',
      metrics: [
        { label: 'Waist Reduction', value: '-9.5 cm' },
        { label: 'Lean Mass Gain', value: '+3.8 kg' },
        { label: 'Resting HR', value: '68 → 54 bpm' },
      ],
      beforeImage: '/assets/images/service-online-coaching.jpg',
      afterImage: '/assets/images/service-personal-training.jpg',
      beforeCaption: 'WEEK 01 · REMOTE TRAVEL PROGRAMMING SETUP',
      afterCaption: 'WEEK 20 · STUDIO STRENGTH & HYPERTROPHY BLOCK',
    },
    {
      id: 'maya-nutrition',
      indexLabel: '03',
      category: 'PERFORMANCE & FUEL · SAMPLE CASE',
      headline: 'Dialing in strength nutrition to drop 11 kg while PRing every compound lift.',
      clientName: 'Hannah T., Architectural Designer (Illustrative Demo Profile)',
      timeframe: '24 Weeks · Nutrition Plan + Gym Membership',
      beforeSummary:
        'Undereating Monday–Thursday followed by weekend exhaustion and stalled progress on squats and presses.',
      afterSummary:
        'Consistent 135g daily protein anchor, pre-training carbohydrate timing, and structured progressive overload.',
      quote:
        'I stopped treating food like a punishment and started fueling like an athlete. Energy at 4 p.m. completely changed.',
      metrics: [
        { label: 'Scale Weight', value: '-11.2 kg' },
        { label: 'Back Squat', value: '40 kg → 85 kg' },
        { label: 'Energy Score', value: '4/10 → 9/10' },
      ],
      beforeImage: '/assets/images/blog-strength.jpg',
      afterImage: '/assets/images/service-nutrition.jpg',
      beforeCaption: 'WEEK 01 · BASELINE STRENGTH BENCHMARK',
      afterCaption: 'WEEK 24 · PERFORMANCE NUTRITION & RECOVERY',
    },
  ],
  whyChooseUs: [
    {
      index: '01',
      title: 'Certified Trainers',
      description:
        'Accredited strength and nutrition specialists who coach mechanics first and never hand you generic printouts.',
      iconName: 'Award',
    },
    {
      index: '02',
      title: 'Personalized Training',
      description:
        'Every split, rep tempo, and exercise selection is built around your injury history, limb leverage, and schedule.',
      iconName: 'SlidersHorizontal',
    },
    {
      index: '03',
      title: 'Modern Equipment',
      description:
        'Competition-grade calibrated plates, dual-pulley stations, conditioning sleds, and zero overcrowded wait times.',
      iconName: 'Dumbbell',
    },
    {
      index: '04',
      title: 'Expert Guidance',
      description:
        'Direct coach access between sessions for form video checks, travel swaps, and nutrition fine-tuning.',
      iconName: 'Compass',
    },
    {
      index: '05',
      title: 'Flexible Programs',
      description:
        'Train in-studio, remotely on business trips, or combine both seamlessly without losing progression continuity.',
      iconName: 'CalendarClock',
    },
    {
      index: '06',
      title: 'Results-Oriented Coaching',
      description:
        'Every 4-week block tracks measurable strength numbers, body composition trends, and recovery markers.',
      iconName: 'TrendingUp',
    },
  ],
  blogArticles: [
    {
      id: 'five-essential-workout-tips',
      category: 'TRAINING',
      readTime: '5 MIN READ',
      title: '5 Essential Workout Tips',
      excerpt:
        'A straightforward strength-training framework for busy schedules: master five patterns, log your weights, and progress patiently.',
      image: '/assets/images/blog-strength.jpg',
      imageAlt: 'Athlete gripping knurled steel dumbbell in strength gym',
      publishedDate: 'November 2026',
      author: 'Marcus Vance, CSCS',
      content: [
        'Most training plateaus have nothing to do with needing exotic exercises. They happen when workouts change every week, weights go untracked, and recovery gets treated as an afterthought.',
        '1. Anchor every week around fundamental movement patterns: a squat, a hip hinge, a horizontal push, a vertical pull, and loaded carries. Mastering five patterns beats rotating thirty random drills.',
        '2. Log every working set. Writing down the exact load and reps removes guesswork. When you beat last week by even one clean repetition or 2.5 kilograms, adaptation is guaranteed.',
        '3. Control the lowering phase. Taking two full seconds on the eccentric portion builds tendon resilience, recruits more muscle fibers, and eliminates sloppy momentum.',
        '4. Leave one to two quality reps in reserve on compound lifts so technique stays crisp while fatigue remains manageable across a 45-hour work week.',
        '5. Respect sleep as part of the program. Seven to eight hours of consistent sleep amplifies strength gains more reliably than any pre-workout supplement.',
      ],
      keyTakeaways: [
        'Repeat core compound movements for 8–12 weeks before swapping exercises.',
        'Track every working set in a logbook or app to verify progressive overload.',
        'Use a controlled 2-second eccentric tempo on every primary lift.',
      ],
    },
    {
      id: 'nutrition-for-better-performance',
      category: 'NUTRITION',
      readTime: '4 MIN READ',
      title: 'Nutrition for Better Performance',
      excerpt:
        'Fuel intense sessions and steady body composition without giving up social dinners. A practical protein-first meal structure.',
      image: '/assets/images/blog-nutrition.jpg',
      imageAlt: 'Nutrient-dense performance meal bowl with chicken, quinoa, and avocado',
      publishedDate: 'November 2026',
      author: 'Marcus Vance, CSCS',
      content: [
        'Extreme restriction almost always backfires within six weeks. Sustainable performance nutrition works because it establishes reliable anchors rather than rigid bans.',
        'Start by hitting a consistent daily protein target—roughly 1.6 to 2.0 grams per kilogram of target bodyweight. Spreading protein across three or four meals keeps muscle protein synthesis elevated and stabilizes afternoon appetite.',
        'Time your easily digested carbohydrates around training. A balanced meal 90 minutes prior—such as lean protein, rice or quinoa, and fruit—sharply improves bar speed and total work capacity.',
        'Keep weekday breakfasts and lunches 80% repeatable. When two daily meals run on autopilot, you retain complete flexibility for client lunches or Friday dinners without derailing your weekly average.',
      ],
      keyTakeaways: [
        'Anchor each main meal with 35–45g of high-quality protein.',
        'Cluster starchy carbohydrates around training windows for stronger output.',
        'Automate weekday breakfasts and lunches to leave room for social dining.',
      ],
    },
    {
      id: 'building-strength-and-consistency',
      category: 'MINDSET',
      readTime: '4 MIN READ',
      title: 'Building Strength and Consistency',
      excerpt:
        'Forget all-or-nothing motivation. Build a realistic training floor that survives deadlines, travel, and unpredictable weeks.',
      image: '/assets/images/blog-consistency.jpg',
      imageAlt: 'Athlete running beside city riverfront skyline in crisp morning light',
      publishedDate: 'October 2026',
      author: 'Marcus Vance, CSCS',
      content: [
        'Anyone can train five days a week when life is calm. Real transformation belongs to people who keep showing up during product launches, sick kids, and red-eye flights.',
        'The secret is defining a non-negotiable minimum floor. Instead of quitting the week because you missed Monday’s 60-minute session, switch to your 25-minute minimum: two compound movements and a brisk conditioning finisher.',
        'Treat training sessions like board meetings—locked onto your calendar at the same hour, with your gym bag packed the night before. Removing morning friction protects consistency better than willpower ever will.',
        'Strength is cumulative. Three solid workouts every week for a year will outperform twelve chaotic all-out weeks every single time.',
      ],
      keyTakeaways: [
        'Create a 25-minute "minimum viable workout" for chaotic travel weeks.',
        'Schedule workouts as fixed calendar appointments, not optional errands.',
        'Measure consistency over 90-day blocks rather than perfection in a single week.',
      ],
    },
  ],
  faqs: [
    {
      id: 'faq-membership',
      question: 'What is included in a Gym Membership?',
      answer:
        'Memberships include keyless studio access during all operating hours, calibrated power racks, turf conditioning lane, locker rooms with towel service, and a quarterly strength benchmark review. Member count is capped so you never wait for a rack.',
    },
    {
      id: 'faq-beginner',
      question: 'I am new to strength training. Is Personal Training suitable for beginners?',
      answer:
        'Yes. Around half of our private coaching clients start with little or no barbell experience. Every new client begins with a movement screen so loads, ranges of motion, and pacing match your current mobility and confidence.',
    },
    {
      id: 'faq-programs',
      question: 'How are the training programs structured?',
      answer:
        'Programs run in focused 4-week mesocycles inside a broader 12-week progression. Whether you train 2, 3, or 4 days per week, your plan balances compound strength lifts, joint-friendly hypertrophy, and cardiovascular conditioning.',
    },
    {
      id: 'faq-pricing',
      question: 'How does pricing work and are there long-term contracts?',
      answer:
        'Indicative starting rates are listed transparently on each program card: Personal Training from $95/session, Gym Membership from $145/month, Online Coaching from $210 per 4-week block, and Nutrition Plans from $115. Memberships and online coaching run month-to-month with no lock-in contracts.',
    },
    {
      id: 'faq-consultation',
      question: 'What happens during the free consultation?',
      answer:
        'Your 30-minute consultation—either in-studio or by phone/video—covers your training history, injury considerations, schedule constraints, and 90-day goals. You leave with a clear program recommendation and zero sales pressure.',
    },
    {
      id: 'faq-online',
      question: 'Can I switch between Online Coaching and in-studio sessions if I travel?',
      answer:
        'Yes. Many clients use a hybrid approach: coaching in-studio while in town and seamlessly switching to hotel or remote workouts in our coaching app whenever work takes them on the road.',
    },
  ],
};
