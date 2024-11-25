import {
	A11y,
	Keyboard,
	Mousewheel,
	Navigation,
	Pagination,
	Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import styles from "../../Welcome.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import InspirationItem from "./InspirationItem";
import { data } from "./data";
const Inspiration = (): JSX.Element => {
	const [position, setPosition] = useState(0);
	const windowWidth = useWindowWidth();
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
		<div className={styles.welcomeContainer__content_main_inspiration}>
			<div className={styles.welcomeContainer__content_main_inspiration_text}>
				Inspiration
			</div>
			<div
				className={styles.welcomeContainer__content_main_inspiration_cardsList}
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
					slidesPerView={windowWidth > 1440 ? 9 : 7}
					className={
						styles.welcomeContainer__content_main_inspiration_cardsList_swiper
					}
				>
					<ChangeSlide position={position} />
					<SwiperSlide
						className={
							styles.welcomeContainer__content_main_inspiration_cardItem
						}
					>
						{" "}
						<InspirationItem />
					</SwiperSlide>
					{data.map((item) => (
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_inspiration_cardItem
							}
						>
							<div
								className={
									styles.welcomeContainer__content_main_inspiration_cardItem_img
								}
							>
								<img src={item.img} alt={"CompanyOverviewIcon"} />
							</div>{" "}
							<div
								className={
									styles.welcomeContainer__content_main_inspiration_cardItem_header
								}
							>
								{item.header}
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_inspiration_cardItem_text
								}
							>
								{item.text}
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_inspiration_cardItem_downArrow
								}
							></div>
						</SwiperSlide>
					))}
					<SwiperSlide></SwiperSlide>
					<SwiperSlide></SwiperSlide>
					<SwiperSlide></SwiperSlide>
					<SwiperSlide></SwiperSlide>
					<SwiperSlide></SwiperSlide>
				</Swiper>
			</div>
			<div
				className={
					styles.welcomeContainer__content_main_inspiration_cardsList_bullets
				}
			>
				<button
					className={
						styles.welcomeContainer__content_main_inspiration_cardsList_bullets_back
					}
					onClick={() => {
						position > 2 && setPosition(position - 3);
					}}
				></button>
				<button
					onClick={() => {
						position < data.length - 3 && setPosition(position + 3);
					}}
					className={
						styles.welcomeContainer__content_main_inspiration_cardsList_bullets_forward
					}
				></button>
			</div>
		</div>
	);
};

export default Inspiration;
