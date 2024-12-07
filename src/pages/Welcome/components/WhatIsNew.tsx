import {
	A11y,
	Keyboard,
	Mousewheel,
	Navigation,
	Pagination,
	Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import styles from "../Welcome.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { generateUniqueId } from "utils/generateId";

const WhatisNew = (): JSX.Element => {
	const [position, setPosition] = useState(0);
	const windowWidth = useWindowWidth();
	const value = windowWidth > 1024 ? 5 : windowWidth < 768 ? 7 : 6;
	const ChangeSlide = ({ position }: { position: number }) => {
		const swiper = useSwiper();
		useEffect(() => {
			if (swiper) {
				swiper.slideTo(position);
			}
		}, [swiper, position]);
		return null;
	};
	return (
		<div className={styles.welcomeContainer__content_main_whatIsNew}>
			<div className={styles.welcomeContainer__content_main_whatIsNew_text}>
				What’s New
			</div>
			<div
				className={styles.welcomeContainer__content_main_whatIsNew_cardsList}
			>
				<Swiper
					modules={[
						Navigation,
						Pagination,
						Scrollbar,
						A11y,
						Keyboard,
						Mousewheel,
					]}
					allowTouchMove={windowWidth > 768 ? false : true}
					spaceBetween={16}
					draggable={false}
					scrollbar={{ draggable: false }}
					slidesPerView={windowWidth > 1440 ? 6 : 5}
					className={
						styles.welcomeContainer__content_main_whatIsNew_cardsList_swiper
					}
				>
					<ChangeSlide position={position} />
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type1}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_education}`}
						>
							EDUCATIONAL
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							Create FOMO: How Event Recap Videos Drive Future Attendance
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type2}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_company}`}
						>
							COMPANY
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							Create FOMO: How Event Recap Videos Drive Future Attendance
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type3}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_education}`}
						>
							EDUCATIONAL
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							From Good to Great: How to Give Constructive Editing Feedback
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type4}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_explainers}`}
						>
							EXPLAINERS
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							LimeLite 101: Get the most out of Your LimeLite subscription
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type1}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_drone}`}
						>
							DRONE
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							From Good to Great: How to Give Constructive Editing Feedback
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type2}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_education}`}
						>
							EDUCATIONAL
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							From Good to Great: How to Give Constructive Editing Feedback
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type3}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_explainers}`}
						>
							EXPLAINERS
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							From Good to Great: How to Give Constructive Editing Feedback
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_type4}`}
					>
						<div
							className={` ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header} ${styles.welcomeContainer__content_main_whatIsNew_cardItem_header_company}`}
						>
							COMPANY
						</div>
						<div
							className={
								styles.welcomeContainer__content_main_whatIsNew_cardItem_text
							}
						>
							From Good to Great: How to Give Constructive Editing Feedback
						</div>
					</SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={styles.welcomeContainer__content_main_whatIsNew_cardItem}
					></SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={styles.welcomeContainer__content_main_whatIsNew_cardItem}
					></SwiperSlide>
					<SwiperSlide
						key={generateUniqueId()}
						className={
							styles.welcomeContainer__content_main_whatIsNew_cardItem
						}
					></SwiperSlide>
					{windowWidth < 768 && (
						<>
							<SwiperSlide
								key={generateUniqueId()}
								className={
									styles.welcomeContainer__content_main_whatIsNew_cardItem
								}
							></SwiperSlide>
						</>
					)}
				</Swiper>
			</div>
			<div
				className={
					styles.welcomeContainer__content_main_whatIsNew_cardsList_bullets
				}
			>
				<button
					className={
						styles.welcomeContainer__content_main_whatIsNew_cardsList_bullets_back
					}
					onClick={() => position > 0 && setPosition(position - 1)}
				></button>
				<button
					onClick={() => position < value && setPosition(position + 1)}
					className={
						styles.welcomeContainer__content_main_whatIsNew_cardsList_bullets_forward
					}
				></button>
			</div>
		</div>
	);
};

export default WhatisNew;
