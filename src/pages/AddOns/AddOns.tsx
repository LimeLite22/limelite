import { ActorAddOn, AdditionalVideosAddOn, AfterHoursShotAddOn, AnimationAddOn, CandidPhotographyAddOn, DroneAddOn, GoAddOn, HDEditionAddOn, HDShootAddOn, HomeRentalAddOn, IdeationSessionAddOn, MakeUpAddOn, RawDeliveryAddOn, RushEditAddOn, ScriptAddOn, SecondCameraAddOn, StudioRentalAddOn, VoiceoverAddOn } from "assets/images";
import styles from "./AddOns.module.scss";
import { generateUniqueId } from "utils/generateId";
import AddOnItem from "./AddOnItem";
import { useState } from "react";
import useWindowWidth from "hooks/useWindowWidth";

const list = [
    {
        id: generateUniqueId(),
        header: 'Professional Actor',
        text: 'Professional Actors are comfortable in front of the camera, and can connect with your audiences in unique and meaningful ways. Whether you need a brand ambassador to introduce a new product, or a personality for a branded web series, a Professional Actor is a great way to engage an audience and boost sales. Price includes casting and auditions of local paid talent to perform on camera (scripted or unscripted) during an HD Shoot (≤ 90 minutes), and all usage rights (for web/social media usage only).',
        img: ActorAddOn,
        premium: true,
        price: '+$1,350'
    },
    {
        id: generateUniqueId(),
        header: 'Additional Videos',
        text: 'Professional Actors are comfortable in front of the camera, and can connect with your audiences in unique and meaningful ways. Whether you need a brand ambassador to introduce a new product, or a personality for a branded web series, a Professional Actor is a great way to engage an audience and boost sales. Price includes casting and auditions of local paid talent to perform on camera (scripted or unscripted) during an HD Shoot (≤ 90 minutes), and all usage rights (for web/social media usage only).',
        img: AdditionalVideosAddOn,
        premium: false,
        price: '+$895?'
    },
    {
        id: generateUniqueId(),
        header: 'After Hours Shoot',
        text: 'An After Hours Shoot is the ideal solution for projects with extenuating scheduling circumstances. The After Hours Shoot Add-on offers greater control and flexibility by allowing subscribers the ability to schedule shoots outside of normal business hours. Price includes over-time expenses for your LimeLite videographer and all accoutrements.',
        img: AfterHoursShotAddOn,
        premium: false,
        price: '+$195'
    },
    {
        id: generateUniqueId(),
        header: 'Logo Animation',
        text: 'An animated logo is a modern and dynamic way to present a brand mark in video format. The brand mark can be a company logo, product/service logo, or web series names/logos. Logo animations can add continuity, interest, and professionalism to your LimeLite videos. Price includes the development of 2-3 concepts with up to three rounds of revisions.',
        img: AnimationAddOn,
        premium: true,
        price: '+$895'
    },
    {
        id: generateUniqueId(),
        header: 'Candid Photography',
        text: 'Candid Photography can provide important assets to assist with the launch and promotion of any LimeLite Video campaign. For candid photos, authenticity is everything. Unlike portraits, which are carefully planned and staged to look perfect, candid shots are spontaneous and genuine. There is no posing. There is no direction from the photographer. Price includes a 90-minute photo shoot with a LimeLite photographer and basic color correction services. Advanced photo editing/Photoshop work is not included.',
        img: CandidPhotographyAddOn,
        premium: false,
        price: '+$695'
    },
    {
        id: generateUniqueId(),
        header: 'Drone Videography',
        text: `Drone Videography is a great way to elevate a LimeLite Video campaign. Drone footage offers dramatic aerial views that can make a powerful impression on your audience. The aerial footage will be stored in your library of video assets and can be used to enhance any/all of your LimeLite Videos. Price includes an additional Drone Shoot (≤ 90 minutes) with a LimeLite FAA Certified Drone Pilot.`,
        img: DroneAddOn,
        premium: false,
        price: '+$595'
    },
    {
        id: generateUniqueId(),
        header: 'LimeLite GO℠',
        text: `LimeLite GO℠ offers subscribers the ability to do a LimeLite shoot anywhere in the continental United States for a simple flat rate surcharge. Zones are based on proximity to a subscriber's primary place of business and/or billing address. Price includes all additional expenses for a LimeLite creator to travel anywhere in the continental United States (i.e., airfare, one night of accommodations, car rental, meals, fuel, etc.). An advance notice of ten (10) business days is required to avoid additional fees. Failure to provide advance notice may also have an impact on scheduling/availability.`,
        img: GoAddOn,
        premium: true,
        price: '+$0-1,495'
    },
    {
        id: generateUniqueId(),
        header: 'HD Edition',
        text: 'Professional Actors are comfortable in front of the camera, and can connect with your audiences in unique and meaningful ways. Whether you need a brand ambassador to introduce a new product, or a personality for a branded web series, a Professional Actor is a great way to engage an audience and boost sales. Price includes casting and auditions of local paid talent to perform on camera (scripted or unscripted) during an HD Shoot (≤ 90 minutes), and all usage rights (for web/social media usage only).',
        img: HDEditionAddOn,
        premium: false,
        price: '+$695?'
    },
    {
        id: generateUniqueId(),
        header: 'HD Shoot',
        text: 'Professional Actors are comfortable in front of the camera, and can connect with your audiences in unique and meaningful ways. Whether you need a brand ambassador to introduce a new product, or a personality for a branded web series, a Professional Actor is a great way to engage an audience and boost sales. Price includes casting and auditions of local paid talent to perform on camera (scripted or unscripted) during an HD Shoot (≤ 90 minutes), and all usage rights (for web/social media usage only).',
        img: HDShootAddOn,
        premium: false,
        price: '+$695?'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Home Rental',
        text: 'Looking for a unique or non-intrusive location for your shoot? Home rentals are ideal for testimonial inte',
        img: HomeRentalAddOn,
        premium: true,
        price: '+$695'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Ideation Session',
        text: 'Need a creative idea for your next video? Let our video marketing gurus create two fully-developed',
        img: IdeationSessionAddOn,
        premium: false,
        price: '+$395'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Make-up Artist',
        text: 'Adding a Make-up Artist can boost the level of professionalism for any LimeLite shoot. Our Make-up Artists provide a variety of services to ensure that talent/interviewees look their very best on camera—from simple shine and flyaway control, to correcting imperfections. Price includes the addition of a LimeLite Make-up Artist on a shoot with a professional make-up kit. ',
        img: MakeUpAddOn,
        premium: true,
        price: '+$600'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Delivery of Raw Footage',
        text: 'This add-on is available to subscribers who need access to the raw/unedited/uncolored video assets',
        img: RawDeliveryAddOn,
        premium: true,
        price: '+$245-495'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Rush Edit',
        text: `Let's face it, sometimes you need your videos/photos: yesterday. Well you're in luck! While our standard turnaround times are already lightning fast (averaging 7-10 business days), this add-on allows us to boot up the hyperdrive! Price includes all additional fees associated with rearranging post-production schedules, adding resources, and all overtime expenses. Prices are charged per video project.`,
        img: RushEditAddOn,
        price: '+$195-795'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Scriptwriting',
        text: 'Scriptwriting is the ideal solution for voiceover-driven LimeLite videos. The average adult can read ~300 words per minute, but can only follow speech at around 150 words per minute. Our scriptwriters know this, and they specialize in writing brief, conversational, and persuasive scripts. Price includes up to three telephone interviews with key stakeholders or subject-matter experts, scriptwriting with up to three rounds of revisions, and all usage rights (for web/social media usage only).',
        img: ScriptAddOn,
        premium: false,
        price: '+$895'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Second Camera',
        text: 'Adding a second camera to your LimeLite shoot can provide a deeper level of interest for viewers. When done properly, alternating camera angles can help with storytelling, and it gives the audience a change of pace. Price includes a second camera/angle. Does not include a second camera operator.',
        img: SecondCameraAddOn,
        premium: false,
        price: '+$395'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Studio Rental',
        text: 'A Studio Shoot offers a professional controlled environment for an HD shoot. The professional setting helps control lighting and sound. Price includes all studio usage fees during an HD Shoot  (≤ 90 minutes) and all usage rights (for web/social media usage only).',
        img: StudioRentalAddOn,
        premium: true,
        price: '+$595'
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Voiceover Artist',
        text: 'Adding a Voiceover Artist is the ideal solution for videos that do not have on camera talent (i.e., customers, employees, professional host, etc.). A Voiceover Artist is a trained professional and persuasive speaker who will deliver your script (≤ 3 Mins). Price includes casting, auditions (from our database of over 200,000 voiceover artists and more than 100 languages), recording session, and all usage rights (for web/social media usage only). Note: Add-ons are discounted s',
        img: VoiceoverAddOn,
        premium: false,
        price: '+$595'
    }


]

const AddOnsPage = () => {
    const [filter, setFilter] = useState('All Options');
    const width = useWindowWidth();
    return (
        <div>
            <div className={styles.page_header}>Add-ons</div>
            <div className={styles.page_types}>
                <div className={`${styles.page_types_item} ${filter === 'All Options' ? styles.page_types_item_active : ''}`} onClick={() => setFilter('All Options')} >{width > 768 ? 'All Options' : 'All Add-ons'}</div>
                <div className={`${styles.page_types_item} ${filter === 'Premium Add-ons' ? styles.page_types_item_active : ''}`} onClick={() => setFilter('Premium Add-ons')}>{width > 768 ? 'Premium Add-ons' : 'Premium'}</div>
                <div className={`${styles.page_types_item} ${filter === 'Standard Add-ons' ? styles.page_types_item_active : ''}`} onClick={() => setFilter('Standard Add-ons')}>{width > 768 ? 'Standard Add-ons' : 'Standard'}</div>
            </div>
            <div className={styles.page_list}>
                {
                    list.filter(item => filter === 'All Options' ? true : item.premium === (filter === 'Premium Add-ons')).map((item) => {
                        return (
                            <AddOnItem key={item.id} item={item} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AddOnsPage;