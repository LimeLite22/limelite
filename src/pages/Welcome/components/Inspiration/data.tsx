import {
  AnnouncementVideos,
  CompanyOverviewIcon,
  DemoVideosIcon,
  EducationVideo,
  EventRecaps,
  FAQS,
  Fundrasing,
  HRRecruiting,
  HypeSizzle,
  Interviews,
  Photography,
  ProductServiceVideos,
  SocialMedia,
  TelevisionCommercials,
  TestimonialsCaseStudies,
  WebsiteHeaderVideos,
} from "assets/images";
import { generateUniqueId } from "utils/generateId";
export interface IInspiration {
  id: string;
  img: string;
  header: string;
  text: string;
  header2: string;
  text2: string;
  text3: string;
  title1?: string;
  title2?: string;
}

export const inspirationsList: IInspiration[] = [
  {
    id: generateUniqueId(),
    img: AnnouncementVideos,
    header: 'Announcement Videos',
    text: 'Share significant news & information',
    header2: 'Announcement Videos are the Digital Confetti Cannon Needed to Make your Message Pop',
    text2: `Announcement Videos are brief and engaging videos designed to highlight 
  significant news, updates, and information! Let's face it, video is the best way 
  to capture your audience's attention and drive engagement—esepcially compared 
  to static social media posts or email blasts! And that's why announcement videos 
  are perfect for unveiling new products and services, celebrating major milestones, 
  and highlighting achievements, awards, or other noteworthy updates. `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first announcement video!`
  },
  {
    id: generateUniqueId(),
    img: CompanyOverviewIcon,
    header: 'Company Overview',
    text: 'Introduce your organization with video',
    header2: 'Company Overview Videos Are No Longer Optional: They’re Essential',
    text2: `
    Introduce your organization with an engaging video that highlights your mission, 
    vision, and values. Video marketing harnesses the power of visual storytelling to 
    capture attention and enhance retention. With compelling visuals and emotive narratives, 
    you can connect on a deeper level, encouraging trust and brand loyalty. A well-crafted 
    company overview video not only showcases your organization’s strengths but also sets you 
    apart in a competitive market. Embrace video to effectively elevate your brand and drive 
    meaningful engagement.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create 
    your first company overview video!`
  },
  {
    id: generateUniqueId(),
    img: DemoVideosIcon,
    header: 'Demo Videos',
    text: 'Showcase your solutions in action',
    header2: 'Offer Customers a Guided Tour of Your Solutions with Engaging Demo Videos',
    text2: `Showcase your solutions in action with engaging demo videos that highlight functionality 
    and illustrate real-world applications. Demo videos are perfect for a wide variety of purposes, 
    including new products, software, and customer education. They harness the power of video marketing to 
    captivate your audience, making complex information more digestible and engaging. By demonstrating how 
    your solutions work, you can build trust and credibility with potential customers while showcasing your 
    unique value. Embrace video marketing to enhance your brand visibility and drive meaningful engagement, 
    converting interest into lasting customer relationships.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first demo video!`
  },
  {
    id: generateUniqueId(),
    img: EducationVideo,
    header: 'Educational Videos',
    text: 'An engaging way to inform and inspire',
    header2: 'Redefine the Learning Experience with Compelling Video Content',
    text2: `Educational videos are an engaging way to bring concepts to life and inform and 
    inspire your audience. Video has proven to be a powerful tool for communication, 
    with studies* showing that 72% of customers prefer watching a video to learn more about a 
    topic¹. Additionally, video content can increase information retention by up to 65%, making 
    it an effective medium for learning². By incorporating captivating visuals and narratives, you 
    can inform your audience effectively while also sparking inspiration. Embrace the power of video 
    to create impactful messages that resonate and engage viewers on a deeper level.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first educational video!`,
    title1: '1. Wyzowl. (2024). The State of Video Marketing 2024. Retrieved from Wyzowl',
    title2: '2. Forrester Research. (2025). The Total Economic Impact of the Video Marketing Platform.'
  },
  {
    id: generateUniqueId(),
    img: EventRecaps,
    header: 'Event Recaps',
    text: 'Amplify your events and create FOMO',
    header2: 'Event Recap Videos: Your Secret Weapon for Driving Attendance and Creating FOMO',
    text2: `Amplify your events and create FOMO with an engaging video that highlights 
    key moments, captures excitement, and drives future attendance. Event recap videos are 
    perfect for a variety of business functions, including conferences, seminars, product launches, 
    and team-building activities. Data shows that events promoted with video can achieve a 49% 
    increase in future attendance, demonstrating the power of visual storytelling in attracting 
    participants¹. By showcasing the energy and insights from your past gatherings, you engage 
    viewers and entice them to join future events. Leverage the effectiveness of video to enhance 
    your event marketing strategy and drive engagement.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first event recap video!`,
    title1: '1. MarketingProfs: "Video Marketing Statistics: The Impact of Video on Engagement and Attendance"—specific reports might vary each year.',
  },
  {
    id: generateUniqueId(),
    img: EventRecaps,
    header: 'Explainers',
    text: 'Simplify complex ideas with video ',
    header2: 'Keep it Simple, Show it with an Explainer Videos',
    text2: `Simplify complex ideas with video by using engaging visuals and clear narratives that 
    make your message easy to understand and memorable. Explainer videos are an excellent way to break 
    down complex products and services into digestible concepts. Studies show that decision-makers are 
    64% more likely to purchase after watching an explainer video¹. Additionally, these videos can 
    increase engagement on social media by up to 1,200%². By effectively capturing attention and clearly 
    explaining key points, explainer videos enhance your marketing strategy, ensuring your audience grasps 
    the full value of your offerings.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first explainer video!`,
    title1: '1. Wyzowl. (2021). The State of Video Marketing 2021. Retrieved from Wyzowl',
    title2: '2. Animoto. (2021). The State of Social Video 2021: Marketing in a Video-Driven World. Retrieved from Animoto',
  },
  {
    id: generateUniqueId(),
    img: FAQS,
    header: 'FAQ',
    text: 'Provide answers to common questions',
    header2: 'Level Up Your FAQs with Video to Drive Engagement and Boost Your Search Rankings',
    text2: `
    Provide answers to common questions with video to ensure your audience receives clear, visual guidance. 
    FAQ videos are versatile tools for businesses, suitable for a wide range of purposes. You can use them for 
    everything from onboarding new employees and training staff to addressing customer inquiries about 
    products or services. These videos can clarify policies, explain features, or guide clients through 
    processes, enhancing the customer experience. By addressing FAQs visually, you create a more engaging 
    and informative resource that can increase retention and satisfaction, ultimately fostering stronger 
    relationships with your audience and to drive sales.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first FAQ video!`,
  },
  {
    id: generateUniqueId(),
    img: Fundrasing,
    header: 'Fundraising',
    text: 'Use video to drive more donations',
    header2: 'Drive Higher Donations with Compelling Fundraising Videos',
    text2: `
    Use video to drive more donations by creating emotional connections that resonate with your 
    audience and inspire action. Fundraising videos can be a powerful tool for non-profits, allowing 
    organizations to share compelling stories that highlight their mission and impact. There is no better 
    way to demonstrate how beneficiaries are impacted by donations. Additionally, cause marketing videos can 
    help build community support by effectively communicating the urgency of a need. By leveraging the 
    emotional appeal of video, non-profits can engage their audiences on a deeper level, ultimately increasing 
    donations and fostering long-term support for important initiatives.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first fundraising video!`,
  },
  {
    id: generateUniqueId(),
    img: HRRecruiting,
    header: 'HR/Recruiting',
    text: 'Showcase culture and attract talent',
    header2: 'Improve Talent Acquisition, Retention, and Training with Video Marketing',
    text2: `
    Showcase your organization's culture and attract top talent with engaging HR/Recruiting videos. 
    Let's face it: video is the best way to showcase your team's culture, values, and mission. From 
    recruiting and onboarding videos to training and culture videos, there is no better way to engage with 
    job candidates and employees. By incorporating video content into your recruiting strategy, organizations 
    can improve talent acquisition, retention, training, and compliance.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first HR/Recruiting video!`,
  },
  {
    id: generateUniqueId(),
    img: HypeSizzle,
    header: 'Hype/Sizzle',
    text: 'Create excitement and anticipation',
    header2: 'Turn Up the Heat and Make Your Brand Sizzle!',
    text2: `
    Create excitement and anticipation with a sizzle video to captivates and engage your 
    audience. Sizzle videos can be used for product launches, event promotions, or brand 
    storytelling, making them a versatile tool in your marketing toolkit. With studies showing that 
    videos can increase engagement by up to 1,200%, they are essential for grabbing attention in today's 
    fast-paced digital landscape¹. By combining dynamic visuals, fast-paced editing, and compelling music, 
    sizzle videos effectively convey your message and inspire action, helping to drive interest and conversions 
    for your brand.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first hype/sizzle video.`,
    title1: '1. Animoto. (2024). The State of Social Video 2024: Marketing in a Video-Driven World. Retrieved from Animoto',
  },
  {
    id: generateUniqueId(),
    img: Interviews,
    header: 'Interviews',
    text: 'Capture insights from interviewees on camera',
    header2: 'Amplify Messages with On-Camera Interviews',
    text2: `
    Capture insights from interviewees on-camera to present unique viewpoints, foster engagement, and 
    create compelling visual content. Video interviews help create authentic and emotional connections by 
    allowing viewers to see facial expressions and body language in real time. This dynamic approach not only 
    captures attention but also improves retention of information. Video interviews can effectively communicate 
    complex ideas and provide diverse perspectives that resonate with audiences. Additionally, on-camera 
    interviews can be easily shared across multiple platforms, increasing reach and engagement. By utilizing 
    video, you can amplify your messages and create a lasting impact on your viewers.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first interview video. `,
  },
  {
    id: generateUniqueId(),
    img: Photography,
    header: 'Candid Photography',
    text: 'Capture authentic and candid images',
    header2: 'The Best Photographs are the Unplanned Ones',
    text2: `
    Photography is a great way to capture authentic and candid moments that convey emotions that 
    resonate with your audience. Candid photography involves taking spontaneous or unposed shots, allowing 
    subjects to express genuine reactions and feelings. This style is ideal for documenting events, culture, 
    products, and services. It creates a narrative that highlights the natural flow of your organization, 
    making stories relatable and memorable. Candid photography can also enhance marketing materials and showcase 
    the true essence of a brand by fostering a deeper connection with potential customers through authentic 
    visual storytelling.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to schedule your first candid photo shoot.`,
  },
  {
    id: generateUniqueId(),
    img: ProductServiceVideos,
    header: 'Product & Service Videos',
    text: 'Highlight products & services',
    header2: 'A Great Product or Service Video can Do the Job of a Thousand Salespeople',
    text2: `
    Highlight products and services in video format to engage customers, showcase features and benefits, and 
    drive sales. Video is a powerful medium that can reach a wider audience and create meaningful connections. 
    Product and service videos can be shared on various platforms, including websites, social media, and trade 
    shows. In addition, product and service videos can enhance direct sales presentations. Let your sales team 
    focus on building relationships, and leave it to your videos to communicate your value proposition and key 
    features and benefits.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first product or service video.`,
  },
  {
    id: generateUniqueId(),
    img: SocialMedia,
    header: 'Social Media',
    text: 'Create scroll-stopping videos',
    header2: 'Unlock Engagement with Snackable, Scroll-Stopping Videos for Social Media ',
    text2: `
    Create snackable, scroll-stopping videos for social media to deliver impactful messages, expand your 
    reach, and drive engagement. These dynamic videos are ideal for various platforms, including Facebook, 
    Instagram, TikTok, and LinkedIn. Each platform has its unique audience and style, making short videos an 
    effective way to convey your brand's message creatively. Studies show that videos on social media can 
    increase engagement by up to 1,200%¹. By leveraging the popularity of video content across social media 
    channels, you can enhance your visibility and foster deeper connections with your audience, ultimately 
    driving positive results for your brand.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first social media video.`,
    title1: '1. Animoto. (2024). The State of Social Video 2024: Marketing in a Video-Driven World. Retrieved from Animoto',
  },
  {
    id: generateUniqueId(),
    img: SocialMedia,
    header: 'Television Commercials',
    text: 'Drive sales and awareness on TV',
    header2: 'Cast a Wider Net and Reel in Your Audience with TV Commercials',
    text2: `
    Create a television commercial to showcase your brand, engage viewers, and deliver impactful messages 
    to a wider audience. Traditional television commercials can cost tens of thousands of dollars to produce, 
    making it challenging for many businesses to access this medium. However, LimeLite allows subscribers to 
    create quality content at a fraction of the price. With strategic storytelling and compelling visuals, 
    television commercials can effectively communicate value propositions, increase brand awareness, and 
    significantly enhance reach without breaking the bank.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first telvision commercial.`,
  },
  {
    id: generateUniqueId(),
    img: TelevisionCommercials,
    header: 'Television Commercials',
    text: 'Drive sales and awareness on TV',
    header2: 'Cast a Wider Net and Reel in Your Audience with TV Commercials',
    text2: `
    Create a television commercial to showcase your brand, engage viewers, and deliver impactful messages 
    to a wider audience. Traditional television commercials can cost tens of thousands of dollars to produce, 
    making it challenging for many businesses to access this medium. However, LimeLite allows subscribers to 
    create quality content at a fraction of the price. With strategic storytelling and compelling visuals, 
    television commercials can effectively communicate value propositions, increase brand awareness, and 
    significantly enhance reach without breaking the bank.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first telvision commercial.`,
  },
  {
    id: generateUniqueId(),
    img: TestimonialsCaseStudies,
    header: 'Testimonials/Case Studies',
    text: 'Build credibility with customer stories',
    header2: 'Seeing Is Believing: The Value of Video Testimonials',
    text2: `
    Human behavior is greatly influenced by the opinions of others. Customer testimonials can 
    significantly impact potential clients, increasing their interest in your products and services. 
    Video testimonials build trust and lend credibility while offering emotional storytelling that drives 
    sales. When prospects see a proven track record, they are likely to become customers. This format fosters 
    confidence, boosts engagement with your brand, and ultimately leads to more conversions and sustained 
    relationships.
    `,
    text3: `Unlock the potential of your LimeLite subscription—click here to create your first video testimonial!`,
  },
  {
    id: generateUniqueId(),
    img: WebsiteHeaderVideos,
    header: 'Website Hero Video',
    text: 'Take your website the next level',
    header2: 'Hero Status: Take Your Website to New Heights with Video',
    text2: `
    Take your website to the next level with dynamic video content of your products or services. A 
    compelling hero video immediately captures visitors' attention and sets the tone for their experience. It 
    allows you to communicate your brand's message, values, and unique offerings in an engaging format. By 
    using dynamic visuals and storytelling, hero videos create an emotional connection with your audience, 
    encouraging them to explore further. Additionally, hero videos can boost conversion rates, as they provide 
    impactful insights into your products or services. Leverage the power of video in your hero section to 
    elevate user engagement and drive results.
    `,
    text3: `Unlock the power of your LimeLite subscription—click here to create your first website header video.`,
  },
]


export const embedCode1 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/6pwgst2yo3?web_component=true&seo=true" title="Miami Dolphins Case Study Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/player.js" async></script>
`;
export const embedCode2 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/iaz5uzdwi9?web_component=true&seo=true" title="Unstoppable Grit Cast Study: C&amp;S Machining Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/player.js" async></script>
`;
export const embedCode3 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/42u6l6wdkg?web_component=true&seo=true" title="Alaska Patient Testimonial Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/player.js" async></script>
`;
export const embedCode4 = `
<div class="wistia_responsive_padding" style="padding:42.08% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/8gfokniusp?web_component=true&seo=true" title="Rowe Manufacturing Testimonial Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/player.js" async></script>
`;
export const embedCode5 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/e67mn037dl?web_component=true&seo=true" title="Tri Health Employee Testimonial Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/player.js" async></script>
`;

export const embedCode6 = `
<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/bwfpxfuimp?web_component=true&seo=true" title="Myriad Genetics Patient Testimonial Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/player.js" async></script>
`;
