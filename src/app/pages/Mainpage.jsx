import React from 'react';
import Link from 'next/link';
const MainPage = ({ handleNewProjectClick }) => {
	return (
		<main className="page">
			<div className="wrapper">
				<div className="content">
					<h1 className="content__title">ProjCraft</h1>
					<div className="content__inner">
						<button className="content__new" onClick={handleNewProjectClick}>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_4_64)">
									<path
										d="M13.1875 9.28125H10.6875V6.8125C10.6875 6.4375 10.375 6.125 9.96875 6.125C9.59375 6.125 9.28125 6.4375 9.28125 6.84375V9.3125H6.8125C6.4375 9.3125 6.125 9.625 6.125 10.0312C6.125 10.4062 6.4375 10.7187 6.84375 10.7187H9.3125V13.1875C9.3125 13.5625 9.625 13.875 10.0312 13.875C10.4062 13.875 10.7187 13.5625 10.7187 13.1562V10.6875H13.1875C13.5625 10.6875 13.875 10.375 13.875 9.96875C13.875 9.59375 13.5625 9.28125 13.1875 9.28125Z"
										fill="white"
									/>
									<path
										d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.8125 19.4688 10.0312 19.4688C15.25 19.4688 19.5 15.2188 19.5 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.5625 18.0625 10C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_4_64">
										<rect width="20" height="20" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<span className="content__caption"> New project </span>
						</button>
						<Link href="/vault">
							<button className="content__vault">
								<svg
									width="21"
									height="20"
									viewBox="0 0 21 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M18 4.16667C18 5.54738 14.6421 6.66667 10.5 6.66667C6.35786 6.66667 3 5.54738 3 4.16667M18 4.16667C18 2.78595 14.6421 1.66667 10.5 1.66667C6.35786 1.66667 3 2.78595 3 4.16667M18 4.16667V15.8333C18 17.2167 14.6667 18.3333 10.5 18.3333C6.33333 18.3333 3 17.2167 3 15.8333V4.16667M18 10C18 11.3833 14.6667 12.5 10.5 12.5C6.33333 12.5 3 11.3833 3 10"
										stroke="#757575"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span className="content__caption">External Vault</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default MainPage;
