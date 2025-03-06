import { ActorAddOn, AdditionalVideosAddOn, AfterHoursShotAddOn, AnimationAddOn, CandidPhotographyAddOn, DroneAddOn, GoAddOn, HDEditionAddOn, HDShootAddOn, HomeRentalAddOn, IdeationSessionAddOn, MakeUpAddOn, RawDeliveryAddOn, RushEditAddOn, ScriptAddOn, SecondCameraAddOn, StudioRentalAddOn, VoiceoverAddOn } from "assets/images";
import styles from "./AddOns.module.scss";
import { generateUniqueId } from "utils/generateId";

const list = [
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: ActorAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: AdditionalVideosAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: AfterHoursShotAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: AnimationAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: CandidPhotographyAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: DroneAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: GoAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: HDEditionAddOn
    },
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: HDShootAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: HomeRentalAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: IdeationSessionAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: MakeUpAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: RawDeliveryAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: RushEditAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: ScriptAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: SecondCameraAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: StudioRentalAddOn
    }
    ,
    {
        id: generateUniqueId(),
        header: 'Header',
        text: 'Text',
        img: VoiceoverAddOn
    }


]

const AddOnsPage = () => {
    return (
        <div>
            add  AddOns
            <div className={styles.page_list}>
                {
                    list.map((item) => {
                        return (
                            <div key={item.id} className={styles.page_list_item}>

                                <img src={item.img} alt="" />
                                <div>{item.header}</div>
                                <div>{item.text}</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AddOnsPage;