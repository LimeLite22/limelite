import { NewRequestIcon } from "assets/images";
import useWindowWidth from "hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

const Projects = () => {
	const [position, setPosition] = useState(0);
	const text = "Maecenas egestas est eget cras sed morbi est";
	const width = useWindowWidth();
	const requestWidth = width - 32;
	const isTablet = width < 1024;
	const navigate = useNavigate();

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
		<div className={styles.welcomeContainer__content_main_projects}>
			<div className={styles.welcomeContainer__content_main_projects_text}>
				Projects
			</div>
			<div className={styles.welcomeContainer__content_main_projects_content}>
				<div
					className={
						styles.welcomeContainer__content_main_projects_content_projectsList
					}
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
						allowTouchMove={window.innerWidth > 768 ? false : true}
						spaceBetween={16}
						draggable={false}
						scrollbar={{ draggable: false }}
						slidesPerView={4}
						className={
							styles.welcomeContainer__content_main_projects_content_projectsList_swiper
						}
					>
						<ChangeSlide position={position} />
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_projects_content_projectItem
							}
						>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_line
								}
							></div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_header
								}
							>
								Television Commercial{" "}
								<div
									className={
										styles.welcomeContainer__content_main_projects_content_projectItem_header_status
									}
								>
									{" "}
									<div
										className={
											styles.welcomeContainer__content_main_projects_content_projectItem_header_status_scheduled
										}
									>
										{" "}
									</div>
									SCHEDULED
								</div>
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_text
								}
							>
								Shoot + Edit
								<div
									className={
										styles.welcomeContainer__content_main_projects_content_projectItem_text_info
									}
								>
									2 credits
								</div>
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_subText
								}
							>
								Testimonial Video
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_subText
								}
							>
								Requested by Leah Z.
							</div>
						</SwiperSlide>
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_projects_content_projectItem
							}
						>
							{" "}
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_header
								}
							>
								{text.length > 30 && isTablet
									? text.substring(0, 30) + "..."
									: text}
								<div
									className={
										styles.welcomeContainer__content_main_projects_content_projectItem_header_status
									}
								>
									{" "}
									<div
										className={
											styles.welcomeContainer__content_main_projects_content_projectItem_header_status_pending
										}
									>
										{" "}
									</div>
									PENDING
								</div>
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_line
								}
							></div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_text
								}
							>
								Shoot Only
								<div
									className={
										styles.welcomeContainer__content_main_projects_content_projectItem_text_info
									}
								>
									1 credit
								</div>
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_subText
								}
							>
								Event Recap Shoot
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_subText
								}
							>
								Requested by Clay G.
							</div>
						</SwiperSlide>
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_projects_content_projectItem
							}
						>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_line
								}
							></div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_header
								}
							>
								Television Commercial{" "}
								<div
									className={
										styles.welcomeContainer__content_main_projects_content_projectItem_header_status
									}
								>
									{" "}
									<div
										className={
											styles.welcomeContainer__content_main_projects_content_projectItem_header_status_scheduled
										}
									>
										{" "}
									</div>
									SCHEDULED
								</div>
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_text
								}
							>
								Shoot + Edit
								<div
									className={
										styles.welcomeContainer__content_main_projects_content_projectItem_text_info
									}
								>
									2 credits
								</div>
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_subText
								}
							>
								Testimonial Video
							</div>
							<div
								className={
									styles.welcomeContainer__content_main_projects_content_projectItem_subText
								}
							>
								Requested by Leah Z.
							</div>
						</SwiperSlide>
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_projects_content_newRequest
							}
							style={
								width > 768
									? {}
									: {
										minWidth: `${requestWidth}px`,
										width: `${requestWidth}px`,
										maxWidth: `${requestWidth}px`,
									}
							}
							onClick={() => {
								navigate("/newRequest/start");
							}}
						>
							<img src={NewRequestIcon} alt={"NewRequestIcon"} />
							New Request
						</SwiperSlide>
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_projects_content_projectSpaceItem
							}
						></SwiperSlide>
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_projects_content_projectSpaceItem
							}
						></SwiperSlide>
						<SwiperSlide
							className={
								styles.welcomeContainer__content_main_projects_content_projectSpaceItem
							}
						></SwiperSlide>
					</Swiper>
				</div>
			</div>
			<div
				className={
					styles.welcomeContainer__content_main_projects_content_projectsList_bullets
				}
			>
				<button
					className={
						styles.welcomeContainer__content_main_projects_content_projectsList_bullets_back
					}
					onClick={() => position > 0 && setPosition(position - 1)}
				></button>
				<button
					onClick={() => position < 3 && setPosition(position + 1)}
					className={
						styles.welcomeContainer__content_main_projects_content_projectsList_bullets_forward
					}
				></button>
			</div>
		</div>
	);
};
export default Projects;
